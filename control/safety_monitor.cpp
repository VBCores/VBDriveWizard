#include "control/safety_monitor.h"

#include "core/register_catalog.h"
#include "core/units.h"

#include <cmath>

namespace {

/// Why this reading breaks the limits, or an empty string. A reading that is not
/// known (empty, or NaN) breaks nothing.
QString problemWith(const QString &name, const RegisterValue &value,
                    const SafetySettings &limits)
{
    if (name == QLatin1String(registers::kIsFault)) {
        return value.toBool()
                ? SafetyMonitor::tr("The actuator reports a fault (is_fault = 1).")
                : QString();
    }

    QString what;
    double limitC = 0.0;
    if (name == QLatin1String(registers::kTempStator)) {
        what = SafetyMonitor::tr("Stator");
        limitC = limits.max_stator_temp_c;
    } else if (name == QLatin1String(registers::kTempMcu)) {
        what = SafetyMonitor::tr("Microcontroller");
        limitC = limits.max_mcu_temp_c;
    } else {
        return QString();
    }

    const double kelvin = value.toDouble();
    if (!std::isfinite(kelvin))
        return QString();
    const double celsius = units::kelvinToCelsius(kelvin);
    if (celsius <= limitC)
        return QString();
    return SafetyMonitor::tr("%1 temperature %2 °C exceeded the limit of %3 °C set in "
                             "Preferences.")
            .arg(what)
            .arg(celsius, 0, 'f', 1)
            .arg(limitC, 0, 'f', 1);
}

} // namespace

const QStringList &SafetyMonitor::watchedRegisters()
{
    static const QStringList names = {
        QString::fromLatin1(registers::kTempStator),
        QString::fromLatin1(registers::kTempMcu),
        QString::fromLatin1(registers::kIsFault),
    };
    return names;
}

void SafetyMonitor::check(quint8 nodeId, const QString &name, const RegisterValue &value)
{
    if (m_tripped.contains(nodeId))
        return;
    const QString reason = problemWith(name, value, m_limits);
    if (reason.isEmpty())
        return;
    m_tripped.insert(nodeId);
    emit tripped(nodeId, reason);
}

QString SafetyMonitor::preStartProblem(const RegisterValue &isFault,
                                       const RegisterValue &tempStator,
                                       const RegisterValue &tempMcu, const SafetySettings &limits)
{
    if (isFault.toBool()) {
        return tr("The actuator reports a fault (is_fault = 1). Clear the fault before "
                  "starting.");
    }
    QString problem = problemWith(QString::fromLatin1(registers::kTempStator), tempStator, limits);
    if (problem.isEmpty())
        problem = problemWith(QString::fromLatin1(registers::kTempMcu), tempMcu, limits);
    return problem;
}
