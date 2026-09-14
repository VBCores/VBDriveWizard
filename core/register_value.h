#ifndef CORE_REGISTER_VALUE_H
#define CORE_REGISTER_VALUE_H

#include <QMetaType>
#include <QString>
#include <QVariant>

#include <cmath>

/// Wire type of a register, matching the arms of uavcan.register.Value.1.0 that the
/// VBDrive firmware actually uses.
enum class RegisterType
{
    Empty,
    Bool,    ///< Value.bit
    Int32,   ///< Value.integer32
    UInt32,  ///< Value.natural32
    Real32,  ///< Value.real32
    String   ///< Value.string
};

/// A single register reading or pending write.
///
/// Values compare equal when they are the same type and the same value, with one
/// deliberate exception: two NaN reals compare equal. NaN is how the firmware
/// represents "limit not set", so an unset limit must not look like a pending edit
/// to the Restore machinery.
class RegisterValue
{
public:
    RegisterValue() = default;

    static RegisterValue fromBool(bool v) { return {RegisterType::Bool, v}; }
    static RegisterValue fromInt32(qint32 v) { return {RegisterType::Int32, v}; }
    static RegisterValue fromUInt32(quint32 v) { return {RegisterType::UInt32, v}; }
    static RegisterValue fromReal32(double v) { return {RegisterType::Real32, v}; }
    static RegisterValue fromString(const QString &v) { return {RegisterType::String, v}; }

    RegisterType type() const { return m_type; }
    bool isEmpty() const { return m_type == RegisterType::Empty; }
    const QVariant &variant() const { return m_value; }

    bool toBool() const { return m_value.toBool(); }
    qint32 toInt32() const { return m_value.toInt(); }
    quint32 toUInt32() const { return m_value.toUInt(); }
    QString toString() const { return m_value.toString(); }

    /// Numeric view used to drive spin boxes, sliders and the plot. NaN when the
    /// register holds a string or nothing at all.
    double toDouble() const
    {
        switch (m_type) {
        case RegisterType::Bool:
            return m_value.toBool() ? 1.0 : 0.0;
        case RegisterType::Int32:
        case RegisterType::UInt32:
        case RegisterType::Real32:
            return m_value.toDouble();
        case RegisterType::String:
        case RegisterType::Empty:
            break;
        }
        return std::numeric_limits<double>::quiet_NaN();
    }

    /// Human-readable form, also used when writing YAML profiles.
    QString toDisplayString() const
    {
        switch (m_type) {
        case RegisterType::Empty:
            return QString();
        case RegisterType::Bool:
            return m_value.toBool() ? QStringLiteral("1") : QStringLiteral("0");
        case RegisterType::Int32:
            return QString::number(m_value.toInt());
        case RegisterType::UInt32:
            return QString::number(m_value.toUInt());
        case RegisterType::Real32: {
            const double d = m_value.toDouble();
            if (std::isnan(d))
                return QStringLiteral("nan");
            return QString::number(d, 'g', 9);
        }
        case RegisterType::String:
            return m_value.toString();
        }
        return QString();
    }

    bool operator==(const RegisterValue &other) const
    {
        if (m_type != other.m_type)
            return false;
        if (m_type == RegisterType::Empty)
            return true;
        if (m_type == RegisterType::Real32) {
            const double a = m_value.toDouble();
            const double b = other.m_value.toDouble();
            if (std::isnan(a) && std::isnan(b))
                return true;  // both "unset", not a pending edit
            return a == b;
        }
        return m_value == other.m_value;
    }

    bool operator!=(const RegisterValue &other) const { return !(*this == other); }

private:
    RegisterValue(RegisterType t, QVariant v) : m_type(t), m_value(std::move(v)) {}

    RegisterType m_type = RegisterType::Empty;
    QVariant m_value;
};

Q_DECLARE_METATYPE(RegisterValue)

#endif // CORE_REGISTER_VALUE_H
