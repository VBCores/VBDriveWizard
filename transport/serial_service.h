#ifndef TRANSPORT_SERIAL_SERVICE_H
#define TRANSPORT_SERIAL_SERVICE_H

#include "transport/device_link.h"

#include <QHash>
#include <QQueue>
#include <QStringList>
#include <QThread>
#include <QTimer>

#include <optional>

class SerialWorker;

/// Serial implementation of DeviceLink.
///
/// Owns the worker thread and turns the drive's line protocol into the asynchronous
/// register API. Reply shapes, as the VBDrive firmware actually prints them:
///
///   read  `name:?`        -> `name:<value>`
///   write `name:<value>`  -> `OK: name:<value>`
///   `log_on` / `log_off`  -> `OK: log_on` / `OK: log_off`
///   `STOP`                -> `OK: STOP`
///   `CONFIG`              -> `CONFIG MODE ENABLED`            (also stops the motor)
///   `SAVE`                -> [`Saved config`] `NOTE: ...`     (leaves CONFIG mode)
///   `EXIT`                -> `CONFIG MODE EXITED, ...`, or nothing outside CONFIG
///   any failure           -> `ERROR: <reason>`
///
/// Config registers are only writable in CONFIG mode, so a write batch that touches
/// any of them is wrapped as CONFIG -> writes -> SAVE. CONFIG mode survives a port
/// close and even a drive reconnect, and in CONFIG mode `is_on:1` and `log_on` are
/// refused with `ERROR: RUNNING mode required`, so a batch that cannot complete is
/// always followed by `EXIT`, and every connection starts with one as well.
class SerialService : public DeviceLink
{
    Q_OBJECT

public:
    /// Serial can only reach one drive, which is modelled as node id 0.
    static constexpr quint8 kSerialNodeId = 0;

    explicit SerialService(QObject *parent = nullptr);
    ~SerialService() override;

    LinkKind kind() const override { return LinkKind::Serial; }
    bool isConnected() const override { return m_portOpen && !m_closing; }

    /// Graceful close: whatever is already queued (MainWindow's `is_on:0`) is
    /// delivered, `log_off` is sent so the drive stops streaming, and only then is
    /// the port closed. linkClosed() follows once the port is actually shut.
    void closeLink() override;

    void start();
    /// Synchronous teardown for the destructor: nothing is emitted, the port is
    /// closed and the worker thread joined.
    void shutdown();

    /// Opens the port and runs the handshake: a `vbdrive_model` read must answer
    /// before the drive counts as connected.
    void connectToPort(const QString &portName, int baudRate);

    void readRegister(quint8 nodeId, const QString &name) override;
    void readRegisters(quint8 nodeId, const QStringList &names) override;
    void writeRegisters(quint8 nodeId, const RegisterWrites &writes) override;
    void sendServoSetpoint(quint8 nodeId, ServoControlType type, float value) override;
    void sendMitCommand(quint8 nodeId, float position, float velocity, float torque,
                        float positionGain, float velocityGain) override;

    /// CALIBRATE, STOP and friends. `expectAck == false` fires and forgets, which is
    /// what CALIBRATE needs: the drive stops answering for the whole procedure.
    void sendBareCommand(const QString &command, bool expectAck = true, int timeoutMs = 1000);

    /// Turns the 100 Hz `state:` log on or off.
    void setLogStreaming(bool enabled);

    void setTelemetryBatchIntervalMs(int intervalMs);

    /// Serial cannot carry MIT at 1 kHz: at 115200 baud one command plus its ack is
    /// about 68 bytes, so the line saturates near 170 Hz. Trajectory workers ask the
    /// link how fast they may run instead of assuming the spec's CAN rate.
    static int maxCommandRateHz() { return 100; }

signals:
    /// Result of connectToPort(): true only once the drive has answered the handshake.
    void connectionResult(bool success, const QString &message);

private slots:
    void onWorkerPortOpened(bool success, const QString &message);
    void onWorkerPortClosed();
    void onWorkerLine(const QString &line);
    void onWorkerWriteFinished(int commandId, bool success, const QString &message);
    void onWorkerSerialError(const QString &message);
    void onResponseTimeout();
    void onCloseTimeout();

private:
    enum class CommandKind
    {
        Read,
        Write,
        Bare
    };

    struct PendingCommand
    {
        int id = -1;
        CommandKind kind = CommandKind::Bare;
        QString line;          ///< text sent to the drive
        QString token;         ///< register name, or the bare command's first word
        /// Bare commands: reply lines that count as the ack. Empty means the
        /// generic `OK: <token>`.
        QStringList acks;
        int timeoutMs = 1000;
        int batchId = 0;       ///< 0 when the command is not part of a write batch
        bool expectAck = true;
        bool handshake = false;
        /// Issued by the service itself (EXIT, the closing log_off); allowed to run
        /// while the link is closing, and never reported through linkError().
        bool internal = false;
        /// CONFIG: when it fails nothing else in the batch can be staged.
        bool opensConfig = false;
        /// SAVE: the drive is back in RUNNING mode once this is answered.
        bool closesConfig = false;
    };

    struct Batch
    {
        int pending = 0;       ///< commands of this batch not yet finished
        QStringList failures;  ///< registers the drive rejected
    };

    static PendingCommand bareCommand(const QString &line, const QStringList &acks = {});
    int enqueue(PendingCommand command);
    void pumpQueue();
    void completeCurrent(bool success, const QString &error);
    /// Books one finished command of its batch and reports the batch when done.
    void finishBatchCommand(const PendingCommand &command, bool success);
    /// Drops the batch's remaining commands and reports it as failed.
    void failBatch(int batchId, const QString &error);
    void abortAll(const QString &reason);
    /// Leaves CONFIG mode, discarding whatever was staged. Silent outside CONFIG.
    void enqueueConfigExit();
    /// CONFIG mode switches the `state:` log off and SAVE/EXIT do not bring it
    /// back; re-enable it when MainWindow asked for it.
    void restoreLogStreaming();
    void finishClosing();
    /// Sends a line without queueing or waiting for an ack, for the trajectory rates.
    void sendImmediate(const QString &line);

    QThread m_workerThread;
    SerialWorker *m_worker = nullptr;
    QQueue<PendingCommand> m_queue;
    std::optional<PendingCommand> m_current;
    QTimer m_responseTimer;
    /// Bounds the drain of closeLink(): the port is closed even if the drive stops
    /// answering.
    QTimer m_closeTimer;

    int m_nextCommandId = 1;
    int m_nextBatchId = 1;
    bool m_portOpen = false;
    bool m_handshakeDone = false;
    bool m_closing = false;
    /// What setLogStreaming() last asked for.
    bool m_logStreaming = false;
    /// connectToPort() was issued and the worker has not reported the open yet; a
    /// portClosed for the previous port arriving meanwhile is not a lost link.
    bool m_openPending = false;
    QString m_portName;

    QHash<int, Batch> m_batches;
};

#endif // TRANSPORT_SERIAL_SERVICE_H
