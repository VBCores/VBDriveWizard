#include "control/trajectory_worker.h"

#include "transport/device_link.h"

#include <QMutexLocker>

#include <chrono>
#include <thread>

namespace {
/// Set-points are published to the plot at about this rate, not at the command rate.
constexpr int kSetpointReportHz = 50;
} // namespace

TrajectoryWorker::TrajectoryWorker(quint8 nodeId, DeviceLink *link, int rateHz)
    : m_nodeId(nodeId)
    , m_link(link)
    , m_rateHz(qBound(1, rateHz, 2000))
{
    moveToThread(&m_thread);
    connect(&m_thread, &QThread::started, this, &TrajectoryWorker::run);
}

TrajectoryWorker::~TrajectoryWorker()
{
    stop();
}

void TrajectoryWorker::start(const TrajectoryParams &params)
{
    if (m_running.load())
        return;
    updateParams(params);
    m_stopRequested.store(false);
    m_paused.store(false);
    m_running.store(true);
    m_thread.start(QThread::TimeCriticalPriority);
    emit runningChanged(m_nodeId, true);
}

void TrajectoryWorker::stop()
{
    if (!m_thread.isRunning()) {
        if (m_running.exchange(false))
            emit runningChanged(m_nodeId, false);
        return;
    }
    m_stopRequested.store(true);
    m_thread.quit();
    m_thread.wait();
    if (m_running.exchange(false))
        emit runningChanged(m_nodeId, false);
}

void TrajectoryWorker::updateParams(const TrajectoryParams &params)
{
    QMutexLocker locker(&m_paramsMutex);
    m_params = params;
}

TrajectoryParams TrajectoryWorker::currentParams() const
{
    QMutexLocker locker(&m_paramsMutex);
    return m_params;
}

void TrajectoryWorker::setPaused(bool paused)
{
    m_paused.store(paused);
}

void TrajectoryWorker::run()
{
    using clock = std::chrono::steady_clock;
    const auto period = std::chrono::nanoseconds(1'000'000'000LL / m_rateHz);
    const int reportEvery = qMax(1, m_rateHz / kSetpointReportHz);

    const auto startTime = clock::now();
    auto nextDeadline = startTime;
    qint64 tick = 0;

    while (!m_stopRequested.load(std::memory_order_relaxed)) {
        nextDeadline += period;

        if (!m_paused.load(std::memory_order_relaxed)) {
            const double t =
                    std::chrono::duration<double>(clock::now() - startTime).count();
            const TrajectoryParams params = currentParams();
            const TrajectoryOutput output = Trajectory::evaluate(params, t);

            if (m_link) {
                if (params.protocol == ControlProtocol::Servo) {
                    m_link->sendServoSetpoint(m_nodeId, output.primaryType,
                                              static_cast<float>(output.primary));
                } else {
                    m_link->sendMitCommand(m_nodeId, static_cast<float>(output.position),
                                           static_cast<float>(output.velocity),
                                           static_cast<float>(output.torque),
                                           static_cast<float>(output.positionGain),
                                           static_cast<float>(output.velocityGain));
                }
            }

            if (tick % reportEvery == 0)
                emit setpointProduced(m_nodeId, output);
        }

        ++tick;

        // If a cycle overran, drop the missed slots instead of trying to catch up in
        // a burst, which would flood the link.
        const auto now = clock::now();
        if (nextDeadline < now)
            nextDeadline = now;
        else
            std::this_thread::sleep_until(nextDeadline);
    }
}
