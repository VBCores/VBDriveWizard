#include "transport/cyphal_worker.h"

#include "transport/can_interface_list.h"

#include <cyphal/allocators/sys/sys_allocator.h>
#include <cyphal/cyphal.h>
#include <cyphal/node/registers_utils.hpp>
#include <cyphal/providers/LinuxCAN.h>

#include <uavcan/_register/Access_1_0.hpp>
#include <uavcan/node/Heartbeat_1_0.hpp>
#include <voltbro/foc/MIT_1_0.hpp>
#include <voltbro/foc/Servo_1_0.hpp>
#include <voltbro/foc/State_1_0.hpp>

#include <QDateTime>
#include <QMutexLocker>

#include <cstring>

namespace {

using AccessRequest = uavcan_register_Access_Request_1_0;
using AccessResponse = uavcan_register_Access_Response_1_0;
using Heartbeat = uavcan_node_Heartbeat_1_0;
using FocState = voltbro_foc_State_1_0;
using FocMit = voltbro_foc_MIT_1_0;
using FocServo = voltbro_foc_Servo_1_0;

/// uavcan.register.Value string arm tag; registers_utils.hpp covers the others.
constexpr std::uint8_t kRegisterStringTag = 1U;
constexpr std::uint64_t kQueueLength = 200;
/// Cap on buffered telemetry per drive, so a stalled GUI cannot grow it without bound.
constexpr int kMaxBufferedSamples = 4000;

void setName(uavcan_register_Name_1_0 &out, const QString &name)
{
    const QByteArray bytes = name.toLatin1();
    const size_t n = qMin<size_t>(bytes.size(), sizeof(out.name.elements));
    std::memcpy(out.name.elements, bytes.constData(), n);
    out.name.count = n;
}

/// uavcan.register.Value -> RegisterValue, covering every arm the firmware uses.
RegisterValue toRegisterValue(const uavcan_register_Value_1_0 &value)
{
    bool asBool = false;
    float asFloat = 0.0F;
    std::int32_t asInt = 0;
    std::uint32_t asUint = 0;

    if (value._tag_ == REGISTER_EMPTY_TAG)
        return RegisterValue{};
    if (parse_register_bit(value, asBool))
        return RegisterValue::fromBool(asBool);
    if (parse_register_integer32(value, asInt))
        return RegisterValue::fromInt32(asInt);
    if (parse_register_natural32(value, asUint))
        return RegisterValue::fromUInt32(asUint);
    if (parse_register_real32(value, asFloat))
        return RegisterValue::fromReal32(static_cast<double>(asFloat));
    if (value._tag_ == kRegisterStringTag) {
        return RegisterValue::fromString(QString::fromLatin1(
                reinterpret_cast<const char *>(value._string.value.elements),
                static_cast<int>(value._string.value.count)));
    }
    return RegisterValue{};
}

/// RegisterValue -> uavcan.register.Value. An Empty value means "read, do not write".
void fromRegisterValue(uavcan_register_Value_1_0 &out, const RegisterValue &value)
{
    std::memset(&out, 0, sizeof(out));
    switch (value.type()) {
    case RegisterType::Empty:
        out._tag_ = REGISTER_EMPTY_TAG;
        break;
    case RegisterType::Bool:
        fill_register_bit(out, value.toBool());
        break;
    case RegisterType::Int32:
        fill_register_integer32(out, value.toInt32());
        break;
    case RegisterType::UInt32:
        fill_register_natural32(out, value.toUInt32());
        break;
    case RegisterType::Real32:
        fill_register_real32(out, static_cast<float>(value.toDouble()));
        break;
    case RegisterType::String: {
        const QByteArray bytes = value.toString().toLatin1();
        const size_t n = qMin<size_t>(bytes.size(), sizeof(out._string.value.elements));
        out._tag_ = kRegisterStringTag;
        std::memcpy(out._string.value.elements, bytes.constData(), n);
        out._string.value.count = n;
        break;
    }
    }
}

} // namespace

CyphalBridge::CyphalBridge(QObject *parent)
    : QObject(parent)
{
}

CyphalBridge::~CyphalBridge()
{
    close();
}

bool CyphalBridge::open(const QString &interfaceName, quint8 localNodeId, QString *error)
{
    close();

    // LinuxCAN cannot report a usable error for a missing, down or classic-CAN
    // interface, so the selection is validated before the socket is opened.
    const CanInterfaceInfo info = CanInterfaceList::describe(interfaceName);
    if (!info.usable()) {
        if (error)
            *error = info.problem();
        return false;
    }

    m_localNodeId = localNodeId;
    m_accessTransferId.fill(0);
    m_mitTransferId.fill(0);
    m_servoTransferId.fill(0);
    m_heartbeatTransferId = 0;
    m_uptimeSeconds = 0;
    {
        QMutexLocker locker(&m_telemetryMutex);
        m_telemetry.clear();
    }

    // The error handler is called from deep inside the CAN loop. The upstream
    // examples exit(1) here; a GUI must survive a malformed frame, so it only reports.
    UtilityConfig config(_micros_64, [this] {
        emit bridgeError(tr("The Cyphal stack reported an internal error."));
    });

    try {
        m_interface = CyphalInterface::create_heap<LinuxCAN, SystemAllocator>(
                localNodeId, interfaceName.toStdString(), kQueueLength, config);
    } catch (const std::exception &e) {
        m_interface.reset();
        if (error)
            *error = QString::fromUtf8(e.what());
        return false;
    }

    if (!m_interface || !LinuxCAN::last_construction_ok()) {
        m_interface.reset();
        if (error) {
            const std::string &reason = LinuxCAN::last_construction_error();
            *error = reason.empty()
                    ? tr("Could not open CAN interface %1.").arg(interfaceName)
                    : QString::fromStdString(reason);
        }
        return false;
    }

    subscribeAll();
    m_interface->start_threads();
    return true;
}

void CyphalBridge::close()
{
    if (!m_interface)
        return;
    // Destroying the interface stops the RX/TX threads and drops every subscription.
    m_interface.reset();
}

void CyphalBridge::subscribeAll()
{
    // Every drive publishes heartbeat and state to the same ports, so the sender is
    // taken from the transfer metadata rather than from the port id.
    m_interface->subscribe(kHeartbeatPort, [this](const Heartbeat &, CanardRxTransfer *transfer) {
        emit heartbeatReceived(static_cast<quint8>(transfer->metadata.remote_node_id));
    });

    m_interface->subscribe(kStatePort, [this](const FocState &state, CanardRxTransfer *transfer) {
        TelemetrySample sample;
        sample.t_us = state.timestamp.microsecond != 0
                ? static_cast<qint64>(state.timestamp.microsecond)
                : QDateTime::currentMSecsSinceEpoch() * 1000;
        sample.position = state.pos.radian;
        sample.velocity = state.vel.radian_per_second;
        sample.torque = state._torq.newton_meter;

        const auto nodeId = static_cast<quint8>(transfer->metadata.remote_node_id);
        QMutexLocker locker(&m_telemetryMutex);
        TelemetryBatch &batch = m_telemetry[nodeId];
        if (batch.size() >= kMaxBufferedSamples)
            batch.remove(0, batch.size() - kMaxBufferedSamples + 1);
        batch.push_back(sample);
    });

    m_interface->subscribe(kRegisterAccessPort, CanardTransferKindResponse,
                           [this](const AccessResponse &response, CanardRxTransfer *transfer) {
                               emit accessResponse(
                                       static_cast<quint8>(transfer->metadata.remote_node_id),
                                       static_cast<int>(transfer->metadata.transfer_id),
                                       toRegisterValue(response.value), response._mutable);
                           });
}

int CyphalBridge::sendAccessRequest(quint8 nodeId, const QString &name,
                                    const RegisterValue &value)
{
    if (!m_interface || nodeId >= m_accessTransferId.size())
        return -1;

    AccessRequest request{};
    setName(request.name, name);
    fromRegisterValue(request.value, value);

    // Only the low 5 bits reach the wire, so correlation must use the masked value.
    CanardTransferID transferId = m_accessTransferId[nodeId] & CANARD_TRANSFER_ID_MAX;
    const int used = transferId;
    m_interface->send_request(&request, kRegisterAccessPort, &transferId, nodeId);
    m_accessTransferId[nodeId] = (used + 1) & CANARD_TRANSFER_ID_MAX;
    return used;
}

void CyphalBridge::sendServo(quint8 nodeId, quint8 setPointType, float value)
{
    if (!m_interface || nodeId >= m_servoTransferId.size())
        return;

    FocServo command{};
    command.set_point_type = setPointType;
    command.set_point_value = value;

    CanardTransferID transferId = m_servoTransferId[nodeId];
    m_interface->send_msg(&command, static_cast<CanardPortID>(kServoPortBase + nodeId),
                          &transferId);
    m_servoTransferId[nodeId] = transferId;
}

void CyphalBridge::sendMit(quint8 nodeId, float position, float velocity, float torque,
                           float positionGain, float velocityGain)
{
    if (!m_interface || nodeId >= m_mitTransferId.size())
        return;

    FocMit command{};
    command.pos.radian = position;
    command.vel.radian_per_second = velocity;
    command._torq.newton_meter = torque;
    command.pos_gain.value = positionGain;
    command.vel_gain.value = velocityGain;

    CanardTransferID transferId = m_mitTransferId[nodeId];
    m_interface->send_msg(&command, static_cast<CanardPortID>(kMitPortBase + nodeId),
                          &transferId);
    m_mitTransferId[nodeId] = transferId;
}

QHash<quint8, TelemetryBatch> CyphalBridge::takeTelemetry()
{
    QMutexLocker locker(&m_telemetryMutex);
    QHash<quint8, TelemetryBatch> drained;
    drained.swap(m_telemetry);
    return drained;
}

void CyphalBridge::publishHeartbeat()
{
    if (!m_interface)
        return;

    Heartbeat heartbeat{};
    heartbeat.uptime = m_uptimeSeconds++;
    heartbeat.health.value = uavcan_node_Health_1_0_NOMINAL;
    heartbeat.mode.value = uavcan_node_Mode_1_0_OPERATIONAL;
    heartbeat.vendor_specific_status_code = 0;

    CanardTransferID transferId = m_heartbeatTransferId;
    m_interface->send_msg(&heartbeat, kHeartbeatPort, &transferId);
    m_heartbeatTransferId = transferId;
}
