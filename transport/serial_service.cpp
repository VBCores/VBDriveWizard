#include "transport/serial_service.h"

#include "core/register_catalog.h"
#include "transport/serial_worker.h"

#include <QMetaObject>

namespace {
constexpr int kDefaultTimeoutMs = 1000;
constexpr int kHandshakeTimeoutMs = 2000;
constexpr auto kErrorPrefix = "ERROR:";
constexpr auto kOkPrefix = "OK: ";
} // namespace

SerialService::SerialService(QObject *parent)
    : DeviceLink(parent)
    , m_worker(new SerialWorker())  // unparented: required before moveToThread()
{
    m_worker->moveToThread(&m_workerThread);
    connect(&m_workerThread, &QThread::finished, m_worker, &QObject::deleteLater);

    connect(m_worker, &SerialWorker::portOpened, this, &SerialService::onWorkerPortOpened,
            Qt::QueuedConnection);
    connect(m_worker, &SerialWorker::portClosed, this, &SerialService::onWorkerPortClosed,
            Qt::QueuedConnection);
    connect(m_worker, &SerialWorker::lineReceived, this, &SerialService::onWorkerLine,
            Qt::QueuedConnection);
    connect(m_worker, &SerialWorker::writeFinished, this, &SerialService::onWorkerWriteFinished,
            Qt::QueuedConnection);
    connect(m_worker, &SerialWorker::serialError, this, &SerialService::onWorkerSerialError,
            Qt::QueuedConnection);
    connect(m_worker, &SerialWorker::telemetryBatch, this,
            [this](const TelemetryBatch &samples) {
                emit telemetryReceived(kSerialNodeId, samples);
            },
            Qt::QueuedConnection);

    m_responseTimer.setSingleShot(true);
    connect(&m_responseTimer, &QTimer::timeout, this, &SerialService::onResponseTimeout);
}

SerialService::~SerialService()
{
    shutdown();
}

void SerialService::start()
{
    if (!m_workerThread.isRunning())
        m_workerThread.start();
}

void SerialService::shutdown()
{
    abortAll(tr("Serial service is shutting down."));
    if (!m_workerThread.isRunning())
        return;
    QMetaObject::invokeMethod(m_worker, "closePort", Qt::BlockingQueuedConnection);
    m_workerThread.quit();
    m_workerThread.wait();
    m_portOpen = false;
}

void SerialService::connectToPort(const QString &portName, int baudRate)
{
    start();
    m_portName = portName;
    m_handshakeDone = false;
    abortAll(tr("Reconnecting."));
    QMetaObject::invokeMethod(m_worker, "openPort", Qt::QueuedConnection,
                              Q_ARG(QString, portName), Q_ARG(int, baudRate));
}

void SerialService::closeLink()
{
    abortAll(tr("Disconnected."));
    if (m_workerThread.isRunning())
        QMetaObject::invokeMethod(m_worker, "closePort", Qt::QueuedConnection);
}

void SerialService::setTelemetryBatchIntervalMs(int intervalMs)
{
    if (m_workerThread.isRunning()) {
        QMetaObject::invokeMethod(m_worker, "setBatchIntervalMs", Qt::QueuedConnection,
                                  Q_ARG(int, intervalMs));
    }
}

// --- queue ------------------------------------------------------------------------

int SerialService::enqueue(PendingCommand command)
{
    command.id = m_nextCommandId++;
    m_queue.enqueue(command);
    pumpQueue();
    return command.id;
}

void SerialService::pumpQueue()
{
    if (m_current.has_value() || m_queue.isEmpty())
        return;
    if (!m_portOpen) {
        abortAll(tr("Serial port is not open."));
        return;
    }

    m_current = m_queue.dequeue();
    m_activeBatchId = m_current->batchId;
    QMetaObject::invokeMethod(m_worker, "writeLine", Qt::QueuedConnection,
                              Q_ARG(int, m_current->id), Q_ARG(QString, m_current->line));
}

void SerialService::sendImmediate(const QString &line)
{
    if (!m_portOpen)
        return;
    // Bypasses the queue: trajectory commands run far faster than the ack round trip,
    // and their `OK: mit_cmd` / `OK: servo_cmd` replies are dropped by the matcher.
    QMetaObject::invokeMethod(m_worker, "writeLine", Qt::QueuedConnection, Q_ARG(int, -1),
                              Q_ARG(QString, line));
}

void SerialService::completeCurrent(bool success, const QString &error)
{
    if (!m_current.has_value())
        return;

    const PendingCommand command = *m_current;
    m_current.reset();
    m_responseTimer.stop();

    switch (command.kind) {
    case CommandKind::Read:
        // The value itself was already emitted by the line handler on success.
        if (!success)
            emit registerRead(kSerialNodeId, command.token, RegisterValue{}, false, error);
        break;
    case CommandKind::Write:
        emit registerWritten(kSerialNodeId, command.token, success, error);
        if (!success)
            m_batchFailures << command.token;
        break;
    case CommandKind::Bare:
        if (!success && command.expectAck)
            emit linkError(tr("Command '%1' failed: %2").arg(command.token, error));
        break;
    }

    if (command.handshake) {
        m_handshakeDone = success;
        // Discovery first: MainWindow's connected handler walks the device list, and
        // on CAN the drives are already there by the time the result is reported.
        if (success)
            emit deviceDiscovered(kSerialNodeId);
        emit connectionResult(success,
                              success ? tr("Drive detected on %1.").arg(m_portName)
                                      : tr("No drive answered on %1: %2")
                                                .arg(m_portName, error));
    }

    // CONFIG failing means nothing else in the batch can be staged: drop the rest.
    if (!success && command.kind == CommandKind::Bare && command.batchId != 0) {
        failBatch(command.batchId, error);
        pumpQueue();
        return;
    }

    if (command.endsBatch) {
        const bool ok = m_batchFailures.isEmpty();
        const QString message =
                ok ? QString()
                   : tr("These registers were rejected by the drive: %1")
                             .arg(m_batchFailures.join(QStringLiteral(", ")));
        m_batchFailures.clear();
        emit writeBatchFinished(kSerialNodeId, ok, message);
    }

    pumpQueue();
}

void SerialService::failBatch(int batchId, const QString &error)
{
    // Drop every remaining command of this batch, but keep CONFIG-mode cleanup.
    QQueue<PendingCommand> kept;
    while (!m_queue.isEmpty()) {
        const PendingCommand command = m_queue.dequeue();
        if (command.batchId != batchId)
            kept.enqueue(command);
    }
    m_queue = kept;
    m_batchFailures.clear();
    emit writeBatchFinished(kSerialNodeId, false, error);
}

void SerialService::abortAll(const QString &reason)
{
    m_responseTimer.stop();
    if (m_current.has_value()) {
        const PendingCommand command = *m_current;
        m_current.reset();
        if (command.kind == CommandKind::Read)
            emit registerRead(kSerialNodeId, command.token, RegisterValue{}, false, reason);
        else if (command.kind == CommandKind::Write)
            emit registerWritten(kSerialNodeId, command.token, false, reason);
        if (command.handshake)
            emit connectionResult(false, reason);
    }
    while (!m_queue.isEmpty()) {
        const PendingCommand command = m_queue.dequeue();
        if (command.kind == CommandKind::Read)
            emit registerRead(kSerialNodeId, command.token, RegisterValue{}, false, reason);
        else if (command.kind == CommandKind::Write)
            emit registerWritten(kSerialNodeId, command.token, false, reason);
    }
    if (m_activeBatchId != 0) {
        m_activeBatchId = 0;
        m_batchFailures.clear();
        emit writeBatchFinished(kSerialNodeId, false, reason);
    }
}

// --- worker callbacks --------------------------------------------------------------

void SerialService::onWorkerPortOpened(bool success, const QString &message)
{
    m_portOpen = success;
    if (!success) {
        emit connectionResult(false, message);
        return;
    }

    // Handshake: the drive is only considered present once vbdrive_model answers.
    PendingCommand handshake;
    handshake.kind = CommandKind::Read;
    handshake.token = QString::fromLatin1(registers::kModel);
    handshake.line = handshake.token + QStringLiteral(":?");
    handshake.timeoutMs = kHandshakeTimeoutMs;
    handshake.handshake = true;
    enqueue(handshake);
}

void SerialService::onWorkerPortClosed()
{
    const bool wasOpen = m_portOpen;
    m_portOpen = false;
    m_handshakeDone = false;
    abortAll(tr("Serial connection lost."));
    if (wasOpen) {
        emit deviceLost(kSerialNodeId);
        emit linkClosed();
    }
}

void SerialService::onWorkerSerialError(const QString &message)
{
    emit linkError(message);
}

void SerialService::onWorkerWriteFinished(int commandId, bool success, const QString &message)
{
    if (commandId < 0)
        return;  // immediate trajectory write, nothing waits on it
    if (!m_current.has_value() || m_current->id != commandId)
        return;

    if (!success) {
        completeCurrent(false, message);
        return;
    }
    if (!m_current->expectAck) {
        completeCurrent(true, QString());
        return;
    }
    m_responseTimer.start(m_current->timeoutMs);
}

void SerialService::onResponseTimeout()
{
    completeCurrent(false, tr("The drive did not answer in time."));
}

void SerialService::onWorkerLine(const QString &line)
{
    emit logLine(line);

    if (line.startsWith(QLatin1String(kErrorPrefix))) {
        if (m_current.has_value())
            completeCurrent(false, line.mid(static_cast<int>(qstrlen(kErrorPrefix))).trimmed());
        else
            emit linkError(line);
        return;
    }

    if (!m_current.has_value())
        return;  // unsolicited chatter, or an ack for an immediate trajectory command

    const PendingCommand &command = *m_current;

    if (line.startsWith(QLatin1String(kOkPrefix))) {
        const QString body = line.mid(static_cast<int>(qstrlen(kOkPrefix))).trimmed();
        // `OK: <token>` for bare commands, `OK: <name>:<value>` for writes.
        const QString token = body.section(QLatin1Char(':'), 0, 0).trimmed();
        if (token == command.token)
            completeCurrent(true, QString());
        return;
    }

    if (command.kind != CommandKind::Read)
        return;

    // Read reply: `<name>:<value>`, printed through "%s:%.*s" for every register type.
    const int separator = line.indexOf(QLatin1Char(':'));
    if (separator <= 0)
        return;
    if (line.left(separator).trimmed() != command.token)
        return;

    const QString text = line.mid(separator + 1).trimmed();
    const RegisterInfo *info = RegisterCatalog::find(command.token);
    RegisterValue value;
    if (!info || !RegisterCodec::parse(*info, text, &value)) {
        completeCurrent(false, tr("Could not interpret the value '%1'.").arg(text));
        return;
    }
    emit registerRead(kSerialNodeId, command.token, value, true, QString());
    completeCurrent(true, QString());
}

// --- DeviceLink ---------------------------------------------------------------------

void SerialService::readRegister(quint8, const QString &name)
{
    PendingCommand command;
    command.kind = CommandKind::Read;
    command.token = name;
    command.line = name + QStringLiteral(":?");
    command.timeoutMs = kDefaultTimeoutMs;
    enqueue(command);
}

void SerialService::readRegisters(quint8 nodeId, const QStringList &names)
{
    for (const QString &name : names)
        readRegister(nodeId, name);
}

void SerialService::writeRegisters(quint8, const RegisterWrites &writes)
{
    if (writes.isEmpty()) {
        emit writeBatchFinished(kSerialNodeId, true, QString());
        return;
    }

    const int batchId = m_nextBatchId++;
    m_batchFailures.clear();

    bool needsConfigMode = false;
    for (const RegisterWrite &write : writes) {
        if (RegisterCatalog::requiresConfigMode(write.first)) {
            needsConfigMode = true;
            break;
        }
    }

    const auto bare = [&](const QString &text, bool endsBatch) {
        PendingCommand command;
        command.kind = CommandKind::Bare;
        command.token = text;
        command.line = text;
        command.timeoutMs = kDefaultTimeoutMs;
        command.batchId = batchId;
        command.endsBatch = endsBatch;
        enqueue(command);
    };

    if (needsConfigMode)
        bare(QStringLiteral("CONFIG"), false);

    for (int i = 0; i < writes.size(); ++i) {
        const RegisterWrite &write = writes.at(i);
        PendingCommand command;
        command.kind = CommandKind::Write;
        command.token = write.first;
        command.line = write.first + QLatin1Char(':') + RegisterCodec::format(write.second);
        command.timeoutMs = kDefaultTimeoutMs;
        command.batchId = batchId;
        command.endsBatch = (!needsConfigMode && i == writes.size() - 1);
        enqueue(command);
    }

    // SAVE persists the staged values and leaves CONFIG mode.
    if (needsConfigMode)
        bare(QStringLiteral("SAVE"), true);
}

void SerialService::sendServoSetpoint(quint8, ServoControlType type, float value)
{
    sendImmediate(QStringLiteral("servo_cmd: %1 %2")
                          .arg(static_cast<int>(type))
                          .arg(static_cast<double>(value), 0, 'f', 6));
}

void SerialService::sendMitCommand(quint8, float position, float velocity, float torque,
                                   float positionGain, float velocityGain)
{
    // Argument order is <pos> <vel> <torq> <p_gain> <v_gain>.
    sendImmediate(QStringLiteral("mit_cmd: %1 %2 %3 %4 %5")
                          .arg(static_cast<double>(position), 0, 'f', 6)
                          .arg(static_cast<double>(velocity), 0, 'f', 6)
                          .arg(static_cast<double>(torque), 0, 'f', 6)
                          .arg(static_cast<double>(positionGain), 0, 'f', 6)
                          .arg(static_cast<double>(velocityGain), 0, 'f', 6));
}

void SerialService::sendBareCommand(const QString &command, bool expectAck, int timeoutMs)
{
    PendingCommand pending;
    pending.kind = CommandKind::Bare;
    pending.token = command.section(QLatin1Char(' '), 0, 0);
    pending.line = command;
    pending.timeoutMs = timeoutMs;
    pending.expectAck = expectAck;
    enqueue(pending);
}

void SerialService::setLogStreaming(bool enabled)
{
    sendBareCommand(enabled ? QStringLiteral("log_on") : QStringLiteral("log_off"));
}
