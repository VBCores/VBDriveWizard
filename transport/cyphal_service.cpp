#include "transport/cyphal_service.h"

#include "transport/cyphal_worker.h"

namespace {
constexpr int kMaintenanceIntervalMs = 20;
constexpr int kOwnHeartbeatIntervalMs = 1000;
} // namespace

CyphalService::CyphalService(QObject *parent)
    : DeviceLink(parent)
    , m_bridge(new CyphalBridge(this))
{
    m_clock.start();

    // The bridge emits from libcxxcanard's RX thread, so every hop into this object
    // must be queued.
    connect(m_bridge, &CyphalBridge::heartbeatReceived, this, &CyphalService::onHeartbeat,
            Qt::QueuedConnection);
    connect(m_bridge, &CyphalBridge::accessResponse, this, &CyphalService::onAccessResponse,
            Qt::QueuedConnection);
    connect(m_bridge, &CyphalBridge::bridgeError, this, &DeviceLink::linkError,
            Qt::QueuedConnection);

    m_discoveryTimer.setSingleShot(true);
    connect(&m_discoveryTimer, &QTimer::timeout, this, &CyphalService::onDiscoveryFinished);

    m_maintenanceTimer.setInterval(kMaintenanceIntervalMs);
    connect(&m_maintenanceTimer, &QTimer::timeout, this, &CyphalService::onMaintenanceTick);

    m_heartbeatTimer.setInterval(kOwnHeartbeatIntervalMs);
    connect(&m_heartbeatTimer, &QTimer::timeout, this, [this] { m_bridge->publishHeartbeat(); });
}

CyphalService::~CyphalService()
{
    closeLink();
}

void CyphalService::connectToInterface(const QString &interfaceName, quint8 localNodeId)
{
    closeLink();
    m_interfaceName = interfaceName;

    QString error;
    if (!m_bridge->open(interfaceName, localNodeId, &error)) {
        emit connectionResult(false, error);
        return;
    }

    m_connected = true;
    m_maintenanceTimer.start();
    m_heartbeatTimer.start();
    rescan();
}

void CyphalService::rescan()
{
    if (!m_connected)
        return;
    m_discovering = true;
    m_discoveryTimer.start(kDiscoveryWindowMs);
}

void CyphalService::closeLink()
{
    m_discoveryTimer.stop();
    m_maintenanceTimer.stop();
    m_heartbeatTimer.stop();
    m_discovering = false;

    const QList<quint8> nodeIds = m_nodes.keys();
    for (quint8 nodeId : nodeIds)
        failAllFor(nodeId, tr("The CAN connection was closed."));
    m_nodes.clear();

    const bool wasConnected = m_connected;
    m_connected = false;
    m_bridge->close();
    if (wasConnected)
        emit linkClosed();
}

// --- discovery and liveness ---------------------------------------------------------

void CyphalService::onHeartbeat(quint8 nodeId)
{
    NodeState &node = m_nodes[nodeId];
    const bool isNew = node.lastHeartbeatMs == 0;
    const bool wasLost = node.lost;
    node.lastHeartbeatMs = m_clock.elapsed();
    node.lost = false;

    if (isNew)
        emit deviceDiscovered(nodeId);
    else if (wasLost)
        emit deviceReappeared(nodeId);
}

void CyphalService::onDiscoveryFinished()
{
    m_discovering = false;
    if (m_nodes.isEmpty()) {
        emit connectionResult(false,
                              tr("No VBDrive answered on %1 within %2 seconds.")
                                      .arg(m_interfaceName)
                                      .arg(kDiscoveryWindowMs / 1000));
        return;
    }
    emit connectionResult(true,
                          tr("Found %n actuator(s) on %1.", nullptr, m_nodes.size())
                                  .arg(m_interfaceName));
}

void CyphalService::onMaintenanceTick()
{
    const qint64 now = m_clock.elapsed();

    // Drain the telemetry the RX thread buffered since the last tick.
    const QHash<quint8, TelemetryBatch> telemetry = m_bridge->takeTelemetry();
    for (auto it = telemetry.constBegin(); it != telemetry.constEnd(); ++it) {
        if (!it.value().isEmpty())
            emit telemetryReceived(it.key(), it.value());
    }

    for (auto it = m_nodes.begin(); it != m_nodes.end(); ++it) {
        NodeState &node = it.value();
        const quint8 nodeId = it.key();

        // Heartbeat liveness. The drive is kept in the map so a later heartbeat can
        // revive it without losing the queued state.
        if (!node.lost && node.lastHeartbeatMs != 0
            && now - node.lastHeartbeatMs > kHeartbeatTimeoutMs) {
            node.lost = true;
            failAllFor(nodeId, tr("The actuator stopped answering."));
            emit deviceLost(nodeId);
            continue;
        }

        if (node.inFlight.has_value() && now > node.inFlight->deadlineMs) {
            finish(nodeId, false, RegisterValue{},
                   tr("The actuator did not answer register '%1' in time.")
                           .arg(node.inFlight->name));
            continue;
        }
        pump(nodeId);
    }
}

// --- register access ------------------------------------------------------------------

void CyphalService::enqueue(PendingAccess request)
{
    m_nodes[request.nodeId].queue.enqueue(request);
    pump(request.nodeId);
}

void CyphalService::pump(quint8 nodeId)
{
    NodeState &node = m_nodes[nodeId];
    if (node.inFlight.has_value() || node.queue.isEmpty() || node.lost || !m_connected)
        return;

    PendingAccess request = node.queue.dequeue();
    // An empty value reads the register; anything else writes it.
    request.transferId = m_bridge->sendAccessRequest(
            nodeId, request.name, request.isWrite ? request.value : RegisterValue{});
    if (request.transferId < 0) {
        node.inFlight = request;
        finish(nodeId, false, RegisterValue{}, tr("Could not send the request."));
        return;
    }
    request.deadlineMs = m_clock.elapsed() + kAccessTimeoutMs;
    node.inFlight = request;
}

void CyphalService::onAccessResponse(quint8 nodeId, int transferId, const RegisterValue &value,
                                     bool writable)
{
    auto it = m_nodes.find(nodeId);
    if (it == m_nodes.end() || !it->inFlight.has_value())
        return;
    if (it->inFlight->transferId != transferId)
        return;  // a late answer to a request that already timed out

    const PendingAccess &request = *it->inFlight;

    if (request.isWrite) {
        // The firmware echoes the stored value. An empty answer, or one that did not
        // take the written value, means the write was refused.
        if (value.isEmpty()) {
            finish(nodeId, false, value,
                   writable ? tr("The actuator did not accept the value.")
                            : tr("Register '%1' is read-only.").arg(request.name));
            return;
        }
        finish(nodeId, true, value, QString());
        return;
    }

    if (value.isEmpty()) {
        finish(nodeId, false, value,
               tr("Register '%1' is not available on this actuator.").arg(request.name));
        return;
    }
    finish(nodeId, true, value, QString());
}

void CyphalService::finish(quint8 nodeId, bool ok, const RegisterValue &value,
                           const QString &error)
{
    NodeState &node = m_nodes[nodeId];
    if (!node.inFlight.has_value())
        return;

    const PendingAccess request = *node.inFlight;
    node.inFlight.reset();

    if (request.isWrite) {
        emit registerWritten(nodeId, request.name, ok, error);
        if (!ok)
            node.batchFailures << request.name;
    } else {
        emit registerRead(nodeId, request.name, value, ok, error);
    }

    if (request.endsBatch) {
        const bool batchOk = node.batchFailures.isEmpty();
        const QString message = batchOk
                ? QString()
                : tr("These registers were rejected by the actuator: %1")
                          .arg(node.batchFailures.join(QStringLiteral(", ")));
        node.batchFailures.clear();
        emit writeBatchFinished(nodeId, batchOk, message);
    }

    pump(nodeId);
}

void CyphalService::failAllFor(quint8 nodeId, const QString &reason)
{
    auto it = m_nodes.find(nodeId);
    if (it == m_nodes.end())
        return;
    NodeState &node = it.value();

    bool hadBatch = !node.batchFailures.isEmpty();

    const auto failOne = [&](const PendingAccess &request) {
        if (request.isWrite) {
            emit registerWritten(nodeId, request.name, false, reason);
            hadBatch = true;
        } else {
            emit registerRead(nodeId, request.name, RegisterValue{}, false, reason);
        }
        if (request.endsBatch)
            hadBatch = true;
    };

    if (node.inFlight.has_value()) {
        failOne(*node.inFlight);
        node.inFlight.reset();
    }
    while (!node.queue.isEmpty())
        failOne(node.queue.dequeue());

    node.batchFailures.clear();
    if (hadBatch)
        emit writeBatchFinished(nodeId, false, reason);
}

// --- DeviceLink ---------------------------------------------------------------------

void CyphalService::readRegister(quint8 nodeId, const QString &name)
{
    PendingAccess request;
    request.nodeId = nodeId;
    request.name = name;
    request.isWrite = false;
    enqueue(request);
}

void CyphalService::readRegisters(quint8 nodeId, const QStringList &names)
{
    for (const QString &name : names)
        readRegister(nodeId, name);
}

void CyphalService::writeRegisters(quint8 nodeId, const RegisterWrites &writes)
{
    if (writes.isEmpty()) {
        emit writeBatchFinished(nodeId, true, QString());
        return;
    }

    // Cyphal writes need no CONFIG mode: the firmware applies them and persists them
    // through its deferred-save path.
    const int batchId = m_nextBatchId++;
    m_nodes[nodeId].batchFailures.clear();

    for (int i = 0; i < writes.size(); ++i) {
        PendingAccess request;
        request.nodeId = nodeId;
        request.name = writes.at(i).first;
        request.value = writes.at(i).second;
        request.isWrite = true;
        request.batchId = batchId;
        request.endsBatch = (i == writes.size() - 1);
        enqueue(request);
    }
}

void CyphalService::sendServoSetpoint(quint8 nodeId, ServoControlType type, float value)
{
    m_bridge->sendServo(nodeId, static_cast<quint8>(type), value);
}

void CyphalService::sendMitCommand(quint8 nodeId, float position, float velocity, float torque,
                                   float positionGain, float velocityGain)
{
    m_bridge->sendMit(nodeId, position, velocity, torque, positionGain, velocityGain);
}
