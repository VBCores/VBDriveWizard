#ifndef TRANSPORT_SERIAL_WORKER_H
#define TRANSPORT_SERIAL_WORKER_H

#include "app_types.h"

#include <QByteArray>
#include <QObject>
#include <QTimer>

QT_BEGIN_NAMESPACE
class QSerialPort;
QT_END_NAMESPACE

/// Lives in its own thread and owns the QSerialPort. It only does framing and
/// routing; the request/response protocol lives in SerialService.
///
/// The VBDrive UART is ASCII with CR, LF or CRLF terminators. `log_on` produces
/// `state: <pos> <vel> <torq>` at 100 Hz, which is split off here and batched so the
/// GUI thread gets one queued signal per frame instead of one per sample.
class SerialWorker : public QObject
{
    Q_OBJECT

public:
    explicit SerialWorker(QObject *parent = nullptr);
    ~SerialWorker() override;

public slots:
    void openPort(const QString &portName, int baudRate);
    void closePort();
    void writeLine(int commandId, const QString &text);
    void setBatchIntervalMs(int intervalMs);

signals:
    void portOpened(bool success, const QString &message);
    void portClosed();
    /// Any line that is not telemetry.
    void lineReceived(const QString &line);
    void telemetryBatch(const TelemetryBatch &samples);
    void serialError(const QString &message);
    void writeFinished(int commandId, bool success, const QString &message);

private slots:
    void onReadyRead();
    void onBytesWritten(qint64 bytes);
    void onErrorOccurred(int errorCode);
    void flushTelemetry();

private:
    void processBuffer();
    bool parseTelemetry(const QString &line, TelemetrySample *out) const;

    QSerialPort *m_serial = nullptr;
    QByteArray m_readBuffer;
    TelemetryBatch m_pendingTelemetry;
    QTimer m_batchTimer;
    int m_pendingWriteId = -1;
    qint64 m_pendingWriteBytes = 0;
    qint64 m_writtenBytes = 0;
};

#endif // TRANSPORT_SERIAL_WORKER_H
