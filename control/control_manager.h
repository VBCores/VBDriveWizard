#ifndef CONTROL_CONTROL_MANAGER_H
#define CONTROL_CONTROL_MANAGER_H

#include "control/trajectory.h"

#include <QObject>

#include <optional>

class DeviceLink;
class TrajectoryWorker;

/// Owns the one trajectory that is running, and the group of drives following it.
///
/// Several drives can be exercised at once, but only on the same trajectory: a drive
/// that is started while others run joins them at the current point, in the same
/// phase, rather than starting a waveform of its own. The group is independent of the
/// DeviceList selection: selecting another drive does not stop, reset or re-target it.
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

    /// Adds the drive to the group, starting the trajectory if nothing runs yet. The
    /// parameters apply to the whole group.
    void start(quint8 nodeId, const TrajectoryParams &params);
    /// Takes the drive out of the group; the others keep running.
    void stop(quint8 nodeId);
    /// Emergency stop: every drive, every protocol.
    void stopAll();

    /// Applies new parameters to the running trajectory, for every drive of the group,
    /// without interrupting it. Switching between the Servo and MIT protocols restarts
    /// the worker, because the two run at different rates.
    void updateParams(const TrajectoryParams &params);

    bool isRunning(quint8 nodeId) const;
    bool anyRunning() const;
    QList<quint8> runningNodes() const;
    /// Protocol of the running trajectory, none while nothing runs.
    std::optional<ControlProtocol> runningProtocol() const;

    /// Stops sending to a drive while its heartbeat is missing, and resumes it at the
    /// group's current point when the drive comes back.
    void setPaused(quint8 nodeId, bool paused);
    bool isPaused(quint8 nodeId) const;

    /// Rate the given protocol actually runs at on the current link.
    int effectiveRateHz(ControlProtocol protocol) const;

signals:
    /// The commands sent to every drive of the group.
    void setpointsProduced(const TrajectoryBatch &outputs);
    void runningChanged(quint8 nodeId, bool running);

private:
    /// Starts a worker for the given parameters and drives.
    void createWorker(const TrajectoryParams &params, const QList<quint8> &nodes);
    void destroyWorker();

    DeviceLink *m_link = nullptr;
    TrajectoryWorker *m_worker = nullptr;
    ControlProtocol m_protocol = ControlProtocol::Servo;
};

#endif // CONTROL_CONTROL_MANAGER_H
