#ifndef CONTROL_CONTROL_MANAGER_H
#define CONTROL_CONTROL_MANAGER_H

#include "control/trajectory.h"

#include <QHash>
#include <QObject>

class DeviceLink;
class TrajectoryWorker;

/// Owns one trajectory worker per drive.
///
/// Workers are keyed by node id and are deliberately independent of the DeviceList
/// selection: selecting another drive does not stop, reset or re-target a running
/// trajectory, which is what makes it possible to exercise several drives at once.
class ControlManager : public QObject
{
    Q_OBJECT

public:
    /// Command rates from the spec. The Serial link cannot sustain the MIT rate and
    /// says so through DeviceLink; see effectiveRateHz().
    static constexpr int kServoRateHz = 100;
    static constexpr int kMitRateHz = 1000;

    explicit ControlManager(QObject *parent = nullptr);
    ~ControlManager() override;

    /// Called on every connect/disconnect. Stops everything still running on the old
    /// link before switching.
    void setLink(DeviceLink *link);

    void start(quint8 nodeId, const TrajectoryParams &params);
    void stop(quint8 nodeId);
    /// Emergency stop: every drive, every protocol.
    void stopAll();

    /// Applies new parameters to a running trajectory without interrupting it.
    /// Switching between the Servo and MIT protocols restarts the worker, because the
    /// two run at different rates.
    void updateParams(quint8 nodeId, const TrajectoryParams &params);

    bool isRunning(quint8 nodeId) const;
    bool anyRunning() const;
    QList<quint8> runningNodes() const;

    /// Suspends a drive's trajectory while its heartbeat is missing, and resumes it
    /// when the drive comes back.
    void setPaused(quint8 nodeId, bool paused);

    /// Rate the given protocol actually runs at on the current link.
    int effectiveRateHz(ControlProtocol protocol) const;

signals:
    void setpointProduced(quint8 nodeId, const TrajectoryOutput &output);
    void runningChanged(quint8 nodeId, bool running);

private:
    TrajectoryWorker *workerFor(quint8 nodeId) const;
    void destroyWorker(quint8 nodeId);

    DeviceLink *m_link = nullptr;
    QHash<quint8, TrajectoryWorker *> m_workers;
    QHash<quint8, ControlProtocol> m_protocols;
};

#endif // CONTROL_CONTROL_MANAGER_H
