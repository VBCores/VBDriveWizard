#include "core/register_catalog.h"

#include <QCoreApplication>
#include <QHash>

#include <cmath>
#include <limits>

namespace {

constexpr bool kRW = true;
constexpr bool kRO = false;
constexpr bool kCfg = true;      ///< Serial writes need CONFIG mode
constexpr bool kRuntime = false;
constexpr bool kInGroup = true;  ///< shown in the CONFIGURATION group box
constexpr bool kNotInGroup = false;

using Q = RegisterQuantity;
using T = RegisterType;

// Order matches the firmware's register.List order, decoded from the descriptor
// table at 0x0801C7FC in VBDrive_full.hex.
const QVector<RegisterInfo> kRegisters = {
    {registers::kGear,            T::UInt32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kMaxCurrent,      T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kMaxSpeed,        T::Real32, kRW, kCfg,     Q::AngularVelocity, kInGroup},
    {registers::kMaxTorque,       T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kAngleOffset,     T::Real32, kRW, kCfg,     Q::Angle,           kInGroup},
    {registers::kAngleDirection,  T::Int32,  kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kMinAngle,        T::Real32, kRW, kCfg,     Q::Angle,           kInGroup},
    {registers::kMaxAngle,        T::Real32, kRW, kCfg,     Q::Angle,           kInGroup},
    {registers::kTorqueConstant,  T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kCurrentKp,       T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kCurrentKi,       T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kCurrentKd,       T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kFilterA,         T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kFilterG1,        T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kFilterG2,        T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kFilterG3,        T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kCurrentLpf,      T::Real32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kAngleEncoder,    T::UInt32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kNodeId,          T::UInt32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kDataBaud,        T::UInt32, kRW, kCfg,     Q::Plain,           kInGroup},
    {registers::kNominalBaud,     T::UInt32, kRW, kCfg,     Q::Plain,           kInGroup},

    {registers::kIsOn,            T::Bool,   kRW, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kBootloader,      T::Bool,   kRW, kRuntime, Q::Plain,           kNotInGroup},

    {registers::kCmdErrors,       T::UInt32, kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kModel,           T::String, kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kFirmwareRev,     T::String, kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kBusVoltage,      T::Real32, kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kBusCurrent,      T::Real32, kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kTempMcu,         T::Real32, kRO, kRuntime, Q::Temperature,     kNotInGroup},
    {registers::kTempStator,      T::Real32, kRO, kRuntime, Q::Temperature,     kNotInGroup},
    {registers::kIsFault,         T::Bool,   kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kEncoderShaft,    T::UInt32, kRO, kRuntime, Q::Plain,           kNotInGroup},
    {registers::kEncoderRotor,    T::UInt32, kRO, kRuntime, Q::Plain,           kNotInGroup},

    // Edited from the CONTROL group's own Set buttons, not from CONFIGURATION,
    // but still persistent so they belong in a saved profile.
    {registers::kServoPosP,       T::Real32, kRW, kCfg,     Q::Plain,           kNotInGroup},
    {registers::kServoPosI,       T::Real32, kRW, kCfg,     Q::Plain,           kNotInGroup},
    {registers::kServoPosD,       T::Real32, kRW, kCfg,     Q::Plain,           kNotInGroup},
    {registers::kServoVelP,       T::Real32, kRW, kCfg,     Q::Plain,           kNotInGroup},
    {registers::kServoVelI,       T::Real32, kRW, kCfg,     Q::Plain,           kNotInGroup},
    {registers::kServoTransientForm, T::UInt32, kRW, kCfg,  Q::Plain,           kNotInGroup},
    {registers::kServoTransientVel,  T::Real32, kRW, kCfg,  Q::AngularVelocity, kNotInGroup},
};

const QHash<QString, const RegisterInfo *> &index()
{
    static const QHash<QString, const RegisterInfo *> map = [] {
        QHash<QString, const RegisterInfo *> m;
        m.reserve(kRegisters.size());
        for (const RegisterInfo &info : kRegisters)
            m.insert(QString::fromLatin1(info.name), &info);
        return m;
    }();
    return map;
}

} // namespace

QStringList registers::nominalBaudNames()
{
    return {QStringLiteral("62.5 kHz"), QStringLiteral("125 kHz"), QStringLiteral("250 kHz"),
            QStringLiteral("500 kHz"), QStringLiteral("1 MHz")};
}

QStringList registers::dataBaudNames()
{
    return {QStringLiteral("1 MHz"), QStringLiteral("2 MHz"), QStringLiteral("4 MHz"),
            QStringLiteral("8 MHz")};
}

const QVector<RegisterInfo> &RegisterCatalog::all()
{
    return kRegisters;
}

const RegisterInfo *RegisterCatalog::find(const QString &name)
{
    return index().value(name, nullptr);
}

QStringList RegisterCatalog::configGroupNames()
{
    QStringList names;
    for (const RegisterInfo &info : kRegisters) {
        if (info.inConfigGroup)
            names << QString::fromLatin1(info.name);
    }
    return names;
}

QStringList RegisterCatalog::profileNames()
{
    QStringList names;
    for (const RegisterInfo &info : kRegisters) {
        if (info.writable && info.configOnly)  // writable and persistent
            names << QString::fromLatin1(info.name);
    }
    return names;
}

bool RegisterCatalog::isWritable(const QString &name)
{
    const RegisterInfo *info = find(name);
    return info && info->writable;
}

bool RegisterCatalog::requiresConfigMode(const QString &name)
{
    const RegisterInfo *info = find(name);
    return info && info->configOnly;
}

bool RegisterCodec::parse(const RegisterInfo &info, const QString &raw, RegisterValue *out)
{
    if (!out)
        return false;
    const QString text = raw.trimmed();

    switch (info.type) {
    case RegisterType::Bool: {
        const QString lowered = text.toLower();
        if (lowered == QLatin1String("true") || lowered == QLatin1String("yes")
            || lowered == QLatin1String("on") || lowered == QLatin1String("1")) {
            *out = RegisterValue::fromBool(true);
            return true;
        }
        if (lowered == QLatin1String("false") || lowered == QLatin1String("no")
            || lowered == QLatin1String("off") || lowered == QLatin1String("0")) {
            *out = RegisterValue::fromBool(false);
            return true;
        }
        return false;
    }
    case RegisterType::Int32: {
        bool ok = false;
        // The firmware prints integers through %ld, but a value that has been round
        // tripped through a float register may still arrive as "1.000000".
        const double asDouble = text.toDouble(&ok);
        if (!ok)
            return false;
        *out = RegisterValue::fromInt32(static_cast<qint32>(qRound(asDouble)));
        return true;
    }
    case RegisterType::UInt32: {
        bool ok = false;
        const double asDouble = text.toDouble(&ok);
        if (!ok || asDouble < 0.0)
            return false;
        *out = RegisterValue::fromUInt32(static_cast<quint32>(qRound(asDouble)));
        return true;
    }
    case RegisterType::Real32: {
        const QString lowered = text.toLower();
        if (lowered.isEmpty() || lowered == QLatin1String("nan")
            || lowered == QLatin1String(".nan") || lowered == QLatin1String("-nan")
            || lowered == QLatin1String("~")) {
            *out = RegisterValue::fromReal32(std::numeric_limits<double>::quiet_NaN());
            return true;
        }
        bool ok = false;
        const double value =
                QString(text).replace(QLatin1Char(','), QLatin1Char('.')).toDouble(&ok);
        if (!ok)
            return false;
        *out = RegisterValue::fromReal32(value);
        return true;
    }
    case RegisterType::String:
        *out = RegisterValue::fromString(text);
        return true;
    case RegisterType::Empty:
        break;
    }
    return false;
}

QString RegisterCodec::format(const RegisterValue &value)
{
    switch (value.type()) {
    case RegisterType::Bool:
        return value.toBool() ? QStringLiteral("1") : QStringLiteral("0");
    case RegisterType::Int32:
        return QString::number(value.toInt32());
    case RegisterType::UInt32:
        return QString::number(value.toUInt32());
    case RegisterType::Real32: {
        const double d = value.toDouble();
        if (std::isnan(d))
            return QStringLiteral("nan");
        // Plain decimal notation, as the firmware itself prints reals (%f): the
        // 'g' form would send a small offset as "1.5e-05".
        return QString::number(d, 'f', 6);
    }
    case RegisterType::String:
        return value.toString();
    case RegisterType::Empty:
        break;
    }
    return QString();
}
