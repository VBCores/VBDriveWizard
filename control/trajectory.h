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
    /// Host wall clock (hostTimeUs()) at the moment the command was produced, in the
    /// same clock as TelemetrySample::t_us. The plot needs it to place the set-point
    /// on the same time base as the measurement instead of at delivery time.
    qint64 t_us = 0;
};

Q_DECLARE_METATYPE(TrajectoryParams)
Q_DECLARE_METATYPE(TrajectoryOutput)

/// The part of the waveform the generator carries between commands.
///
/// Phase is integrated rather than recomputed from the elapsed time, and amplitude and
/// frequency lag the values in TrajectoryParams, so that an edit never moves the
/// set-point in a single step.
struct TrajectoryState
{
    /// Position inside the period, in cycles, kept in [0, 1).
    double phase = 0.0;
    /// Amplitude actually in use, slewing towards TrajectoryParams::amplitude.
    double amplitude = 0.0;
    /// Frequency actually in use, slewing towards TrajectoryParams::frequency.
    double frequency = 0.0;
};

namespace Trajectory {

/// Waveform value for the given state.
double value(const TrajectoryParams &params, const TrajectoryState &state);

/// Analytic time derivative of value(), used for the MIT "+derivative" option.
double derivative(const TrajectoryParams &params, const TrajectoryState &state);

/// Builds the full command for the given state.
TrajectoryOutput evaluate(const TrajectoryParams &params, const TrajectoryState &state);

} // namespace Trajectory

/// Produces the reference trajectory one command at a time, continuously.
///
/// Evaluating a waveform as f(2*pi*frequency*t) makes the set-point jump the moment the
/// user edits the frequency: the same instant t suddenly maps to a different phase, and
/// the drive is asked to follow a step. The generator instead integrates the phase, so a
/// frequency edit only changes how fast the phase advances from where it already is, and
/// slews amplitude and frequency towards the requested values over a short time constant,
/// so an edit of either spreads over many command cycles instead of one.
class TrajectoryGenerator
{
public:
    /// Advances the state by `dt` seconds and returns the command for the new instant.
    /// The first call adopts the requested amplitude and frequency directly - there is
    /// nothing yet to move away from.
    TrajectoryOutput step(const TrajectoryParams &params, double dt);

    const TrajectoryState &state() const { return m_state; }

private:
    TrajectoryState m_state;
    bool m_primed = false;
};

#endif // CONTROL_TRAJECTORY_H
