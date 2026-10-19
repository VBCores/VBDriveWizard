#include "control/control_manager.h"

#include "control/trajectory_worker.h"
#include "transport/device_link.h"

ControlManager::ControlManager(QObject *parent)
    : QObject(parent)
{
}

ControlManager::~ControlManager()
{
    stopAll();
}

void ControlManager::setLink(DeviceLink *link)
{
    if (m_link == link)
        return;
    stopAll();
    m_link = link;
}

int ControlManager::effectiveRateHz(ControlProtocol protocol) const
{
    const int wanted = (protocol == ControlProtocol::Mit) ? kMitRateHz : kServoRateHz;
    if (!m_link)
        return wanted;

    // At 115200 baud a mit_cmd line plus its ack is about 68 bytes, so the Serial
    // link saturates near 170 Hz and cannot carry the spec's 1 kHz MIT rate. The link
    // reports what it can sustain rather than silently dropping commands.
    const int limit = (m_link->kind() == LinkKind::Serial) ? 100 : wanted;
    return qMin(wanted, limit);
}

void ControlManager::createWorker(const TrajectoryParams &params, const QList<quint8> &nodes)
{
    m_worker = new TrajectoryWorker(m_link, effectiveRateHz(params.protocol));
    m_protocol = params.protocol;
    connect(m_worker, &TrajectoryWorker::setpointsProduced, this,
            &ControlManager::setpointsProduced, Qt::QueuedConnection);
    for (quint8 nodeId : nodes)
        m_worker->addNode(nodeId);
    m_worker->start(params);
}

void ControlManager::destroyWorker()
{
    if (!m_worker)
        return;
    m_worker->stop();
    delete m_worker;  // parentless by design: moveToThread() forbids a parent
    m_worker = nullptr;
}

void ControlManager::start(quint8 nodeId, const TrajectoryParams &params)
{
    if (!m_link)
        return;

    if (!m_worker) {
        createWorker(params, {nodeId});
    } else {
        // The new drive joins the trajectory already running; the parameters, which
        // come from the one CONTROL panel, are the group's.
        updateParams(params);
        m_worker->addNode(nodeId);
    }
    emit runningChanged(nodeId, true);
}

void ControlManager::stop(quint8 nodeId)
{
    if (m_worker && !m_worker->removeNode(nodeId))
        destroyWorker();
    emit runningChanged(nodeId, false);
}

void ControlManager::stopAll()
{
    const QList<quint8> nodeIds = runningNodes();
    for (quint8 nodeId : nodeIds)
        stop(nodeId);
}

void ControlManager::updateParams(const TrajectoryParams &params)
{
    if (!m_worker)
        return;
    if (m_protocol != params.protocol) {
        // A different command rate: the worker is rebuilt for the same drives, which
        // stay in the group throughout.
        const QList<quint8> nodes = m_worker->nodes();
        destroyWorker();
        createWorker(params, nodes);
        return;
    }
    m_worker->updateParams(params);
}

bool ControlManager::isRunning(quint8 nodeId) const
{
    return m_worker && m_worker->hasNode(nodeId);
}

bool ControlManager::anyRunning() const
{
    return m_worker != nullptr;
}

QList<quint8> ControlManager::runningNodes() const
{
    return m_worker ? m_worker->nodes() : QList<quint8>();
}

std::optional<ControlProtocol> ControlManager::runningProtocol() const
{
    if (!m_worker)
        return std::nullopt;
    return m_protocol;
}

void ControlManager::setPaused(quint8 nodeId, bool paused)
{
    if (m_worker)
        m_worker->setPaused(nodeId, paused);
}

bool ControlManager::isPaused(quint8 nodeId) const
{
    return m_worker && m_worker->isPaused(nodeId);
}
