#ifndef APP_TYPES_H
#define APP_TYPES_H

#include <QMap>
#include <QMetaType>
#include <QString>
#include <QVector>

#include <chrono>
#include <limits>

/// Which transport the application is currently talking to the drive over.
enum class LinkKind
{
    None,
    Serial,
    Can
};

/// Angle unit used for display and user input. The drive always works in radians;
/// conversion happens at the UI boundary so a unit change can never reach the wire.
enum class AngleUnit
{
    Radians,
    Degrees
};

/// Quantity shown in one panel of the realtime plot; None hides the panel.
enum class PlotSignal
{
    Position,
    Velocity,
    Torque,
    Temperature,
    Current,
    Encoder,
    None
};

/// The quantity a set-point drives: what the plot draws it against, and which field
/// of an MIT command a waveform fills.
enum class ServoControlType
{
    Velocity,
    Torque,
    Position,
    Voltage
};

/// Servo command type. The values are the wire encoding of
/// voltbro.foc.Servo.1.0::control_type and of the Serial `servo_cmd` first argument.
enum class ServoCommandType : quint8
{
    VelocityDirect = 0,
    VelocityRamp = 1,
    TorqueDirect = 2,
    PositionDirect = 3,
    PositionFilter = 4,
    PositionPoly = 5,
    VoltageDirect = 6
};

/// Reference trajectory shape. `Step` is MIT-only, the rest are shared.
enum class TrajectoryForm
{
    User,
    Sin,
    Meander,
    Triangle,
    Step
};

/// Which control protocol a trajectory worker speaks.
enum class ControlProtocol
{
    Servo,
    Mit
};

/// One telemetry sample: what voltbro.foc.State.1.0 carries, and what the Serial
/// `state:` log line carries. All values are in drive-native units (rad, rad/s, N*m).
struct TelemetrySample
{
    /// Microseconds: the drive's own clock on CAN, the same as host_us on Serial. It
    /// spaces the samples truly, but drifts against the host's clock, so the plot maps
    /// it onto host_us (PlotController::appendTelemetry()).
    qint64 t_us = 0;
    /// hostTimeUs() at which the sample reached the host: the kernel's reception stamp
    /// on CAN, the moment the line was parsed on Serial. Samples arrive in bursts, so
    /// this is the delivery instant, not the sampling one.
    qint64 host_us = 0;
    double position = 0.0;
    double velocity = 0.0;
    double torque = 0.0;
};

/// Host steady clock in microseconds: the one time base telemetry, set-points and the
/// plot share. Monotonic rather than wall time, which NTP may slew or step. Millisecond
/// resolution is not enough: two lines parsed in the same millisecond would collapse
/// onto one point of the plot.
inline qint64 hostTimeUs()
{
    return std::chrono::duration_cast<std::chrono::microseconds>(
                   std::chrono::steady_clock::now().time_since_epoch())
            .count();
}

using TelemetryBatch = QVector<TelemetrySample>;

/// Slower-moving drive state. These are not in the telemetry message on either
/// transport, so they are polled from the register set.
struct DeviceStatus
{
    static constexpr double kUnknown = std::numeric_limits<double>::quiet_NaN();

    double busVoltage = kUnknown;   ///< V
    double busCurrent = kUnknown;   ///< A
    double tempMcu = kUnknown;      ///< degrees Celsius (converted from the register's kelvin)
    double tempStator = kUnknown;   ///< degrees Celsius
    double encoderRotor = kUnknown; ///< raw counts
    double encoderShaft = kUnknown; ///< raw counts
    bool fault = false;
    bool faultKnown = false;
};

/// Application settings that are not tied to a particular drive.
struct UiSettings
{
    QString language = QStringLiteral("system");
    QString theme = QStringLiteral("dark");
    int font_size = 11;
    int plot_font_size = 11;
    int plot_line_width = 2;
    double plot_time_window_s = 10.0;
    int plot_draw_rate_hz = 30;
    int local_node_id = 126;      ///< this PC's Cyphal node id, must be free on the bus
    int serial_baud = 115200;     ///< VBDrive UART speed
    QString openocd_interface = QStringLiteral("interface/stlink.cfg");
    QString openocd_target = QStringLiteral("target/stm32g4x.cfg");
    QString angle_unit = QStringLiteral("rad");  ///< "rad" or "deg"
    /// The realtime plot's panels, top to bottom, and their relative heights.
    QVector<PlotSignal> plot_panels = {PlotSignal::Position, PlotSignal::Velocity,
                                       PlotSignal::Torque};
    QVector<double> plot_panel_heights = {1.0, 1.0, 1.0};
};

/// Limits of the protective stop. A drive past either temperature, or reporting
/// is_fault, is stopped and switched off.
struct SafetySettings
{
    double max_stator_temp_c = 90.0;
    double max_mcu_temp_c = 85.0;
};

struct WindowSettings
{
    int x = 0;
    int y = 0;
    int width = 1582;
    int height = 1070;
    bool maximized = false;
};

struct AppConfig
{
    UiSettings ui;
    SafetySettings safety;
    WindowSettings window;
    /// Last input of the CONTROL panel: widget object name -> value as text.
    QMap<QString, QString> control;
};

Q_DECLARE_METATYPE(TelemetrySample)
Q_DECLARE_METATYPE(TelemetryBatch)
Q_DECLARE_METATYPE(DeviceStatus)

#endif // APP_TYPES_H
