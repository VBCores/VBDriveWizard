#include "transport/serial_worker.h"

#include <QSerialPort>
#include <QStringList>

#include <cmath>

namespace {
/// Flush the telemetry batch once it reaches this many samples, even if the timer
/// has not fired yet.
constexpr int kMaxBatchSamples = 8;
constexpr auto kTelemetryPrefix = "state:";
} // namespace

SerialWorker::SerialWorker(QObject *parent)
    : QObject(parent)
    , m_batchTimer(new QTimer(this))
{
    m_batchTimer->setInterval(40);
    connect(m_batchTimer, &QTimer::timeout, this, &SerialWorker::flushTelemetry);
}

SerialWorker::~SerialWorker()
{
    closePort();
}

void SerialWorker::openPort(const QString &portName, int baudRate)
{
    if (!m_serial) {
        m_serial = new QSerialPort(this);
        connect(m_serial, &QSerialPort::readyRead, this, &SerialWorker::onReadyRead);
        connect(m_serial, &QSerialPort::bytesWritten, this, &SerialWorker::onBytesWritten);
        connect(m_serial, &QSerialPort::errorOccurred, this,
                [this](QSerialPort::SerialPortError error) {
                    onErrorOccurred(static_cast<int>(error));
                });
    }

    if (m_serial->isOpen())
        m_serial->close();

    m_serial->setPortName(portName);
    m_serial->setBaudRate(baudRate);
    m_serial->setDataBits(QSerialPort::Data8);
    m_serial->setParity(QSerialPort::NoParity);
    m_serial->setStopBits(QSerialPort::OneStop);
    m_serial->setFlowControl(QSerialPort::NoFlowControl);

    if (!m_serial->open(QIODevice::ReadWrite)) {
        emit portOpened(false, m_serial->errorString());
        return;
    }
    m_serial->clear(QSerialPort::AllDirections);

    m_readBuffer.clear();
    m_pendingTelemetry.clear();
    m_pendingWrites.clear();
    m_unconfirmedBytes = 0;
    m_batchTimer->start();

    emit portOpened(true, tr("Port %1 opened at %2 baud.").arg(portName).arg(baudRate));
}

void SerialWorker::closePort()
{
    m_batchTimer->stop();
    flushTelemetry();
    if (m_serial && m_serial->isOpen()) {
        m_serial->close();
        emit portClosed();
    }
    m_readBuffer.clear();
    m_pendingWrites.clear();
    m_unconfirmedBytes = 0;
}

void SerialWorker::setBatchIntervalMs(int intervalMs)
{
    m_batchTimer->setInterval(qBound(10, intervalMs, 200));
}

void SerialWorker::writeLine(int commandId, const QString &text)
{
    if (!m_serial || !m_serial->isOpen()) {
        emit writeFinished(commandId, false, tr("Serial port is not open."));
        return;
    }

    QByteArray bytes = text.toLatin1();
    if (!bytes.endsWith('\n'))
        bytes.append('\n');

    if (m_serial->write(bytes) != bytes.size()) {
        emit writeFinished(commandId, false, m_serial->errorString());
        return;
    }
    m_pendingWrites.enqueue({commandId, static_cast<qint64>(bytes.size())});
    // flush() only pushes; completion is confirmed by bytesWritten().
    m_serial->flush();
}

void SerialWorker::onBytesWritten(qint64 bytes)
{
    // bytesWritten() reports totals, not per-write chunks: a single notification
    // can cover the tail of one line and the whole of the next.
    m_unconfirmedBytes += bytes;
    while (!m_pendingWrites.isEmpty() && m_unconfirmedBytes >= m_pendingWrites.head().size) {
        const PendingWrite write = m_pendingWrites.dequeue();
        m_unconfirmedBytes -= write.size;
        emit writeFinished(write.id, true, QString());
    }
    if (m_pendingWrites.isEmpty())
        m_unconfirmedBytes = 0;
}

void SerialWorker::onReadyRead()
{
    if (!m_serial)
        return;
    m_readBuffer.append(m_serial->readAll());
    processBuffer();
}

void SerialWorker::processBuffer()
{
    for (;;) {
        int end = m_readBuffer.indexOf('\n');
        const int cr = m_readBuffer.indexOf('\r');
        if (end < 0 || (cr >= 0 && cr < end))
            end = cr;
        if (end < 0)
            break;  // incomplete line stays buffered

        const QByteArray raw = m_readBuffer.left(end);
        m_readBuffer.remove(0, end + 1);
        // The firmware emits both "\n\r" and "\r\n"; swallow the paired byte.
        while (!m_readBuffer.isEmpty()
               && (m_readBuffer.startsWith('\n') || m_readBuffer.startsWith('\r'))) {
            m_readBuffer.remove(0, 1);
        }

        const QString line = QString::fromLatin1(raw).trimmed();
        if (line.isEmpty())
            continue;

        TelemetrySample sample;
        if (parseTelemetry(line, &sample)) {
            m_pendingTelemetry.push_back(sample);
            if (m_pendingTelemetry.size() >= kMaxBatchSamples)
                flushTelemetry();
            continue;
        }
        emit lineReceived(line);
    }
}

bool SerialWorker::parseTelemetry(const QString &line, TelemetrySample *out) const
{
    if (!line.startsWith(QLatin1String(kTelemetryPrefix)))
        return false;

    // "state: <position> <velocity> <torque>" in rad, rad/s and N*m.
    const QStringList parts =
            line.mid(static_cast<int>(qstrlen(kTelemetryPrefix))).split(QLatin1Char(' '),
                                                                       Qt::SkipEmptyParts);
    if (parts.size() != 3)
        return false;

    bool ok = false;
    const double position = parts.at(0).toDouble(&ok);
    if (!ok || !std::isfinite(position))
        return false;
    const double velocity = parts.at(1).toDouble(&ok);
    if (!ok || !std::isfinite(velocity))
        return false;
    const double torque = parts.at(2).toDouble(&ok);
    if (!ok || !std::isfinite(torque))
        return false;

    out->t_us = hostTimeUs();
    out->position = position;
    out->velocity = velocity;
    out->torque = torque;
    return true;
}

void SerialWorker::flushTelemetry()
{
    if (m_pendingTelemetry.isEmpty())
        return;
    emit telemetryBatch(m_pendingTelemetry);
    m_pendingTelemetry.clear();
}

void SerialWorker::onErrorOccurred(int errorCode)
{
    if (!m_serial || errorCode == static_cast<int>(QSerialPort::NoError))
        return;

    emit serialError(m_serial->errorString());

    // ResourceError is the cable being pulled: the spec treats that as a plain
    // disconnect, so close and report it as one.
    if (errorCode == static_cast<int>(QSerialPort::ResourceError)) {
        if (m_serial->isOpen())
            m_serial->close();
        m_batchTimer->stop();
        emit portClosed();
    }
}
