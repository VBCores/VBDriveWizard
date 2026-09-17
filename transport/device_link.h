#ifndef TRANSPORT_DEVICE_LINK_H
#define TRANSPORT_DEVICE_LINK_H

#include "app_types.h"
#include "core/register_value.h"

#include <QObject>
#include <QPair>
#include <QString>
#include <QVector>

using RegisterWrite = QPair<QString, RegisterValue>;
using RegisterWrites = QVector<RegisterWrite>;

/// What MainWindow talks to, regardless of whether the drive is on Serial or CAN.
///
/// Every operation is asynchronous and answered by a signal; nothing here blocks the
/// GUI thread. `nodeId` identifies the drive on CAN and is ignored by the Serial
/// implementation, which can only ever reach one drive.
class DeviceLink : public QObject
{
    Q_OBJECT

public:
    using QObject::QObject;
    ~DeviceLink() override = default;

    virtual LinkKind kind() const = 0;
    virtual bool isConnected() const = 0;

    /// Closes the link. `is_on:0` is sent by MainWindow beforehand, not here.
    virtual void closeLink() = 0;

    virtual void readRegister(quint8 nodeId, const QString &name) = 0;
    virtual void readRegisters(quint8 nodeId, const QStringList &names) = 0;

    /// Writes a batch. On Serial this wraps the batch in CONFIG ... SAVE when any of
    /// the registers is config-only; on CAN the writes go straight through.
    virtual void writeRegisters(quint8 nodeId, const RegisterWrites &writes) = 0;

    /// Servo set-point: voltbro.foc.Servo.1.0 on CAN, `servo_cmd:` on Serial.
    virtual void sendServoSetpoint(quint8 nodeId, ServoControlType type, float value) = 0;

    /// MIT command: voltbro.foc.MIT.1.0 on CAN, `mit_cmd:` on Serial.
    virtual void sendMitCommand(quint8 nodeId, float position, float velocity, float torque,
                                float positionGain, float velocityGain) = 0;

signals:
    /// One register finished reading. `ok == false` means timeout or a drive-side error.
    void registerRead(quint8 nodeId, const QString &name, const RegisterValue &value, bool ok,
                      const QString &error);

    /// One register finished writing.
    void registerWritten(quint8 nodeId, const QString &name, bool ok, const QString &error);

    /// The whole batch handed to writeRegisters() has finished. An empty `error` with
    /// `ok == false` means the failure was already reported through a more specific
    /// signal (driveNotCalibrated) and needs no further message.
    void writeBatchFinished(quint8 nodeId, bool ok, const QString &error);
    /// The drive refused a runtime write (is_on) because it has no calibration: it
    /// boots into NOT_CALIBRATED and only CALIBRATE takes it to RUNNING.
    void driveNotCalibrated(quint8 nodeId);

    void telemetryReceived(quint8 nodeId, const TelemetryBatch &samples);

    /// A drive appeared (CAN heartbeat, or a Serial handshake completing).
    void deviceDiscovered(quint8 nodeId);
    /// A drive stopped answering.
    void deviceLost(quint8 nodeId);

    /// Raw protocol traffic, shown by the plot area's Log view.
    void logLine(const QString &line);

    /// Non-fatal problem worth showing in the status bar.
    void linkError(const QString &message);
    /// The link is gone; MainWindow returns to the disconnected state.
    void linkClosed();
};

#endif // TRANSPORT_DEVICE_LINK_H
