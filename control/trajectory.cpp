#include "control/trajectory.h"

#include "core/units.h"

#include <algorithm>
#include <cmath>

namespace {

/// Time constant of the first-order slew applied to amplitude and frequency. Short
/// enough that an edit still feels immediate, long enough that the step it replaces is
/// spread over hundreds of commands at the MIT rate.
constexpr double kSlewTau = 0.15;

/// Wraps an accumulated phase into [0, 1).
double wrapPhase(double phase)
{
    phase = std::fmod(phase, 1.0);
    if (phase < 0.0)
        phase += 1.0;
    return phase;
}

/// Unit triangle wave: 0 at phase 0, +1 at 0.25, 0 at 0.5, -1 at 0.75.
double unitTriangle(double phase)
{
    if (phase < 0.25)
        return 4.0 * phase;
    if (phase < 0.75)
        return 2.0 - 4.0 * phase;
    return 4.0 * phase - 4.0;
}

/// Moves `current` towards `target` by one step of a first-order lag, and snaps onto
/// the target once the remainder stops mattering, so the value settles exactly.
void slew(double &current, double target, double dt)
{
    const double remaining = target - current;
    const double epsilon = 1e-9 * std::max(1.0, std::abs(target));
    if (std::abs(remaining) <= epsilon || dt <= 0.0) {
        current = target;
        return;
    }
    current += remaining * (1.0 - std::exp(-dt / kSlewTau));
}

} // namespace

double Trajectory::value(const TrajectoryParams &params, const TrajectoryState &state)
{
    switch (params.form) {
    case TrajectoryForm::User:
        return params.userTarget;
    case TrajectoryForm::Step:
        return params.stepPosition;
    case TrajectoryForm::Sin:
        return state.amplitude * std::sin(2.0 * units::kPi * state.phase);
    case TrajectoryForm::Meander:
        return state.phase < 0.5 ? state.amplitude : -state.amplitude;
    case TrajectoryForm::Triangle:
        return state.amplitude * unitTriangle(state.phase);
    }
    return 0.0;
}

double Trajectory::derivative(const TrajectoryParams &params, const TrajectoryState &state)
{
    switch (params.form) {
    case TrajectoryForm::User:
    case TrajectoryForm::Step:
        return 0.0;
    case TrajectoryForm::Sin:
        return state.amplitude * 2.0 * units::kPi * state.frequency
                * std::cos(2.0 * units::kPi * state.phase);
    case TrajectoryForm::Meander:
        // A square wave is piecewise constant; its derivative is zero except at the
        // edges, where it is an impulse that cannot be commanded.
        return 0.0;
    case TrajectoryForm::Triangle: {
        const double slope = (state.phase < 0.25 || state.phase >= 0.75) ? 4.0 : -4.0;
        return state.amplitude * slope * state.frequency;
    }
    }
    return 0.0;
}

TrajectoryOutput Trajectory::evaluate(const TrajectoryParams &params,
                                      const TrajectoryState &state)
{
    TrajectoryOutput out;

    if (params.protocol == ControlProtocol::Servo) {
        out.primaryType = params.servoType;
        out.primary = value(params, state);
        switch (params.servoType) {
        case ServoControlType::Position:
            out.position = out.primary;
            break;
        case ServoControlType::Velocity:
            out.velocity = out.primary;
            break;
        case ServoControlType::Torque:
        case ServoControlType::Voltage:
            out.torque = out.primary;
            break;
        }
        return out;
    }

    // MIT
    if (params.form == TrajectoryForm::Step) {
        out.position = params.stepPosition;
        out.velocity = params.stepVelocity;
        out.torque = params.stepTorque;
        out.positionGain = params.stepPositionGain;
        out.velocityGain = params.stepVelocityGain;
        out.primaryType = ServoControlType::Position;
        out.primary = out.position;
        return out;
    }

    out.positionGain = params.positionGain;
    out.velocityGain = params.velocityGain;
    out.primaryType = params.mitChannel;
    out.primary = value(params, state);

    switch (params.mitChannel) {
    case ServoControlType::Position:
        out.position = out.primary;
        // Feeding the analytic derivative as the velocity target keeps the velocity
        // term of the MIT law consistent with the position trajectory.
        if (params.sendDerivative)
            out.velocity = derivative(params, state);
        break;
    case ServoControlType::Velocity:
        out.velocity = out.primary;
        break;
    case ServoControlType::Torque:
    case ServoControlType::Voltage:
        out.torque = out.primary;
        break;
    }
    return out;
}

TrajectoryOutput TrajectoryGenerator::step(const TrajectoryParams &params, double dt)
{
    if (!m_primed) {
        m_state.amplitude = params.amplitude;
        m_state.frequency = params.frequency;
        m_primed = true;
    } else {
        slew(m_state.amplitude, params.amplitude, dt);
        slew(m_state.frequency, std::max(0.0, params.frequency), dt);
    }

    // Integrating keeps the phase where it was when the frequency changed; a zero
    // frequency simply holds the current point of the waveform.
    if (dt > 0.0)
        m_state.phase = wrapPhase(m_state.phase + m_state.frequency * dt);

    return Trajectory::evaluate(params, m_state);
}
