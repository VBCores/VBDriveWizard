#ifndef CORE_REGISTER_CATALOG_H
#define CORE_REGISTER_CATALOG_H

#include "core/register_value.h"

#include <QString>
#include <QStringList>
#include <QVector>

/// Physical quantity a register carries, so the UI knows what to convert when the
/// user switches between radians and degrees.
enum class RegisterQuantity
{
    Plain,           ///< dimensionless / already in display units
    Angle,           ///< rad
    AngularVelocity, ///< rad/s
    Temperature      ///< kelvin on the wire, Celsius in the UI
};

/// Static description of one VBDrive register.
struct RegisterInfo
{
    const char *name;
    RegisterType type;
    bool writable;
    /// Serial only: the firmware rejects writes to this register outside CONFIG mode.
    /// Cyphal writes go through the deferred-save path and need no mode change.
    bool configOnly;
    RegisterQuantity quantity;
    /// Part of the CONFIGURATION group, i.e. covered by Read / Write / profile files.
    bool inConfigGroup;
};

/// The register set of the VBDrive firmware.
///
/// Decoded from the descriptor table in `firmwares/VBDrive_full.hex` and cross-checked
/// against the VBDrive README. Note these are the flat names the firmware actually
/// serves (`max_i`, `ang_off`, ...); the dotted names in the vbdrive-min README
/// (`limit.current`, `angle.offset`, ...) are stale and do not resolve.
namespace registers {

// Configuration registers
inline constexpr auto kGear = "gear";
inline constexpr auto kMaxCurrent = "max_i";
inline constexpr auto kMaxSpeed = "max_spd";
inline constexpr auto kMaxTorque = "max_tq";
inline constexpr auto kAngleOffset = "ang_off";
inline constexpr auto kAngleDirection = "ang_dir";
inline constexpr auto kMinAngle = "min_ang";
inline constexpr auto kMaxAngle = "max_ang";
inline constexpr auto kTorqueConstant = "kt";
inline constexpr auto kCurrentKp = "kp";
inline constexpr auto kCurrentKi = "ki";
inline constexpr auto kCurrentKd = "kd";
inline constexpr auto kFilterA = "flt_a";
inline constexpr auto kFilterG1 = "flt_g1";
inline constexpr auto kFilterG2 = "flt_g2";
inline constexpr auto kFilterG3 = "flt_g3";
inline constexpr auto kCurrentLpf = "i_lpf";
inline constexpr auto kAngleEncoder = "ang_enc";
inline constexpr auto kNodeId = "node_id";
inline constexpr auto kDataBaud = "data_baud";
inline constexpr auto kNominalBaud = "nominal_baud";

// Runtime controls
inline constexpr auto kIsOn = "is_on";
inline constexpr auto kBootloader = "bootloader";

// Read-only information
inline constexpr auto kCmdErrors = "cmd_errors";
inline constexpr auto kModel = "vbdrive_model";
inline constexpr auto kFirmwareRev = "firmware_rev";
inline constexpr auto kBusVoltage = "bus_voltage";
inline constexpr auto kBusCurrent = "bus_current";
inline constexpr auto kTempMcu = "temp_mcu";
inline constexpr auto kTempStator = "temp_stator";
inline constexpr auto kIsFault = "is_fault";
inline constexpr auto kEncoderShaft = "encoder_shaft";
inline constexpr auto kEncoderRotor = "encoder_rotor";

// Servo controller
inline constexpr auto kServoPosP = "servo_pos_p_gain";
inline constexpr auto kServoPosI = "servo_pos_i_gain";
inline constexpr auto kServoPosD = "servo_pos_d_gain";
inline constexpr auto kServoVelP = "servo_vel_p_gain";
inline constexpr auto kServoVelI = "servo_vel_i_gain";
inline constexpr auto kServoTransientForm = "servo_tr_form";
inline constexpr auto kServoTransientVel = "servo_tr_vel";

/// `ang_enc` encoding.
enum class EncoderType
{
    Rotor = 0,
    Shaft = 1,
    External = 2  ///< reserved; hidden in the UI until the firmware supports it
};

/// Nominal CAN bit rates in `nominal_baud` index order.
QStringList nominalBaudNames();
/// CAN FD data-phase bit rates in `data_baud` index order.
QStringList dataBaudNames();

} // namespace registers

/// Text <-> RegisterValue conversion, shared by the YAML profiles and the Serial
/// ASCII protocol (both carry every register as text).
namespace RegisterCodec {

/// Parses `text` as the type `info` declares. Accepts "nan"/".nan"/empty for reals,
/// which is how the firmware spells "limit not set".
bool parse(const RegisterInfo &info, const QString &text, RegisterValue *out);

/// Renders a value the way the firmware's Serial parser expects it.
QString format(const RegisterValue &value);

} // namespace RegisterCodec

class RegisterCatalog
{
public:
    /// Every register the drive serves, in `uavcan.register.List` order.
    static const QVector<RegisterInfo> &all();

    /// Null when the name is not a known register.
    static const RegisterInfo *find(const QString &name);

    /// Registers shown in the CONFIGURATION group, i.e. what Read and Write cover.
    static QStringList configGroupNames();

    /// Registers persisted to a YAML profile: everything writable that survives a
    /// reboot. Excludes the runtime-only `is_on` and `bootloader`.
    static QStringList profileNames();

    static bool isWritable(const QString &name);
    static bool requiresConfigMode(const QString &name);
};

#endif // CORE_REGISTER_CATALOG_H
