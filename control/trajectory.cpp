#include "control/trajectory.h"

#include "core/units.h"

#include <cmath>

namespace {

/// Phase in [0, 1) at time `t` for the given frequency.
double phaseAt(double frequency, double t)
{
    if (frequency <= 0.0)
        return 0.0;
    double phase = std::fmod(frequency * t, 1.0);
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

} // namespace

double Trajectory::value(const TrajectoryParams &params, double t)
{
    switch (params.form) {
    case TrajectoryForm::User:
        return params.userTarget;
    case TrajectoryForm::Step:
        return params.stepPosition;
    case TrajectoryForm::Sin:
        return params.amplitude * std::sin(2.0 * units::kPi * params.frequency * t);
    case TrajectoryForm::Meander:
        return phaseAt(params.frequency, t) < 0.5 ? params.amplitude : -params.amplitude;
    case TrajectoryForm::Triangle:
        return params.amplitude * unitTriangle(phaseAt(params.frequency, t));
    }
    return 0.0;
}

double Trajectory::derivative(const TrajectoryParams &params, double t)
{
    switch (params.form) {
    case TrajectoryForm::User:
    case TrajectoryForm::Step:
        return 0.0;
    case TrajectoryForm::Sin:
        return params.amplitude * 2.0 * units::kPi * params.frequency
                * std::cos(2.0 * units::kPi * params.frequency * t);
    case TrajectoryForm::Meander:
        // A square wave is piecewise constant; its derivative is zero except at the
        // edges, where it is an impulse that cannot be commanded.
        return 0.0;
    case TrajectoryForm::Triangle: {
        const double phase = phaseAt(params.frequency, t);
        const double slope = (phase < 0.25 || phase >= 0.75) ? 4.0 : -4.0;
        return params.amplitude * slope * params.frequency;
    }
    }
    return 0.0;
}

TrajectoryOutput Trajectory::evaluate(const TrajectoryParams &params, double t)
{
    TrajectoryOutput out;

    if (params.protocol == ControlProtocol::Servo) {
        out.primaryType = params.servoType;
        out.primary = value(params, t);
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
    out.primary = value(params, t);

    switch (params.mitChannel) {
    case ServoControlType::Position:
        out.position = out.primary;
        // Feeding the analytic derivative as the velocity target keeps the velocity
        // term of the MIT law consistent with the position trajectory.
        if (params.sendDerivative)
            out.velocity = derivative(params, t);
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
