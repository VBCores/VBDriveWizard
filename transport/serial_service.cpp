#include "transport/serial_service.h"

#include "core/register_catalog.h"
#include "transport/serial_worker.h"

#include <QMetaObject>
#include <QSignalBlocker>

#include <utility>

namespace {
constexpr int kDefaultTimeoutMs = 1000;
constexpr int kHandshakeTimeoutMs = 2000;
/// How long closeLink() lets the queue drain before the port is closed anyway.
constexpr int kCloseTimeoutMs = 2000;
constexpr auto kErrorPrefix = "ERROR:";
constexpr auto kOkPrefix = "OK: ";
/// Printed by SAVE: "NOTE: config changes not applied! To apply, run APPLY or reset
/// controller". Worth showing, since only the servo gains take effect immediately.
constexpr auto kNotePrefix = "NOTE:";

bool startsWithAny(const QString &line, const QStringList &prefixes)
{
    for (const QString &prefix : prefixes) {
        if (line.startsWith(prefix))
            return true;
    }
    return false;
}
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
    m_closeTimer.setSingleShot(true);
    connect(&m_closeTimer, &QTimer::timeout, this, &SerialService::onCloseTimeout);
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
    {
        // The window is being destroyed: nobody may react to these failures any
        // more (a modal error box here would keep the event loop alive forever).
        const QSignalBlocker blocker(this);
        abortAll(tr("Serial service is shutting down."));
    }
    m_closeTimer.stop();
    m_closing = false;
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
    m_closeTimer.stop();
    m_closing = false;
    m_openPending = true;
    abortAll(tr("Reconnecting."));
    QMetaObject::invokeMethod(m_worker, "openPort", Qt::QueuedConnection,
                              Q_ARG(QString, portName), Q_ARG(int, baudRate));
}

void SerialService::closeLink()
{
    if (m_closing)
        return;
    if (!m_portOpen) {
        abortAll(tr("Disconnected."));
        return;
    }

    m_closing = true;
    if (m_handshakeDone) {
        // Let the queued `is_on:0` reach the drive, then stop the 100 Hz log so
        // the drive is quiet for whoever opens the port next.
        PendingCommand logOff = bareCommand(QStringLiteral("log_off"));
        logOff.internal = true;
        enqueue(logOff);
    } else {
        // No drive answered: there is nothing worth waiting for.
        abortAll(tr("Disconnected."));
    }
    m_closeTimer.start(kCloseTimeoutMs);
    if (!m_current.has_value() && m_queue.isEmpty())
        finishClosing();
}

void SerialService::finishClosing()
{
    m_closeTimer.stop();
    if (m_workerThread.isRunning())
        QMetaObject::invokeMethod(m_worker, "closePort", Qt::QueuedConnection);
}

void SerialService::onCloseTimeout()
{
    abortAll(tr("Disconnected."));
    finishClosing();
}

void SerialService::setTelemetryBatchIntervalMs(int intervalMs)
{
    if (m_workerThread.isRunning()) {
        QMetaObject::invokeMethod(m_worker, "setBatchIntervalMs", Qt::QueuedConnection,
                                  Q_ARG(int, intervalMs));
    }
}

// --- queue ------------------------------------------------------------------------

SerialService::PendingCommand SerialService::bareCommand(const QString &line,
                                                         const QStringList &acks)
{
    PendingCommand command;
    command.kind = CommandKind::Bare;
    command.token = line.section(QLatin1Char(' '), 0, 0);
    command.line = line;
    command.acks = acks;
    command.timeoutMs = kDefaultTimeoutMs;
    return command;
}

int SerialService::enqueue(PendingCommand command)
{
    if (!m_portOpen || (m_closing && !command.internal)) {
        // Rejected up front rather than queued: the caller's slots run right away.
        const QString reason = m_portOpen ? tr("Disconnecting.") : tr("Serial port is not open.");
        if (command.kind == CommandKind::Read)
            emit registerRead(kSerialNodeId, command.token, RegisterValue{}, false, reason);
        else if (command.kind == CommandKind::Write)
            emit registerWritten(kSerialNodeId, command.token, false, reason);
        return -1;
    }

    command.id = m_nextCommandId++;
    m_queue.enqueue(command);
    pumpQueue();
    return command.id;
}

void SerialService::pumpQueue()
{
    if (m_current.has_value())
        return;
    if (m_queue.isEmpty()) {
        if (m_closing)
            finishClosing();
        return;
    }
    if (!m_portOpen) {
        abortAll(tr("Serial port is not open."));
        return;
    }

    m_current = m_queue.dequeue();
    QMetaObject::invokeMethod(m_worker, "writeLine", Qt::QueuedConnection,
                              Q_ARG(int, m_current->id), Q_ARG(QString, m_current->line));
}

void SerialService::sendImmediate(const QString &line)
{
    if (!m_portOpen || m_closing)
        return;
    // Bypasses the queue: trajectory commands run far faster than the ack round trip,
    // and their `OK: mit_cmd` / `OK: servo_cmd` replies are dropped by the matcher.
    QMetaObject::invokeMethod(m_worker, "writeLine", Qt::QueuedConnection, Q_ARG(int, -1),
                              Q_ARG(QString, line));
}

void SerialService::enqueueConfigExit()
{
    // EXIT answers only when the drive really was in CONFIG mode, so it cannot be
    // acked; its stray reply never matches any other command's expected shape.
    PendingCommand exit = bareCommand(QStringLiteral("EXIT"));
    exit.expectAck = false;
    exit.internal = true;
    exit.id = m_nextCommandId++;
    m_queue.prepend(exit);
    pumpQueue();
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
        break;
    case CommandKind::Bare:
        if (!success && command.expectAck && !command.internal)
            emit linkError(tr("Command '%1' failed: %2").arg(command.token, error));
        break;
    }

    if (command.handshake) {
        m_handshakeDone = success;
        if (success) {
            // A drive left in CONFIG mode by an interrupted session refuses is_on:1
            // and log_on; EXIT goes out before anything MainWindow enqueues.
            enqueueConfigExit();
            // Discovery first: MainWindow's connected handler walks the device list,
            // and on CAN the drives are already there by the time the result is
            // reported.
            emit deviceDiscovered(kSerialNodeId);
        }
        emit connectionResult(success,
                              success ? tr("Drive detected on %1.").arg(m_portName)
                                      : tr("No drive answered on %1: %2")
                                                .arg(m_portName, error));
    }

    if (command.batchId != 0) {
        if (!success && command.opensConfig) {
            // Nothing else in the batch can be staged: drop the rest, and make sure
            // the drive is not left half way into CONFIG mode with the motor off.
            failBatch(command.batchId, tr("Could not enter CONFIG mode: %1").arg(error));
            restoreLogStreaming();  // prepended: log_on, then EXIT in front of it
            enqueueConfigExit();
        } else {
            if (command.closesConfig)
                restoreLogStreaming();
            finishBatchCommand(command, success);
        }
    }

    pumpQueue();
}

void SerialService::restoreLogStreaming()
{
    if (!m_logStreaming || m_closing)
        return;
    PendingCommand logOn = bareCommand(QStringLiteral("log_on"));
    logOn.internal = true;
    logOn.id = m_nextCommandId++;
    m_queue.prepend(logOn);
}

void SerialService::finishBatchCommand(const PendingCommand &command, bool success)
{
    auto it = m_batches.find(command.batchId);
    if (it == m_batches.end())
        return;
    if (!success && command.kind == CommandKind::Write)
        it->failures << command.token;
    if (--it->pending > 0)
        return;

    const bool ok = it->failures.isEmpty();
    const QString message =
            ok ? QString()
               : tr("These registers were rejected by the drive: %1")
                         .arg(it->failures.join(QStringLiteral(", ")));
    m_batches.erase(it);
    emit writeBatchFinished(kSerialNodeId, ok, message);
}

void SerialService::failBatch(int batchId, const QString &error)
{
    QQueue<PendingCommand> kept;
    while (!m_queue.isEmpty()) {
        const PendingCommand command = m_queue.dequeue();
        if (command.batchId != batchId)
            kept.enqueue(command);
    }
    m_queue = kept;
    if (m_batches.remove(batchId) > 0)
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
    const int batches = m_batches.size();
    m_batches.clear();
    for (int i = 0; i < batches; ++i)
        emit writeBatchFinished(kSerialNodeId, false, reason);
}

// --- worker callbacks --------------------------------------------------------------

void SerialService::onWorkerPortOpened(bool success, const QString &message)
{
    m_openPending = false;
    m_portOpen = success;
    m_logStreaming = false;
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
    const bool wasClosing = m_closing;
    m_portOpen = false;
    m_handshakeDone = false;
    m_closing = false;
    m_closeTimer.stop();
    if (m_openPending)
        return;  // the previous port going away on the way to a new one
    abortAll(wasClosing ? tr("Disconnected.") : tr("Serial connection lost."));
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
        return;  // already answered, or long since aborted

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

    if (line.startsWith(QLatin1String(kNotePrefix)))
        emit linkError(line);  // informational, but the user should see it

    if (!m_current.has_value())
        return;  // unsolicited chatter, or an ack for an immediate trajectory command

    const PendingCommand &command = *m_current;

    switch (command.kind) {
    case CommandKind::Bare:
        if (command.acks.isEmpty()) {
            // Generic `OK: <token>`.
            if (line.startsWith(QLatin1String(kOkPrefix))
                && line.mid(static_cast<int>(qstrlen(kOkPrefix)))
                                   .section(QLatin1Char(':'), 0, 0)
                                   .trimmed()
                           == command.token) {
                completeCurrent(true, QString());
            }
        } else if (startsWithAny(line, command.acks)) {
            completeCurrent(true, QString());
        }
        return;

    case CommandKind::Write: {
        // `OK: <name>:<value>`
        if (!line.startsWith(QLatin1String(kOkPrefix)))
            return;
        const QString body = line.mid(static_cast<int>(qstrlen(kOkPrefix)));
        if (body.section(QLatin1Char(':'), 0, 0).trimmed() == command.token)
            completeCurrent(true, QString());
        return;
    }

    case CommandKind::Read:
        break;
    }

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
    if (!m_portOpen || m_closing) {
        const QString reason = m_portOpen ? tr("Disconnecting.") : tr("Serial port is not open.");
        for (const RegisterWrite &write : writes)
            emit registerWritten(kSerialNodeId, write.first, false, reason);
        emit writeBatchFinished(kSerialNodeId, false, reason);
        return;
    }

    // Config registers are staged inside CONFIG ... SAVE; runtime ones (is_on) go
    // after SAVE, because CONFIG mode stops the motor and refuses them with
    // `ERROR: RUNNING mode required`.
    RegisterWrites configWrites;
    RegisterWrites runtimeWrites;
    for (const RegisterWrite &write : writes) {
        if (RegisterCatalog::requiresConfigMode(write.first))
            configWrites.append(write);
        else
            runtimeWrites.append(write);
    }
    const bool needsConfigMode = !configWrites.isEmpty();

    const int batchId = m_nextBatchId++;
    Batch &batch = m_batches[batchId];
    batch.pending = writes.size() + (needsConfigMode ? 2 : 0);

    const auto enqueueWrite = [this, batchId](const RegisterWrite &write) {
        PendingCommand command;
        command.kind = CommandKind::Write;
        command.token = write.first;
        command.line = write.first + QLatin1Char(':') + RegisterCodec::format(write.second);
        command.timeoutMs = kDefaultTimeoutMs;
        command.batchId = batchId;
        enqueue(command);
    };

    if (needsConfigMode) {
        // CONFIG stops the motor and answers `CONFIG MODE ENABLED`, never `OK:`.
        PendingCommand config = bareCommand(QStringLiteral("CONFIG"),
                                            {QStringLiteral("CONFIG MODE ENABLED"),
                                             QStringLiteral("OK: CONFIG")});
        config.batchId = batchId;
        config.opensConfig = true;
        enqueue(config);

        for (const RegisterWrite &write : std::as_const(configWrites))
            enqueueWrite(write);

        // SAVE persists the staged values and leaves CONFIG mode. It prints an
        // optional `Saved config` and always ends with the `NOTE: ...` line.
        PendingCommand save = bareCommand(QStringLiteral("SAVE"),
                                          {QStringLiteral("NOTE:"), QStringLiteral("OK: SAVE")});
        save.batchId = batchId;
        save.closesConfig = true;
        save.timeoutMs = 3000;  // flash write
        enqueue(save);
    }

    for (const RegisterWrite &write : std::as_const(runtimeWrites))
        enqueueWrite(write);
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
    PendingCommand pending = bareCommand(command);
    pending.timeoutMs = timeoutMs;
    pending.expectAck = expectAck;
    enqueue(pending);
}

void SerialService::setLogStreaming(bool enabled)
{
    m_logStreaming = enabled;
    sendBareCommand(enabled ? QStringLiteral("log_on") : QStringLiteral("log_off"));
}
