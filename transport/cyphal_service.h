#ifndef TRANSPORT_CYPHAL_SERVICE_H
#define TRANSPORT_CYPHAL_SERVICE_H

#include "transport/device_link.h"

#include <QElapsedTimer>
#include <QHash>
#include <QQueue>
#include <QTimer>

#include <optional>

class CyphalBridge;

/// CAN/Cyphal implementation of DeviceLink.
///
/// Drives are discovered from uavcan.node.Heartbeat and addressed by node id.
/// register.Access is a service, so one request per drive is kept in flight and
/// correlated by transfer id; several drives are served concurrently.
class CyphalService : public DeviceLink
{
    Q_OBJECT

public:
    /// How long CanConnectBtn listens for heartbeats before reporting the result.
    static constexpr int kDiscoveryWindowMs = 5000;
    /// A drive that has not sent a heartbeat for this long counts as lost.
    static constexpr int kHeartbeatTimeoutMs = 3000;
    static constexpr int kAccessTimeoutMs = 1000;

    explicit CyphalService(QObject *parent = nullptr);
    ~CyphalService() override;

    LinkKind kind() const override { return LinkKind::Can; }
    bool isConnected() const override { return m_connected; }
    void closeLink() override;

    /// Opens the interface and starts the discovery window.
    void connectToInterface(const QString &interfaceName, quint8 localNodeId);
    /// Restarts the discovery window on an already open interface (RefreshDeviceBtn).
    void rescan();

    void readRegister(quint8 nodeId, const QString &name) override;
    void readRegisters(quint8 nodeId, const QStringList &names) override;
    void writeRegisters(quint8 nodeId, const RegisterWrites &writes) override;
    void sendServoSetpoint(quint8 nodeId, ServoControlType type, float value) override;
    void sendMitCommand(quint8 nodeId, float position, float velocity, float torque,
                        float positionGain, float velocityGain) override;

    /// CAN FD carries these comfortably, so the spec's 1 kHz MIT rate is achievable.
    static int maxCommandRateHz() { return 1000; }

signals:
    /// Result of the discovery window: false when no drive answered.
    void connectionResult(bool success, const QString &message);
    /// A drive that had been lost started sending heartbeats again.
    void deviceReappeared(quint8 nodeId);

private slots:
    void onHeartbeat(quint8 nodeId);
    void onAccessResponse(quint8 nodeId, int transferId, const RegisterValue &value,
                          bool writable);
    void onDiscoveryFinished();
    void onMaintenanceTick();

private:
    struct PendingAccess
    {
        quint8 nodeId = 0;
        QString name;
        bool isWrite = false;
        RegisterValue value;
        int transferId = -1;
        qint64 deadlineMs = 0;
        int batchId = 0;
        bool endsBatch = false;
    };

    struct NodeState
    {
        qint64 lastHeartbeatMs = 0;
        bool lost = false;
        QQueue<PendingAccess> queue;
        std::optional<PendingAccess> inFlight;
        QStringList batchFailures;
    };

    void enqueue(PendingAccess request);
    void pump(quint8 nodeId);
    void finish(quint8 nodeId, bool ok, const RegisterValue &value, const QString &error);
    void failAllFor(quint8 nodeId, const QString &reason);

    CyphalBridge *m_bridge;
    QHash<quint8, NodeState> m_nodes;
    QTimer m_discoveryTimer;
    QTimer m_maintenanceTimer;   ///< sweeps timeouts, heartbeat liveness and the queues
    QTimer m_heartbeatTimer;     ///< publishes our own heartbeat
    QElapsedTimer m_clock;
    bool m_connected = false;
    bool m_discovering = false;
    int m_nextBatchId = 1;
    QString m_interfaceName;
};

#endif // TRANSPORT_CYPHAL_SERVICE_H
