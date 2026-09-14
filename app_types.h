#ifndef APP_TYPES_H
#define APP_TYPES_H

#include <QMetaType>
#include <QString>
#include <QVector>

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

/// Signal shown on the realtime plot. Only the selected one is ever sampled.
enum class PlotSignal
{
    Position,
    Velocity,
    Torque,
    Temperature,
    Current,
    Encoder,
    Log
};

/// Servo set-point kind. The values are the wire encoding of
/// voltbro.foc.Servo.1.0::set_point_type and of the Serial `servo_cmd` first argument.
enum class ServoControlType
{
    Velocity = 0,
    Torque = 1,
    Position = 2,
    Voltage = 3
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

/// `servo_tr_form` register encoding.
enum class TransientForm
{
    Linear = 1,
    Polynomial = 2
};

/// One telemetry sample: what voltbro.foc.State.1.0 carries, and what the Serial
/// `state:` log line carries. All values are in drive-native units (rad, rad/s, N*m).
struct TelemetrySample
{
    qint64 t_us = 0;
    double position = 0.0;
    double velocity = 0.0;
    double torque = 0.0;
};

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
    WindowSettings window;
};

Q_DECLARE_METATYPE(TelemetrySample)
Q_DECLARE_METATYPE(TelemetryBatch)
Q_DECLARE_METATYPE(DeviceStatus)

#endif // APP_TYPES_H
