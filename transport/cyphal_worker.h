#ifndef TRANSPORT_CYPHAL_WORKER_H
#define TRANSPORT_CYPHAL_WORKER_H

#include "app_types.h"
#include "core/register_value.h"

#include <QObject>
#include <QString>

#include <QHash>
#include <QMutex>

#include <array>
#include <cstdint>
#include <memory>

class CyphalInterface;

/// Owns the Cyphal stack and turns it into Qt signals.
///
/// libcxxcanard runs its own RX and TX threads (CyphalInterface::start_threads), so
/// there is no Qt worker thread here: the subscription callbacks fire on the library's
/// RX thread and every signal below is delivered to the GUI thread through a queued
/// connection. Sending is safe from any thread because CyphalInterface guards the
/// canard instance with a mutex - that is what lets the 1 kHz MIT trajectory worker
/// publish straight from its own thread.
class CyphalBridge : public QObject
{
    Q_OBJECT

public:
    /// Fixed and computed Cyphal port ids used by VBDrive.
    static constexpr quint16 kHeartbeatPort = 7509;
    static constexpr quint16 kStatePort = 3811;         ///< shared by every drive
    static constexpr quint16 kMitPortBase = 2107;       ///< + node id
    static constexpr quint16 kServoPortBase = 3407;     ///< + node id
    static constexpr quint16 kRegisterAccessPort = 384;
    static constexpr quint16 kRegisterListPort = 385;

    explicit CyphalBridge(QObject *parent = nullptr);
    ~CyphalBridge() override;

    /// Binds the SocketCAN interface and starts the RX/TX threads.
    /// Returns false and fills `error` when the interface cannot be used.
    bool open(const QString &interfaceName, quint8 localNodeId, QString *error);
    void close();
    bool isOpen() const { return static_cast<bool>(m_interface); }

    quint8 localNodeId() const { return m_localNodeId; }

    // --- callable from any thread ---

    void sendServo(quint8 nodeId, quint8 setPointType, float value);
    void sendMit(quint8 nodeId, float position, float velocity, float torque,
                 float positionGain, float velocityGain);

    /// Sends a register.Access request. An empty `value` reads; anything else writes.
    /// Returns the 5-bit transfer id used for correlation, or -1 if it could not be sent.
    int sendAccessRequest(quint8 nodeId, const QString &name, const RegisterValue &value);

    /// Publishes our own uavcan.node.Heartbeat so the drives can see this node.
    void publishHeartbeat();

    /// Hands over the telemetry buffered since the last call, keyed by node id, and
    /// empties it.
    ///
    /// voltbro.foc.State arrives at 1 kHz per drive. Emitting a queued signal per
    /// sample would swamp the GUI thread, so samples accumulate on the RX thread and
    /// the service drains them on its own timer.
    QHash<quint8, TelemetryBatch> takeTelemetry();

signals:
    /// A heartbeat arrived from `nodeId`. Emitted from the library's RX thread.
    void heartbeatReceived(quint8 nodeId);
    /// Answer to sendAccessRequest(); `transferId` correlates it with the request.
    void accessResponse(quint8 nodeId, int transferId, const RegisterValue &value,
                        bool writable);
    void bridgeError(const QString &message);

private:
    void subscribeAll();

    /// Guards m_telemetry, which is written on the RX thread and drained on the
    /// GUI thread.
    QMutex m_telemetryMutex;
    QHash<quint8, TelemetryBatch> m_telemetry;

    std::shared_ptr<CyphalInterface> m_interface;
    quint8 m_localNodeId = 126;
    quint32 m_uptimeSeconds = 0;

    // One transfer-id counter per peer node, masked to the 5 bits CAN carries.
    std::array<std::uint8_t, 128> m_accessTransferId{};
    std::array<std::uint8_t, 128> m_mitTransferId{};
    std::array<std::uint8_t, 128> m_servoTransferId{};
    std::uint8_t m_heartbeatTransferId = 0;
};

#endif // TRANSPORT_CYPHAL_WORKER_H
