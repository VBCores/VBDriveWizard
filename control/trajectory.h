#ifndef CONTROL_TRAJECTORY_H
#define CONTROL_TRAJECTORY_H

#include "app_types.h"

#include <QMetaType>

/// Everything a trajectory worker needs to produce one command.
///
/// The whole struct is swapped under a mutex on every edit, which is what lets the
/// user change waveform, control type and gains while the trajectory keeps running.
struct TrajectoryParams
{
    ControlProtocol protocol = ControlProtocol::Servo;
    TrajectoryForm form = TrajectoryForm::User;

    // --- Servo ---
    ServoControlType servoType = ServoControlType::Position;
    /// Constant set-point for the User tab, in drive-native units.
    double userTarget = 0.0;

    // --- periodic waveforms (Sin / Meander / Triangle) ---
    double amplitude = 0.0;
    double frequency = 1.0;

    // --- MIT Step tab: one field per mit_cmd argument ---
    double stepPosition = 0.0;
    double stepVelocity = 0.0;
    double stepTorque = 0.0;
    double stepPositionGain = 0.0;
    double stepVelocityGain = 0.0;

    // --- MIT Trajectory Targets tab ---
    /// Which quantity the waveform drives; the others stay at zero.
    ServoControlType mitChannel = ServoControlType::Position;
    /// Position mode only: also send the analytic derivative of the position
    /// trajectory as the velocity target.
    bool sendDerivative = false;
    double positionGain = 0.0;
    double velocityGain = 0.0;
};

/// One command's worth of set-point, in drive-native units (rad, rad/s, N*m).
struct TrajectoryOutput
{
    double position = 0.0;
    double velocity = 0.0;
    double torque = 0.0;
    double positionGain = 0.0;
    double velocityGain = 0.0;
    /// The quantity the user is actually driving - what the plot shows as the
    /// set-point trace.
    double primary = 0.0;
    ServoControlType primaryType = ServoControlType::Position;
};

Q_DECLARE_METATYPE(TrajectoryParams)
Q_DECLARE_METATYPE(TrajectoryOutput)

namespace Trajectory {

/// Waveform value at time `t` (seconds since the trajectory started).
double value(const TrajectoryParams &params, double t);

/// Analytic time derivative of value(), used for the MIT "+derivative" option.
double derivative(const TrajectoryParams &params, double t);

/// Builds the full command for time `t`.
TrajectoryOutput evaluate(const TrajectoryParams &params, double t);

} // namespace Trajectory

#endif // CONTROL_TRAJECTORY_H
