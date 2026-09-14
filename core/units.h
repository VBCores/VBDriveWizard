#ifndef CORE_UNITS_H
#define CORE_UNITS_H

#include "app_types.h"

#include <cmath>

namespace units {

inline constexpr double kPi = 3.14159265358979323846;
inline constexpr double kRadToDeg = 180.0 / kPi;
inline constexpr double kDegToRad = kPi / 180.0;

/// Drive-native (radian) value -> the unit currently shown in the UI.
inline double fromRadians(double radians, AngleUnit unit)
{
    return unit == AngleUnit::Degrees ? radians * kRadToDeg : radians;
}

/// Value as entered by the user -> drive-native radians.
inline double toRadians(double displayed, AngleUnit unit)
{
    return unit == AngleUnit::Degrees ? displayed * kDegToRad : displayed;
}

inline double kelvinToCelsius(double kelvin)
{
    return kelvin - 273.15;
}

inline const char *angleSuffix(AngleUnit unit)
{
    return unit == AngleUnit::Degrees ? "deg" : "rad";
}

inline const char *angularVelocitySuffix(AngleUnit unit)
{
    return unit == AngleUnit::Degrees ? "deg/s" : "rad/s";
}

} // namespace units

#endif // CORE_UNITS_H
