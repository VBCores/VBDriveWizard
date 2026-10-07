#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "app_types.h"
#include "control/trajectory.h"
#include "core/register_yaml.h"
#include "transport/device_link.h"

#include <QDeadlineTimer>
#include <QHash>
#include <QMainWindow>
#include <QPair>
#include <QTimer>
#include <QVector>

#include <optional>

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
class QAbstractButton;
class QCheckBox;
class QComboBox;
class QDoubleSpinBox;
class QLabel;
class QSlider;
class QWidget;
QT_END_NAMESPACE

class ControlManager;
class CyphalService;
class DeviceLink;
class DeviceManager;
class DeviceModel;
class FirmwareDownloader;
struct FirmwareRelease;
class FirmwareFlasher;
class PlotController;
class RestoreLabel;
class SafetyMonitor;
class SerialService;
class TranslationController;
class VbbootFlasher;
struct PlotMeasurement;

/// Wiring for the whole application: it owns the services and translates between the
/// widgets in mainwindow.ui and the register model.
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(TranslationController *translationController,
                        QWidget *parent = nullptr);
    ~MainWindow() override;

protected:
    void closeEvent(QCloseEvent *event) override;
    void changeEvent(QEvent *event) override;

private:
    /// Binds one configuration register to the widgets that display it.
    struct RegisterBinding
    {
        QString name;
        QWidget *editor = nullptr;
        /// Basic-tab limit checkbox. When unchecked the register is written as NaN,
        /// which is how the firmware spells "no limit".
        QCheckBox *enabler = nullptr;
        RestoreLabel *restore = nullptr;
        QSlider *slider = nullptr;
    };

    // --- construction ---
    void setupServices();
    void setupRegisterBindings();
    void setupConnectionUi();
    /// Sizes both Connect buttons to their longest caption. "Disconnect" is wider than
    /// "Connect", and CONNECTION is the widest box in the left column, so without this
    /// the whole column - and with it the plot - jumps every time a link opens or closes.
    void lockConnectButtonWidths();
    /// Shows the entry a port combo has elided away, or the reason an interface is
    /// unusable, as the combo's tool tip.
    void updateComboToolTip(QComboBox *combo);
    void setupConfigUi();
    void setupControlUi();
    void setupPlotUi();
    void setupFirmwareUi();
    void setupDeviceListUi();
    /// Typography of the STATUS panel: muted captions, values flush right, units
    /// last. The three roles are tagged with a `role` property the stylesheet reads.
    void setupStatusPanelUi();

    // --- settings, theme, language ---
    void loadSettings();
    void saveSettings();
    void applyUiSettings();
    void storeControlState();
    void restoreControlState();
    void applyLanguage();
    void retranslateDynamicTexts();
    void updateLogo();

    // --- connection ---
    void onSerialConnectClicked();
    void connectSerial(const QString &port);
    void onCanConnectClicked();
    void refreshSerialPorts();
    void refreshCanInterfaces();
    void setLink(DeviceLink *link);
    void handleConnected(LinkKind kind);
    void handleDisconnected();
    /// Enables and disables the UI according to the connection state.
    void updateUiState();

    // --- register binding ---
    const RegisterBinding *bindingFor(const QString &name) const;
    void writeEditorFromValue(const RegisterBinding &binding, const RegisterValue &value);
    RegisterValue valueFromEditor(const RegisterBinding &binding) const;
    void onEditorChanged(const QString &name);
    void refreshRestoreIcon(const QString &name);
    void refreshAllEditors();
    void refreshAllRestoreIcons();
    /// The voltage row has no register behind it; its icon compares against the
    /// state the row started in.
    void updateVoltageRestoreIcon();
    /// Converts between the drive's native units and what the editor shows.
    double toDisplayUnits(const QString &name, double nativeValue) const;
    double toNativeUnits(const QString &name, double displayValue) const;

    // --- configuration actions ---
    void onReadRegisters();
    void onWriteRegisters();
    /// Writable registers whose editor differs from what the drive last reported.
    RegisterWrites pendingWrites(const DeviceModel *device) const;
    /// Sends config registers the way the Write button does: on Serial that is
    /// CONFIG -> writes -> APPLY, with the drive rebooting to take them.
    void writeConfigToDrive(DeviceModel *device, const RegisterWrites &writes);
    void onSetOrigin();
    void onSaveProfile();
    void onLoadProfile();
    void onRestoreDefaults();
    void onCalibrate();
    void onCalibrationProgress(int done, int total);
    void onCalibrationFinished(bool success, bool stalled, const QString &error);
    void applyProfile(const RegisterMap &values);
    /// Asks before a batch changes `rated_max_current`. Returns false when the user
    /// cancels the whole write; "all except this register" drops it from `writes`.
    bool confirmCriticalWrites(const DeviceModel *device, RegisterWrites *writes);

    // --- devices ---
    void rebuildDeviceList();
    void onDeviceListSelectionChanged();
    /// A click on a DeviceList column header: sort by that column, or reverse the
    /// order when it is already the one being sorted by.
    void onDeviceListSortRequested(int column);
    /// Points the header's sort arrow at whatever DeviceManager is ordering by.
    void syncDeviceListSortIndicator();
    void onDeviceSelected(DeviceModel *device);
    void onDeviceLost(quint8 nodeId);
    void onDeviceReappeared(quint8 nodeId);
    /// Serial: APPLY rebooted the drive to make the written config take effect.
    void onDriveRebooted();
    void onDriveNotCalibrated(quint8 nodeId);
    /// Yes / No / Cancel prompt before leaving a drive with pending edits.
    /// Returns false when the user cancels the switch.
    bool confirmLeavingDevice(DeviceModel *device);

    // --- link callbacks ---
    void onRegisterRead(quint8 nodeId, const QString &name, const RegisterValue &value,
                        bool ok, const QString &error);
    void onRegisterWritten(quint8 nodeId, const QString &name, bool ok, const QString &error);
    void onWriteBatchFinished(quint8 nodeId, bool ok, const QString &error);
    void onTelemetry(quint8 nodeId, const TelemetryBatch &samples);
    void onDeviceDiscovered(quint8 nodeId);
    void onLinkError(const QString &message);

    // --- realtime ---
    void onStatusTick();
    void onPollTick();
    void updateStatusLabels();

    // --- control ---
    TrajectoryParams collectServoParams() const;
    TrajectoryParams collectMitParams() const;
    TrajectoryParams collectCurrentParams() const;
    void onTrajectoryStart(ControlProtocol protocol);
    void onServoUserStart();
    void onControlParamsEdited();
    void onServoControlTypeChanged();
    /// The transient-form, trajectory-parameter and gain pages that belong to the
    /// selected control type and transient form.
    void updateServoPages();
    /// The servo_cmd type the Control Type and Transient Form selections add up to.
    ServoCommandType servoCommandType() const;
    /// A servo register and the spin box on the Servo tab that edits it.
    struct ServoSettingEditor
    {
        const char *name;
        QDoubleSpinBox *spin;
        /// Shown in the angle unit: rad/s and rad/s^2 on the wire.
        bool angular;
    };
    QVector<ServoSettingEditor> servoSettingEditors() const;
    /// Puts a servo register value read from the drive into its spin box.
    void showServoSetting(const QString &name, const RegisterValue &value);
    void showServoSettingsOf(const DeviceModel *device);
    /// A Set button: writes the named servo registers from their spin boxes.
    void writeServoSettings(const QList<const char *> &names);
    /// What a running trajectory freezes behind it. Serial only: there the settings
    /// are register writes that would land while the drive is being fed set-points,
    /// and the register actions share the one line those set-points go down.
    enum class ControlLock {
        None,
        /// Servo sin / meander / triangle: its own control type, transient form and
        /// feedback gains, plus the MIT tab.
        ServoWaveform,
        /// Any MIT trajectory: the Servo tab.
        Mit,
    };
    /// Both locks also close Read, Write and Set Origin; Stop lifts them.
    void updateControlLock();
    void applyControlLock(ControlLock lock);
    /// Records what is now running on `nodeId`, and re-evaluates the lock.
    void setRunningControlLock(quint8 nodeId, const TrajectoryParams &params);
    /// Servo tab with the User trajectory tab in front: edits there are not live.
    bool servoUserTabActive() const;
    /// Sliders step their spin box in hundredths over a fixed useful span; the
    /// angular spans follow the display unit and the selected control type.
    void setSliderRange(QSlider *slider, QDoubleSpinBox *spin, double min, double max);
    void updateControlSliderRanges();
    void onMitTrajectoryChanged();
    /// Switches the driver on or off through is_on (see registers::kIsOnEnabled).
    void setDriverEnabled(quint8 nodeId, bool on);
    void onEmergencyStop();
    /// Protective stop of one drive: its trajectory is stopped, a zero command takes
    /// the torque and the gains off, and the driver is switched off (is_on = false).
    void onSafetyTripped(quint8 nodeId, const QString &reason);
    /// Refuses, with a reason, to start a drive past a safety limit; re-enables one
    /// that the protective stop switched off and that is back within the limits.
    bool prepareSafeStart(DeviceModel *device);
    void onSetpointsProduced(quint8 nodeId, const TrajectoryBatch &outputs);
    void onTrajectoryRunningChanged(quint8 nodeId, bool running);
    quint8 activeNodeId() const;

    // --- firmware ---
    void onOpenHexFile();
    /// Local file: the Open button. Remote repo: the list of releases in its place.
    void updateFirmwareSourceWidgets();
    /// Asked on every press of Remote repo; the downloader gives up on a silent server.
    void requestFirmwareReleases();
    void onFirmwareReleasesListed(const QList<FirmwareRelease> &releases);
    void onFirmwareReleasesFailed(const QString &error);
    /// Placeholder and enabled state of the release list: loading, empty or ready.
    void updateFirmwareVersionCombo();
    /// Beta releases are shown in the theme's muted text colour.
    void updateFirmwareVersionColors();
    void onFlashClicked();
    /// CurFirmwareRevLabel: red for an outdated firmware, green for the latest, the
    /// ordinary colour while either version is unknown.
    void updateFirmwareRevLabel();
    void setFaultIndicator(const QString &state);
    void startFlashing(const QString &hexPath);
    /// CAN: the selected drive is reset into VBBoot and flashed through it.
    void startCanFlashing(const QString &hexPath);
    void onCanFlashFinished(bool ok, const QString &message);
    /// The flashed drive is heartbeating again: its registers are read afresh.
    void finishCanFlash();
    /// Serial: the flashed drive has restarted, so the link is reopened for the
    /// user instead of leaving them to press Disconnect and Connect.
    void reconnectAfterFlash();
    void tryFlashReconnect();
    /// Without a link or over Serial, flashing goes over SWD and needs nothing; over
    /// CAN it goes through VBBoot and needs a drive selected in DeviceList.
    bool flashingAvailable() const;
    /// Read / Write / Set Origin: a drive, and no running trajectory locking them.
    void updateRegisterActionButtons();

    // --- plot ---
    void onSignalChanged();
    void onUnitsChanged();
    /// Re-expresses the angular control-tab spin boxes in the new display unit.
    void convertControlEditors(AngleUnit from, AngleUnit to);
    void onPausePlot();
    /// Live: the plot follows the drive. Paused: it keeps its picture for the user.
    /// Disconnecting pauses it; a new connection sets it live again.
    void setPlotLive(bool live);
    void onSavePlot();
    /// The log view is text, not a plot, so there is nothing to save as a picture.
    void updateSavePlotButton();
    /// The picked-point coordinates and distances under the plot.
    void onMeasurementChanged(const PlotMeasurement &measurement);
    /// Points can only be picked on a paused plot, so a live one has nothing to show.
    void setMeasurementReadoutVisible(bool visible);

    void showError(const QString &title, const QString &text);
    void setStatusMessage(const QString &message, int timeoutMs = 5000);
    /// Link state as a badge in the status bar: a coloured dot plus the text. It is a
    /// permanent widget, so showMessage() never hides it the way it hides left-hand
    /// ones.
    void showConnectionBadge(bool connected, const QString &text);

    Ui::MainWindow *ui;
    TranslationController *m_translation = nullptr;  // owned by main()

    PlotController *m_plot = nullptr;
    DeviceManager *m_devices = nullptr;
    ControlManager *m_control = nullptr;
    SafetyMonitor *m_safety = nullptr;
    SerialService *m_serial = nullptr;
    CyphalService *m_cyphal = nullptr;
    DeviceLink *m_link = nullptr;
    /// The DeviceLink signal connections made by setLink(), so that only those are
    /// dropped when the link changes (the services' own signals stay connected).
    QList<QMetaObject::Connection> m_linkConnections;
    /// closeEvent() is waiting for the link to shut down before the window goes.
    bool m_closePending = false;
    /// The drive said it is not calibrated on this connection; the dialog is shown
    /// once, later refusals only reach the status bar.
    bool m_driveNotCalibrated = false;
    /// The emergency stop is closing the link; handleDisconnected() then tells the
    /// user to power-cycle the drive and connect again.
    bool m_emergencyStopPending = false;
    /// CALIBRATE is running: the drive takes no commands until it reports back.
    bool m_calibrating = false;
    FirmwareDownloader *m_downloader = nullptr;
    FirmwareFlasher *m_flasher = nullptr;
    VbbootFlasher *m_vbboot = nullptr;
    /// Drive being flashed over CAN, from the start of the transfer until it is
    /// heartbeating with the new image (or the wait for it has given up).
    std::optional<quint8> m_canFlashNode;

    AppConfig m_config;
    QString m_configPath;
    AngleUnit m_angleUnit = AngleUnit::Radians;

    QVector<RegisterBinding> m_bindings;
    QHash<QString, int> m_bindingIndex;
    /// Guards the editor signal handlers while the code is populating widgets.
    bool m_updatingEditors = false;
    bool m_rebuildingDeviceList = false;

    QTimer m_statusTimer;   ///< 20 Hz refresh of STATUS
    QTimer m_pollTimer;     ///< periodic re-read of the status registers

    QString m_selectedHexPath;
    /// Latest release tag, empty until the background lookup has answered.
    QString m_latestFirmware;
    /// Port the drive was on when flashing started; empty when it was not on Serial.
    /// The link is dropped and reopened on it once the new image has been written.
    QString m_flashSerialPort;
    /// handleDisconnected() is to reconnect: the link is being closed after a flash.
    bool m_reconnectAfterFlash = false;
    /// The post-flash reconnect is retried until this expires: the drive answers
    /// nothing for a while after the reset.
    QDeadlineTimer m_flashReconnectDeadline;
    bool m_flashReconnectPending = false;
    /// Checked state and value the voltage row started with (see the Restore icon).
    QPair<bool, double> m_voltageLimitBaseline{false, 0.0};
    QLabel *m_connectionStatusLabel = nullptr;
    /// Transient messages. They are a widget rather than QStatusBar::showMessage(),
    /// because a shown message hides every left-hand widget - including this one.
    QLabel *m_statusMessageLabel = nullptr;
    QTimer m_statusMessageTimer;  ///< clears the message when its timeout expires
    /// Node whose heartbeat was lost and which the user asked to wait for.
    QHash<quint8, bool> m_awaitingReconnect;
    /// What each node's running trajectory locks; what updateControlLock() reads.
    QHash<quint8, ControlLock> m_runningLocks;
    /// The lock the selected drive's trajectory currently imposes on the UI.
    ControlLock m_controlLock = ControlLock::None;
    /// Values of the config batch in flight per node, adopted as the drive's own
    /// once the batch succeeds (the link reports only the name of a written register).
    QHash<quint8, RegisterMap> m_writesInFlight;
};

#endif // MAINWINDOW_H
