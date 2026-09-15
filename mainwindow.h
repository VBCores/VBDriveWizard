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
class FirmwareFlasher;
class PlotController;
class RestoreLabel;
class SerialService;
class TranslationController;

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
    void setupConfigUi();
    void setupControlUi();
    void setupPlotUi();
    void setupFirmwareUi();
    void setupDeviceListUi();

    // --- settings, theme, language ---
    void loadSettings();
    void saveSettings();
    void applyUiSettings();
    void applyLanguageFromCombo();
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
    /// Sends config registers the way the Write button does: on Serial that is
    /// CONFIG -> writes -> APPLY, with the drive rebooting to take them.
    void writeConfigToDrive(DeviceModel *device, const RegisterWrites &writes);
    void onSetOrigin();
    void onSaveProfile();
    void onLoadProfile();
    void onRestoreDefaults();
    void onCalibrate();
    void applyProfile(const RegisterMap &values);

    // --- devices ---
    void rebuildDeviceList();
    void onDeviceListSelectionChanged();
    void onDeviceSelected(DeviceModel *device);
    void onDeviceLost(quint8 nodeId);
    void onDeviceReappeared(quint8 nodeId);
    /// Serial: APPLY rebooted the drive to make the written config take effect.
    void onDriveRebooted();
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
    void updateServoTargetLabel();
    /// Servo tab with the User trajectory tab in front: edits there are not live.
    bool servoUserTabActive() const;
    /// Sliders step their spin box in hundredths over a fixed useful span; the
    /// angular spans follow the display unit and the selected control type.
    void setSliderRange(QSlider *slider, QDoubleSpinBox *spin, double min, double max);
    void updateControlSliderRanges();
    void onServoGainsSet();
    void onTransientFormSet();
    void onMitTrajectoryChanged();
    void onEmergencyStop();
    void onSetpointProduced(quint8 nodeId, const TrajectoryOutput &output);
    void onTrajectoryRunningChanged(quint8 nodeId, bool running);
    quint8 activeNodeId() const;

    // --- firmware ---
    void onOpenHexFile();
    void onFlashClicked();
    void startFlashing(const QString &hexPath);
    /// Serial: the flashed drive has restarted, so the link is reopened for the
    /// user instead of leaving them to press Disconnect and Connect.
    void reconnectAfterFlash();
    void tryFlashReconnect();

    // --- plot ---
    void onSignalChanged();
    void onUnitsChanged();
    /// Re-expresses the angular control-tab spin boxes in the new display unit.
    void convertControlEditors(AngleUnit from, AngleUnit to);
    void onPausePlot();
    void onSavePlotCsv();
    void onSavePlotPng();

    void showError(const QString &title, const QString &text);
    void setStatusMessage(const QString &message, int timeoutMs = 5000);

    Ui::MainWindow *ui;
    TranslationController *m_translation = nullptr;  // owned by main()

    PlotController *m_plot = nullptr;
    DeviceManager *m_devices = nullptr;
    ControlManager *m_control = nullptr;
    SerialService *m_serial = nullptr;
    CyphalService *m_cyphal = nullptr;
    DeviceLink *m_link = nullptr;
    /// The DeviceLink signal connections made by setLink(), so that only those are
    /// dropped when the link changes (the services' own signals stay connected).
    QList<QMetaObject::Connection> m_linkConnections;
    /// closeEvent() is waiting for the link to shut down before the window goes.
    bool m_closePending = false;
    FirmwareDownloader *m_downloader = nullptr;
    FirmwareFlasher *m_flasher = nullptr;

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
    /// Node whose heartbeat was lost and which the user asked to wait for.
    QHash<quint8, bool> m_awaitingReconnect;
};

#endif // MAINWINDOW_H
