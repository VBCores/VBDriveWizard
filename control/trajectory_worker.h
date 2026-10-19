#ifndef CONTROL_TRAJECTORY_WORKER_H
#define CONTROL_TRAJECTORY_WORKER_H

#include "control/trajectory.h"

#include <QHash>
#include <QMutex>
#include <QObject>
#include <QThread>

#include <atomic>

class DeviceLink;

/// Generates one reference trajectory on its own thread and sends it to every drive
/// of the group.
///
/// There is a single generator for the whole group: each cycle computes one point and
/// every drive gets that same point, so drives that joined at different moments still
/// follow the same waveform in the same phase. The group is independent of the
/// DeviceList selection, so switching the selected drive never disturbs it.
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
    TrajectoryWorker(DeviceLink *link, int rateHz);
    ~TrajectoryWorker() override;

    int rateHz() const { return m_rateHz; }
    bool isRunning() const { return m_running.load(std::memory_order_relaxed); }

    void start(const TrajectoryParams &params);
    void stop();

    /// Applies new parameters to a running trajectory without interrupting it.
    void updateParams(const TrajectoryParams &params);

    /// A drive joins at the current point of the trajectory, not at its start.
    void addNode(quint8 nodeId);
    /// Returns whether any drive is left in the group.
    bool removeNode(quint8 nodeId);
    bool hasNode(quint8 nodeId) const;
    QList<quint8> nodes() const;

    /// Stops sending to one drive while its heartbeat is missing and the user chooses
    /// to wait for it. The trajectory itself runs on, so the drive comes back at the
    /// group's current point.
    void setPaused(quint8 nodeId, bool paused);
    bool isPaused(quint8 nodeId) const;

signals:
    /// Every command sent since the previous batch, delivered at roughly 100 Hz. Each
    /// is stamped with its production time so the plot can place it on the telemetry
    /// time base rather than at delivery time.
    void setpointsProduced(const TrajectoryBatch &outputs);

private slots:
    void run();

private:
    /// Parameters and the drives that are not paused, taken under one lock per cycle.
    TrajectoryParams currentParams(QList<quint8> *activeNodes) const;

    DeviceLink *m_link;
    int m_rateHz;

    QThread m_thread;
    mutable QMutex m_mutex;
    TrajectoryParams m_params;
    /// Node id -> paused.
    QHash<quint8, bool> m_nodes;

    std::atomic_bool m_running{false};
    std::atomic_bool m_stopRequested{false};
};

#endif // CONTROL_TRAJECTORY_WORKER_H
