#ifndef CONTROL_TRAJECTORY_WORKER_H
#define CONTROL_TRAJECTORY_WORKER_H

#include "control/trajectory.h"

#include <QMutex>
#include <QObject>
#include <QThread>

#include <atomic>

class DeviceLink;

/// Generates and sends one drive's reference trajectory on its own thread.
///
/// The worker is bound to a node id, not to the current DeviceList selection, so
/// several drives can run trajectories at once and switching the selected drive never
/// disturbs them.
///
/// Timing uses a steady-clock deadline rather than a QTimer: at the MIT rate of 1 kHz
/// a coarse timer drifts badly. Parameters are swapped under a mutex so the user can
/// change waveform, control type and gains without stopping the motion.
class TrajectoryWorker : public QObject
{
    Q_OBJECT

public:
    /// Deliberately takes no parent: the constructor calls moveToThread(), which
    /// refuses to move an object that has one. ControlManager owns the instance.
    TrajectoryWorker(quint8 nodeId, DeviceLink *link, int rateHz);
    ~TrajectoryWorker() override;

    quint8 nodeId() const { return m_nodeId; }
    int rateHz() const { return m_rateHz; }
    bool isRunning() const { return m_running.load(std::memory_order_relaxed); }

    void start(const TrajectoryParams &params);
    void stop();

    /// Applies new parameters to a running trajectory without interrupting it.
    void updateParams(const TrajectoryParams &params);

    /// Suspends sending while keeping the worker and its phase alive, used when the
    /// drive's heartbeat disappears and the user chooses to wait for it.
    void setPaused(bool paused);
    bool isPaused() const { return m_paused.load(std::memory_order_relaxed); }

signals:
    /// The most recent set-point, throttled to roughly 100 Hz for the plot, and
    /// stamped with its production time so the plot can place it on the telemetry
    /// time base rather than at delivery time.
    void setpointProduced(quint8 nodeId, const TrajectoryOutput &output);
    void runningChanged(quint8 nodeId, bool running);

private slots:
    void run();

private:
    TrajectoryParams currentParams() const;

    quint8 m_nodeId;
    DeviceLink *m_link;
    int m_rateHz;

    QThread m_thread;
    mutable QMutex m_paramsMutex;
    TrajectoryParams m_params;

    std::atomic_bool m_running{false};
    std::atomic_bool m_paused{false};
    std::atomic_bool m_stopRequested{false};
};

#endif // CONTROL_TRAJECTORY_WORKER_H
