#ifndef TRANSPORT_SERIAL_SERVICE_H
#define TRANSPORT_SERIAL_SERVICE_H

#include "transport/device_link.h"

#include <QQueue>
#include <QStringList>
#include <QThread>
#include <QTimer>

#include <optional>

class SerialWorker;

/// Serial implementation of DeviceLink.
///
/// Owns the worker thread and turns the drive's line protocol into the asynchronous
/// register API. Reply shapes, taken from the firmware's format strings:
///
///   read  `name:?`        -> `name:<value>`
///   write `name:<value>`  -> `OK: name:<value>`
///   bare  `CONFIG`        -> `OK: CONFIG`
///   any failure           -> `ERROR: <reason>`
///
/// Config registers are only writable in CONFIG mode, so a write batch that touches
/// any of them is wrapped as CONFIG -> writes -> SAVE.
class SerialService : public DeviceLink
{
    Q_OBJECT

public:
    /// Serial can only reach one drive, which is modelled as node id 0.
    static constexpr quint8 kSerialNodeId = 0;

    explicit SerialService(QObject *parent = nullptr);
    ~SerialService() override;

    LinkKind kind() const override { return LinkKind::Serial; }
    bool isConnected() const override { return m_portOpen; }
    void closeLink() override;

    void start();
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
        int timeoutMs = 1000;
        int batchId = 0;       ///< 0 when the command is not part of a write batch
        bool endsBatch = false;
        bool expectAck = true;
        bool handshake = false;
    };

    int enqueue(PendingCommand command);
    void pumpQueue();
    void completeCurrent(bool success, const QString &error);
    void failBatch(int batchId, const QString &error);
    void abortAll(const QString &reason);
    /// Sends a line without queueing or waiting for an ack, for the trajectory rates.
    void sendImmediate(const QString &line);

    QThread m_workerThread;
    SerialWorker *m_worker = nullptr;
    QQueue<PendingCommand> m_queue;
    std::optional<PendingCommand> m_current;
    QTimer m_responseTimer;

    int m_nextCommandId = 1;
    int m_nextBatchId = 1;
    bool m_portOpen = false;
    bool m_handshakeDone = false;
    QString m_portName;

    /// Registers that failed inside the batch currently in flight.
    QStringList m_batchFailures;
    int m_activeBatchId = 0;
};

#endif // TRANSPORT_SERIAL_SERVICE_H
