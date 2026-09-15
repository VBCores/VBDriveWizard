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

TrajectoryWorker *ControlManager::workerFor(quint8 nodeId) const
{
    return m_workers.value(nodeId, nullptr);
}

void ControlManager::destroyWorker(quint8 nodeId)
{
    TrajectoryWorker *worker = m_workers.take(nodeId);
    if (!worker)
        return;
    worker->stop();
    delete worker;  // parentless by design: moveToThread() forbids a parent
    m_protocols.remove(nodeId);
}

void ControlManager::start(quint8 nodeId, const TrajectoryParams &params)
{
    if (!m_link)
        return;

    // A protocol change means a different command rate, so the worker is rebuilt.
    if (TrajectoryWorker *existing = workerFor(nodeId)) {
        if (m_protocols.value(nodeId) == params.protocol) {
            existing->updateParams(params);
            if (!existing->isRunning())
                existing->start(params);
            return;
        }
        destroyWorker(nodeId);
    }

    auto *worker = new TrajectoryWorker(nodeId, m_link, effectiveRateHz(params.protocol));
    connect(worker, &TrajectoryWorker::setpointProduced, this,
            &ControlManager::setpointProduced, Qt::QueuedConnection);
    connect(worker, &TrajectoryWorker::runningChanged, this, &ControlManager::runningChanged,
            Qt::QueuedConnection);

    m_workers.insert(nodeId, worker);
    m_protocols.insert(nodeId, params.protocol);
    worker->start(params);
}

void ControlManager::stop(quint8 nodeId)
{
    if (TrajectoryWorker *worker = workerFor(nodeId))
        worker->stop();
    destroyWorker(nodeId);
    emit runningChanged(nodeId, false);
}

void ControlManager::stopAll()
{
    const QList<quint8> nodeIds = m_workers.keys();
    for (quint8 nodeId : nodeIds)
        stop(nodeId);
}

void ControlManager::updateParams(quint8 nodeId, const TrajectoryParams &params)
{
    TrajectoryWorker *worker = workerFor(nodeId);
    if (!worker)
        return;
    if (m_protocols.value(nodeId) != params.protocol) {
        start(nodeId, params);  // rebuilds at the new rate
        return;
    }
    worker->updateParams(params);
}

bool ControlManager::isRunning(quint8 nodeId) const
{
    TrajectoryWorker *worker = workerFor(nodeId);
    return worker && worker->isRunning();
}

bool ControlManager::anyRunning() const
{
    for (TrajectoryWorker *worker : m_workers) {
        if (worker->isRunning())
            return true;
    }
    return false;
}

QList<quint8> ControlManager::runningNodes() const
{
    QList<quint8> nodes;
    for (auto it = m_workers.constBegin(); it != m_workers.constEnd(); ++it) {
        if (it.value()->isRunning())
            nodes << it.key();
    }
    return nodes;
}

void ControlManager::setPaused(quint8 nodeId, bool paused)
{
    if (TrajectoryWorker *worker = workerFor(nodeId))
        worker->setPaused(paused);
}
