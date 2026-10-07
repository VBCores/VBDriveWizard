#include "control/trajectory_worker.h"

#include "transport/device_link.h"

#include <QMutexLocker>

#include <chrono>
#include <thread>

namespace {
/// Set-points are handed to the plot in batches at about this rate, so the GUI thread
/// gets one event per batch instead of one per command. Every command is in a batch:
/// at the 1 kHz MIT rate a decimated stream cuts the peaks and edges of the reference.
constexpr int kSetpointReportHz = 100;
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

    // The waveform is generated incrementally instead of from the elapsed time, so that
    // editing frequency or amplitude bends the reference from where it is rather than
    // jumping it. Keeping the generator here makes it this thread's alone.
    TrajectoryGenerator generator;

    auto nextDeadline = clock::now();
    auto lastStep = nextDeadline;
    TrajectoryBatch batch;
    batch.reserve(reportEvery);

    while (!m_stopRequested.load(std::memory_order_relaxed)) {
        nextDeadline += period;

        // Measured rather than assumed: a cycle that overran must advance the phase by
        // the time it really took, or the trajectory slows down under load. Read even
        // while paused, so that resuming starts from one period and not from the whole
        // length of the pause.
        const auto stepTime = clock::now();
        const double dt = std::chrono::duration<double>(stepTime - lastStep).count();
        lastStep = stepTime;

        if (!m_paused.load(std::memory_order_relaxed)) {
            const TrajectoryParams params = currentParams();
            TrajectoryOutput output = generator.step(params, dt);
            output.t_us = std::chrono::duration_cast<std::chrono::microseconds>(
                                  stepTime.time_since_epoch())
                                  .count();

            if (m_link) {
                if (params.protocol == ControlProtocol::Servo) {
                    m_link->sendServoSetpoint(m_nodeId, params.servoCommand,
                                              static_cast<float>(output.primary));
                } else {
                    m_link->sendMitCommand(m_nodeId, static_cast<float>(output.position),
                                           static_cast<float>(output.velocity),
                                           static_cast<float>(output.torque),
                                           static_cast<float>(output.positionGain),
                                           static_cast<float>(output.velocityGain));
                }
            }

            batch.push_back(output);
            if (batch.size() >= reportEvery) {
                emit setpointsProduced(m_nodeId, batch);
                batch.clear();
            }
        }

        // If a cycle overran, drop the missed slots instead of trying to catch up in
        // a burst, which would flood the link.
        const auto now = clock::now();
        if (nextDeadline < now)
            nextDeadline = now;
        else
            std::this_thread::sleep_until(nextDeadline);
    }
}
