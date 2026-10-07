#include "mainwindow.h"

#include "./ui_mainwindow.h"

#include "control/control_manager.h"
#include "control/safety_monitor.h"
#include "core/device_manager.h"
#include "core/register_catalog.h"
#include "core/units.h"
#include "firmware/firmware_downloader.h"
#include "firmware/firmware_flasher.h"
#include "firmware/firmware_version.h"
#include "firmware/vbboot_flasher.h"
#include "transport/can_interface_list.h"
#include "transport/cyphal_service.h"
#include "transport/serial_service.h"
#include "ui/config_manager.h"
#include "ui/plot_controller.h"
#include "ui/preferences_dialog.h"
#include "ui/restore_label.h"
#include "ui/restore_model_dialog.h"
#include "ui/save_file_dialog.h"
#include "ui/theme_manager.h"
#include "ui/translation_controller.h"
#include "version.h"

#include <QAbstractItemView>
#include <QStyle>
#include <QStyledItemDelegate>
#include <QApplication>
#include <QCheckBox>
#include <QCloseEvent>
#include <QComboBox>
#include <QDir>
#include <QDoubleSpinBox>
#include <QFileDialog>
#include <QGridLayout>
#include <QGroupBox>
#include <QLabel>
#include <QLineEdit>
#include <QHeaderView>
#include <QMessageBox>
#include <QPushButton>
#include <QRegularExpressionValidator>
#include <QScreen>
#include <QSerialPortInfo>
#include <QSignalBlocker>
#include <QSlider>
#include <QSpinBox>
#include <QStandardItemModel>
#include <QStatusBar>
#include <QTreeWidget>

#include <algorithm>
#include <cmath>
#include <utility>

namespace {

/// The two ControlTabWidget tabs, in the order the .ui declares them.
constexpr int kServoTabIndex = 0;
constexpr int kMitTabIndex = 1;

/// The two DeviceList columns, in the order the .ui declares them.
constexpr int kDeviceNameColumn = 0;
constexpr int kDeviceCanIdColumn = 1;

/// STATUS refresh rate required by the spec.
constexpr int kStatusRefreshHz = 20;
/// Rate at which the read-only status registers are re-read. They are service calls
/// on CAN and round trips on Serial, so they are polled far slower than the labels
/// are repainted; the labels simply show the most recent values.
constexpr int kRegisterPollHz = 5;
/// Longest the window waits for the link to shut down on close before giving up;
/// the Serial drain itself is bounded at 2 s by the service.
constexpr int kCloseFallbackMs = 3000;
/// After flashing the drive is reset by OpenOCD and, like after APPLY, ignores its
/// input for a second or so; the reconnect is retried at this pace until the window
/// has passed, which also covers a USB re-enumeration of the port.
constexpr int kFlashReconnectRetryMs = 500;
constexpr int kFlashReconnectWindowMs = 15000;
/// VBBoot only takes a stored node_id in this range; otherwise it uses its default id.
constexpr int kMaxVbbootNodeId = 127;
/// Set Origin on Serial: the reboot that applies ang_off may bring the angle back off
/// by whole rotor turns (see onSetOrigin()); this many corrections follow before the
/// user is told to press it again. Below this angle (rad) the origin counts as set.
constexpr int kOriginCorrections = 2;
constexpr double kOriginTolerance = 0.01;

/// FirmwareVersionComboBox item data: the release tag, its image and its beta mark.
/// Qt::UserRole + 1 is kLongLabelRole, which the combo shares with the port combos.
constexpr int kFirmwareVersionRole = Qt::UserRole;
constexpr int kFirmwareAssetRole = Qt::UserRole + 2;
constexpr int kFirmwareBetaRole = Qt::UserRole + 3;

/// Registers behind the STATUS panel and the non-telemetry plot signals.
const QStringList &statusRegisters()
{
    static const QStringList names = {
        QString::fromLatin1(registers::kBusVoltage),
        QString::fromLatin1(registers::kBusCurrent),
        QString::fromLatin1(registers::kTempMcu),
        QString::fromLatin1(registers::kTempStator),
        QString::fromLatin1(registers::kIsFault),
        QString::fromLatin1(registers::kEncoderRotor),
        QString::fromLatin1(registers::kEncoderShaft),
    };
    return names;
}

/// True once every CONFIGURATION register of the drive has been read, i.e. when a
/// DeviceParamList snapshot can be frozen without holes. A snapshot taken earlier
/// would flag everything read afterwards as a pending edit.
bool configGroupComplete(const DeviceModel *device)
{
    const RegisterMap &known = device->deviceValues();
    for (const QString &name : RegisterCatalog::configGroupNames()) {
        if (!known.contains(name))
            return false;
    }
    return true;
}

/// Width of the port and interface combo boxes, in characters. A port entry carries a
/// long description ("ttyACM0 (STM32 STLink)") which would otherwise set the width of
/// the whole CONNECTION panel, and with it of the left column.
constexpr int kPortComboChars = 8;

/// The full text of a combo entry, shown in the popup and the tool tip while the
/// closed box keeps the short form.
constexpr int kLongLabelRole = Qt::UserRole + 1;

/// QComboBox paints the current entry's Qt::DisplayRole into the closed box and does
/// not elide it: too long a label is simply cut mid-word. So the short form is what
/// the model holds, and the popup puts the long one back through this delegate, which
/// leaves every other part of the painting to the style.
class LongLabelDelegate : public QStyledItemDelegate
{
public:
    using QStyledItemDelegate::QStyledItemDelegate;

protected:
    void initStyleOption(QStyleOptionViewItem *option, const QModelIndex &index) const override
    {
        QStyledItemDelegate::initStyleOption(option, index);
        const QString full = index.data(kLongLabelRole).toString();
        if (!full.isEmpty())
            option->text = full;
    }
};

/// ang_dir is +1 or -1; the combo shows it as a rotation direction.
constexpr int kDirectionCcw = 1;
constexpr int kDirectionCw = -1;

QString formatNumber(double value, int decimals)
{
    if (std::isnan(value))
        return QStringLiteral("--");
    return QString::number(value, 'f', decimals);
}

/// The popup inherits the width of the closed box, which is deliberately too narrow
/// for the long form of an entry. Widening the view widens the popup's container with
/// it, because the container takes its minimum size from its layout. Measuring the
/// text beats QAbstractItemView::sizeHintForColumn(), which caches what it saw while
/// the list was still being filled.
void widenPopupToContents(QComboBox *combo)
{
    QAbstractItemView *view = combo->view();
    if (!view)
        return;
    const QFontMetrics metrics(view->font());
    int widest = 0;
    for (int i = 0; i < combo->count(); ++i) {
        const QString full = combo->itemData(i, kLongLabelRole).toString();
        widest = qMax(widest, metrics.horizontalAdvance(full.isEmpty() ? combo->itemText(i)
                                                                       : full));
    }
    if (widest == 0)
        return;
    // Item padding from the stylesheet, plus room for the scroll bar a long list gets.
    const int scrollBar = combo->style()->pixelMetric(QStyle::PM_ScrollBarExtent, nullptr, view);
    view->setMinimumWidth(widest + 16 + scrollBar + 2 * view->frameWidth());
}

/// The waveform trajectories: unlike the User target, which is applied once, these
/// keep the drive taking a stream of set-points until Stop is pressed.
bool isWaveformForm(TrajectoryForm form)
{
    return form == TrajectoryForm::Sin || form == TrajectoryForm::Meander
            || form == TrajectoryForm::Triangle;
}

} // namespace

MainWindow::MainWindow(TranslationController *translationController, QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
    , m_translation(translationController)
{
    ui->setupUi(this);
    ui->verLabel->setText(QStringLiteral("v") + QStringLiteral(VBDRIVEWIZARD_VERSION));

    // The one action each panel is for gets the accent; every other button stays
    // quiet (see buttonStyle() in ThemeManager). STOP is styled by its object name.
    for (QPushButton *button : { ui->SerialConnectBtn, ui->CanConnectBtn, ui->WriteRegBtn,
                                 ui->ServoUserStartBtn, ui->ServoSinStartBtn,
                                 ui->ServoMeanderStartBtn, ui->ServoTriangleStartBtn,
                                 ui->MitStartBtn })
        button->setProperty("variant", "primary");

    // Transient messages on the left, link state on the right.
    m_statusMessageLabel = new QLabel(this);
    m_statusMessageLabel->setProperty("role", "caption");
    statusBar()->addWidget(m_statusMessageLabel, 1);

    m_connectionStatusLabel = new QLabel(this);
    statusBar()->addPermanentWidget(m_connectionStatusLabel);
    showConnectionBadge(false, tr("Not connected"));
    m_statusMessageTimer.setSingleShot(true);
    connect(&m_statusMessageTimer, &QTimer::timeout, this,
            [this] { m_statusMessageLabel->clear(); });

    setupServices();
    setupRegisterBindings();
    setupConnectionUi();
    setupConfigUi();
    setupControlUi();
    setupPlotUi();
    setupFirmwareUi();
    setupDeviceListUi();
    setupStatusPanelUi();

    loadSettings();

    m_statusTimer.setInterval(1000 / kStatusRefreshHz);
    connect(&m_statusTimer, &QTimer::timeout, this, &MainWindow::onStatusTick);
    m_pollTimer.setInterval(1000 / kRegisterPollHz);
    connect(&m_pollTimer, &QTimer::timeout, this, &MainWindow::onPollTick);

    refreshSerialPorts();
    refreshCanInterfaces();
    updateUiState();
    retranslateDynamicTexts();
    // In the background, for the firmware label; failing to reach GitHub is silent.
    m_downloader->checkLatest();
}

MainWindow::~MainWindow()
{
    // Stop the trajectory threads and the serial worker before Qt starts deleting
    // children out from under them.
    m_control->stopAll();
    m_serial->shutdown();
    m_cyphal->closeLink();
    delete ui;
}

void MainWindow::setupServices()
{
    m_plot = new PlotController(this);
    m_devices = new DeviceManager(this);
    m_control = new ControlManager(this);
    m_safety = new SafetyMonitor(this);
    m_serial = new SerialService(this);
    m_cyphal = new CyphalService(this);
    m_downloader = new FirmwareDownloader(this);
    m_flasher = new FirmwareFlasher(this);
    m_vbboot = new VbbootFlasher(this);

    m_serial->start();

    connect(m_safety, &SafetyMonitor::tripped, this, &MainWindow::onSafetyTripped);

    connect(m_serial, &SerialService::connectionResult, this,
            [this](bool ok, const QString &message) {
                if (ok) {
                    m_flashReconnectPending = false;
                    m_flashSerialPort.clear();
                    handleConnected(LinkKind::Serial);
                    setStatusMessage(message);
                    return;
                }
                m_serial->closeLink();
                setLink(nullptr);
                updateUiState();
                if (m_flashReconnectPending && !m_flashReconnectDeadline.hasExpired()) {
                    // The freshly flashed drive is still starting up and answers
                    // nothing yet; keep knocking until the window closes.
                    QTimer::singleShot(kFlashReconnectRetryMs, this,
                                       &MainWindow::tryFlashReconnect);
                    return;
                }
                if (m_flashReconnectPending) {
                    m_flashReconnectPending = false;
                    m_flashSerialPort.clear();
                    showError(tr("Reconnect failed"),
                              tr("The actuator did not answer after flashing; connect again "
                                 "by hand.\n\n%1")
                                      .arg(message));
                    return;
                }
                showError(tr("Connection failed"), message);
            });

    connect(m_cyphal, &CyphalService::connectionResult, this,
            [this](bool ok, const QString &message) {
                if (ok) {
                    handleConnected(LinkKind::Can);
                    setStatusMessage(message);
                } else {
                    m_cyphal->closeLink();
                    setLink(nullptr);
                    updateUiState();
                    showError(tr("Connection failed"), message);
                }
            });
    connect(m_cyphal, &CyphalService::deviceReappeared, this, &MainWindow::onDeviceReappeared);
    connect(m_serial, &SerialService::driveRebooted, this, &MainWindow::onDriveRebooted);
    connect(m_serial, &SerialService::calibrationProgress, this,
            &MainWindow::onCalibrationProgress);
    connect(m_serial, &SerialService::calibrationFinished, this,
            &MainWindow::onCalibrationFinished);

    connect(m_devices, &DeviceManager::listChanged, this, &MainWindow::rebuildDeviceList);
    connect(m_devices, &DeviceManager::selectionChanged, this, &MainWindow::onDeviceSelected);

    connect(m_control, &ControlManager::setpointsProduced, this,
            &MainWindow::onSetpointsProduced);
    connect(m_control, &ControlManager::runningChanged, this,
            &MainWindow::onTrajectoryRunningChanged);

    connect(m_downloader, &FirmwareDownloader::progress, this,
            [this](int percent, const QString &stage) {
                ui->FlashProgressBar->setValue(percent);
                // No timeout: a slow transfer must not leave the bar blank.
                setStatusMessage(stage, 0);
            });
    connect(m_downloader, &FirmwareDownloader::failed, this, [this](const QString &error) {
        ui->FlashProgressBar->setValue(0);
        ui->FlashPushButton->setEnabled(true);
        showError(tr("Firmware download failed"), error);
    });
    connect(m_downloader, &FirmwareDownloader::latestReleaseFound, this,
            [this](const QString &version) {
                m_latestFirmware = version;
                updateFirmwareRevLabel();
            });
    connect(m_downloader, &FirmwareDownloader::releasesListed, this,
            &MainWindow::onFirmwareReleasesListed);
    connect(m_downloader, &FirmwareDownloader::listFailed, this,
            &MainWindow::onFirmwareReleasesFailed);
    connect(m_downloader, &FirmwareDownloader::finished, this,
            [this](const QString &path, const QString &version) {
                setStatusMessage(tr("Downloaded firmware %1.").arg(version));
                startFlashing(path);
            });

    connect(m_flasher, &FirmwareFlasher::progress, this,
            [this](int percent, const QString &stage) {
                ui->FlashProgressBar->setValue(percent);
                if (!stage.isEmpty())
                    setStatusMessage(stage, 0);
            });
    connect(m_flasher, &FirmwareFlasher::output, this,
            [this](const QString &line) { m_plot->appendLogLine(line); });
    connect(m_flasher, &FirmwareFlasher::finished, this,
            [this](bool ok, const QString &message) {
                ui->FlashPushButton->setEnabled(true);
                if (!ok) {
                    ui->FlashProgressBar->setValue(0);
                    m_flashSerialPort.clear();
                    if (m_link && m_link->isConnected())
                        m_pollTimer.start();
                    showError(tr("Flashing failed"), message);
                    return;
                }
                ui->FlashProgressBar->setValue(100);
                setStatusMessage(message);
                // The new image only runs after a power cycle, so nothing is looked
                // for until the user says the drive is back up. A link that drops
                // while the dialog is up is handled as any other disconnect; the
                // reconnect below then starts from a closed link.
                QMessageBox::information(this, tr("Firmware flashed"),
                                         tr("Restart the actuator and press OK."));
                if (!m_flashSerialPort.isEmpty()) {
                    // The drive has been reset into the new image: whatever the
                    // link knew about it is stale, so it is reconnected from scratch.
                    reconnectAfterFlash();
                } else if (m_link && m_link->isConnected()) {
                    // CAN: the drive reboots into the new image, so the revision is stale.
                    m_pollTimer.start();
                    m_link->readRegister(activeNodeId(),
                                         QString::fromLatin1(registers::kFirmwareRev));
                } else {
                    // Flashed with no link and no port to go back to: the drive may
                    // have just enumerated, so the list is refreshed for the user.
                    refreshSerialPorts();
                    setStatusMessage(tr("%1 Connect to the actuator from CONNECTION.")
                                             .arg(message));
                }
            });

    connect(m_vbboot, &VbbootFlasher::progress, this,
            [this](int percent, const QString &stage) {
                ui->FlashProgressBar->setValue(percent);
                if (!stage.isEmpty())
                    setStatusMessage(stage, 0);
            });
    connect(m_vbboot, &VbbootFlasher::output, this,
            [this](const QString &line) { m_plot->appendLogLine(line); });
    connect(m_vbboot, &VbbootFlasher::bootloaderReached, this, [this] {
        // Offline from now on, rather than once its heartbeats are missed: should the
        // transfer break off first, the drive stays in VBBoot and silent all the same.
        if (DeviceModel *device = m_canFlashNode ? m_devices->device(*m_canFlashNode) : nullptr) {
            device->setOnline(false);
            rebuildDeviceList();
        }
    });
    connect(m_vbboot, &VbbootFlasher::finished, this, &MainWindow::onCanFlashFinished);
}

// --- settings, theme and language ----------------------------------------------------

void MainWindow::loadSettings()
{
    m_configPath = ConfigManager::resolveConfigFilePath();
    m_config = ConfigManager::loadConfig(m_configPath);
    m_safety->setLimits(m_config.safety);

    applyUiSettings();
    restoreControlState();
    m_plot->setPanels(m_config.ui.plot_panels, m_config.ui.plot_panel_heights);

    // Restore the window geometry only if it still lands on an attached screen.
    const QRect stored(m_config.window.x, m_config.window.y, m_config.window.width,
                       m_config.window.height);
    bool visible = false;
    for (const QScreen *screen : QGuiApplication::screens()) {
        if (screen->availableGeometry().intersects(stored)) {
            visible = true;
            break;
        }
    }
    if (visible)
        setGeometry(stored);
    else
        resize(m_config.window.width, m_config.window.height);
    if (m_config.window.maximized)
        showMaximized();
}

void MainWindow::saveSettings()
{
    const QRect rect = isMaximized() ? normalGeometry() : geometry();
    if (rect.width() > 0 && rect.height() > 0) {
        m_config.window.x = rect.x();
        m_config.window.y = rect.y();
        m_config.window.width = rect.width();
        m_config.window.height = rect.height();
    }
    m_config.window.maximized = isMaximized();
    storeControlState();

    QString error;
    if (!ConfigManager::saveConfig(m_configPath, m_config, &error))
        setStatusMessage(error);
}

void MainWindow::storeControlState()
{
    // Everything inside the CONTROL panel is stored by object name, so a widget added
    // to the panel later is remembered without touching this code.
    m_config.ui.angle_unit = QLatin1String(m_angleUnit == AngleUnit::Degrees ? "deg" : "rad");
    m_config.ui.plot_panels = m_plot->panelSignals();
    m_config.ui.plot_panel_heights = m_plot->panelHeights();

    QMap<QString, QString> &state = m_config.control;
    state.clear();
    const QString checked = QStringLiteral("true");
    for (const QTabWidget *tabs : ui->ControlGroupBox->findChildren<QTabWidget *>())
        state.insert(tabs->objectName(), QString::number(tabs->currentIndex()));
    // Only the checked button of each group: checking it on restore unchecks the rest.
    for (const QRadioButton *button : ui->ControlGroupBox->findChildren<QRadioButton *>()) {
        if (button->isChecked())
            state.insert(button->objectName(), checked);
    }
    for (const QCheckBox *box : ui->ControlGroupBox->findChildren<QCheckBox *>())
        state.insert(box->objectName(), box->isChecked() ? checked : QStringLiteral("false"));
    for (const QDoubleSpinBox *spin : ui->ControlGroupBox->findChildren<QDoubleSpinBox *>())
        state.insert(spin->objectName(), QString::number(spin->value()));
}

void MainWindow::restoreControlState()
{
    // The order matters. The unit comes first: the stored values are in the unit the
    // user saw them in. The radio buttons come next, since their handlers re-range
    // the sliders. The spin boxes come last and re-seat their sliders themselves.
    ui->UnitsComboBox->setCurrentIndex(m_config.ui.angle_unit == QLatin1String("deg") ? 1 : 0);

    const QMap<QString, QString> &state = m_config.control;
    const auto stored = [&state](const QWidget *widget) {
        return state.value(widget->objectName());
    };
    for (QRadioButton *button : ui->ControlGroupBox->findChildren<QRadioButton *>()) {
        if (stored(button) == QLatin1String("true"))
            button->setChecked(true);
    }
    for (QCheckBox *box : ui->ControlGroupBox->findChildren<QCheckBox *>()) {
        const QString value = stored(box);
        if (!value.isEmpty())
            box->setChecked(value == QLatin1String("true"));
    }
    for (QTabWidget *tabs : ui->ControlGroupBox->findChildren<QTabWidget *>()) {
        bool ok = false;
        const int index = stored(tabs).toInt(&ok);
        if (ok && index >= 0 && index < tabs->count())
            tabs->setCurrentIndex(index);
    }
    for (QDoubleSpinBox *spin : ui->ControlGroupBox->findChildren<QDoubleSpinBox *>()) {
        bool ok = false;
        const double value = stored(spin).toDouble(&ok);
        if (ok && std::isfinite(value))
            spin->setValue(value);
    }
}

void MainWindow::applyUiSettings()
{
    ThemeManager::applyApplicationTheme(*qApp, m_config.ui);
    m_plot->applySettings(m_config.ui);
    m_plot->applyTheme(m_config.ui.theme);
    updateFirmwareVersionColors();

    const QColor normal = ThemeManager::restoreIconColor(m_config.ui.theme);
    const QColor hover = ThemeManager::restoreIconHoverColor(m_config.ui.theme);
    for (const RegisterBinding &binding : m_bindings) {
        if (binding.restore)
            binding.restore->applyColors(normal, hover);
    }
    ui->RestoreVoltageLimitLbl->applyColors(normal, hover);

    m_serial->setTelemetryBatchIntervalMs(
            qBound(10, 1000 / qMax(1, m_config.ui.plot_draw_rate_hz), 100));
    updateLogo();
    // The icon-only buttons are quiet buttons, so their glyphs take the text colour.
    const auto setIcon = [this](QPushButton *button, const QString &glyph) {
        button->setIcon(ThemeManager::icon(glyph, m_config.ui.theme, button->iconSize().width()));
    };
    setIcon(ui->SerialRefreshBtn, QStringLiteral("refresh_white"));
    setIcon(ui->CanRefreshBtn, QStringLiteral("refresh_white"));
    setIcon(ui->RefreshDeviceBtn, QStringLiteral("refresh_white"));
    setIcon(ui->PreferencesBtn, QStringLiteral("settings_white"));
    setIcon(ui->crosshairPushButton, QStringLiteral("crosshair_white"));
    setIcon(ui->LogBtn, QStringLiteral("log_white"));
    setIcon(ui->SavePltBtn, QStringLiteral("save_white"));
    setPlotLive(m_plot->isLiveMode());
    // A new font size changes how wide the captions are.
    lockConnectButtonWidths();
}

void MainWindow::updateLogo()
{
    // As wide as the ink of the application name below it, so both edges line up;
    // it follows the font size and the language. The label's own width is no use:
    // it expands to fit the pixmap, so the logo would grow on every theme switch.
    // The stylesheet sets the name's font, so the label is polished before measuring.
    ui->appNameLabel->ensurePolished();
    const QRect ink = ui->appNameLabel->fontMetrics().tightBoundingRect(
            ui->appNameLabel->text());
    const QPixmap logo = ThemeManager::logo(m_config.ui.theme, ink.right() + 1,
                                            ui->LogoLabel->devicePixelRatioF());
    if (!logo.isNull())
        ui->LogoLabel->setPixmap(logo);
}

void MainWindow::applyLanguage()
{
    if (m_translation)
        m_translation->applyConfiguredLanguage(m_config.ui.language);
    // Widgets get QEvent::LanguageChange; everything else is retranslated by hand.
    retranslateDynamicTexts();
}

void MainWindow::changeEvent(QEvent *event)
{
    QMainWindow::changeEvent(event);
    if (event->type() != QEvent::LanguageChange)
        return;
    ui->retranslateUi(this);
    retranslateDynamicTexts();
    // retranslateUi() resets LogoLabel's text, which drops the pixmap.
    updateLogo();
}

void MainWindow::retranslateDynamicTexts()
{
    m_plot->retranslate();

    // retranslateUi() resets the connect buttons to "Connect"; restore the live text.
    const bool connected = m_link && m_link->isConnected();
    if (connected && m_link->kind() == LinkKind::Serial)
        ui->SerialConnectBtn->setText(tr("Disconnect"));
    if (connected && m_link->kind() == LinkKind::Can)
        ui->CanConnectBtn->setText(tr("Disconnect"));

    setPlotLive(m_plot->isLiveMode());  // refreshes the tool tip
    // retranslateUi() also put back the placeholder texts of the measurement labels.
    onMeasurementChanged(m_plot->measurement());
    updateFirmwareRevLabel();  // its tool tip
    updateFirmwareVersionCombo();  // its placeholder

    if (!connected)
        showConnectionBadge(false, tr("Not connected"));

    updateStatusLabels();
    rebuildDeviceList();
    lockConnectButtonWidths();
}

void MainWindow::closeEvent(QCloseEvent *event)
{
    if (m_closePending) {
        // Second pass, issued by handleDisconnected() once the link is down.
        saveSettings();
        QMainWindow::closeEvent(event);
        return;
    }

    if (m_calibrating) {
        const auto answer = QMessageBox::question(
                this, tr("Calibration in progress"),
                tr("The actuator is still calibrating and cannot be stopped. Closing now "
                   "leaves it to finish on its own.\nClose anyway?"),
                QMessageBox::Yes | QMessageBox::No, QMessageBox::No);
        if (answer != QMessageBox::Yes) {
            event->ignore();
            return;
        }
    }

    if (m_vbboot->isRunning()) {
        const auto answer = QMessageBox::question(
                this, tr("Flashing in progress"),
                tr("The actuator is being flashed over CAN. Closing now leaves it in the "
                   "bootloader without firmware.\nClose anyway?"),
                QMessageBox::Yes | QMessageBox::No, QMessageBox::No);
        if (answer != QMessageBox::Yes) {
            event->ignore();
            return;
        }
        m_vbboot->cancel();
    }

    if (m_devices->anyUnsavedChanges()) {
        const auto answer = QMessageBox::question(
                this, tr("Unsaved changes"),
                tr("Some register changes have not been written to the actuator.\n"
                   "Close anyway?"),
                QMessageBox::Yes | QMessageBox::No, QMessageBox::No);
        if (answer != QMessageBox::Yes) {
            event->ignore();
            return;
        }
    }

    m_control->stopAll();
    if (m_link && m_link->isConnected()) {
        // Leave every drive disabled rather than spinning after the window closes.
        // The link closes asynchronously (Serial drains `is_on:0` and `log_off`
        // first), so the window waits for linkClosed and closes itself again then.
        // Tearing the service down from the destructor instead would cut the
        // commands off and could leave the drive enabled and streaming.
        m_statusTimer.stop();
        m_pollTimer.stop();
        for (DeviceModel *device : m_devices->devices()) {
            setDriverEnabled(device->nodeId(), false);
        }
        m_link->closeLink();
        if (m_link) {
            // Still up: the close is asynchronous. The window stays (a hidden window
            // cannot be close()d again) but takes no more input.
            m_closePending = true;
            setEnabled(false);
            setStatusMessage(tr("Disconnecting..."));
            // Safety net: never let an unresponsive link keep the window alive.
            QTimer::singleShot(kCloseFallbackMs, this, [this] {
                if (m_closePending)
                    handleDisconnected();
            });
            event->ignore();
            return;
        }
    }
    saveSettings();
    QMainWindow::closeEvent(event);
}

void MainWindow::showError(const QString &title, const QString &text)
{
    QMessageBox::warning(this, title, text);
}

void MainWindow::showConnectionBadge(bool connected, const QString &text)
{
    const QString dot = connected ? QStringLiteral("#2FB344") : QStringLiteral("#94A3B8");
    m_connectionStatusLabel->setText(QStringLiteral("<span style=\"color:%1\">&#9679;</span>"
                                                    "&nbsp;%2")
                                             .arg(dot, text.toHtmlEscaped()));
}

void MainWindow::setStatusMessage(const QString &message, int timeoutMs)
{
    m_statusMessageLabel->setText(message);
    m_statusMessageTimer.stop();
    if (timeoutMs > 0)
        m_statusMessageTimer.start(timeoutMs);
}

// --- register bindings -----------------------------------------------------------------

void MainWindow::setupRegisterBindings()
{
    const auto add = [this](const char *name, QWidget *editor, RestoreLabel *restore,
                            QCheckBox *enabler = nullptr, QSlider *slider = nullptr) {
        RegisterBinding binding;
        binding.name = QString::fromLatin1(name);
        binding.editor = editor;
        binding.restore = restore;
        binding.enabler = enabler;
        binding.slider = slider;
        m_bindingIndex.insert(binding.name, m_bindings.size());
        m_bindings.append(binding);
    };

    // Basic: limits and direction. An unchecked box means "no limit" -> NaN.
    add(registers::kMinAngle, ui->AngleMinDoubleSpinBox, ui->RestoreAngleLimitLbl,
        ui->AngleLimitCheckBox);
    add(registers::kMaxAngle, ui->AngleMaxDoubleSpinBox, ui->RestoreAngleLimitLbl,
        ui->AngleLimitCheckBox);
    add(registers::kMaxSpeed, ui->VelLimitDoubleSpinBox, ui->RestoreVelLimitLbl,
        ui->VelLimitCheckBox);
    add(registers::kMaxTorque, ui->TorqLimitDoubleSpinBox, ui->RestoreTorqLimitLbl,
        ui->TorqLimitCheckBox);
    add(registers::kMaxCurrent, ui->CurrentLimitDoubleSpinBox, ui->RestoreCurrentLimitLbl,
        ui->CurrentLimitCheckBox);
    // Direction has no "unset" state (ang_dir is +1 or -1), hence no checkbox.
    add(registers::kAngleDirection, ui->DirComboBox, ui->RestoreDirLbl);
    // NaN restores the default rating here rather than meaning "no limit", so this
    // one has no checkbox either.
    add(registers::kRatedMaxCurrent, ui->CurrentLimDoubleSpinBox, ui->RestoreRatedCurrentLbl);

    // CAN
    add(registers::kNodeId, ui->NodeIdLineEdit, ui->RestoreNodeIdLbl);
    add(registers::kDataBaud, ui->DataBaudComboBox, ui->RestoreDataBaudLbl);
    add(registers::kNominalBaud, ui->NomBaudComboBox, ui->RestoreNomBaudLbl);

    // Advanced
    add(registers::kName, ui->driveNameLineEdit, ui->RestoreNameLbl);
    add(registers::kGear, ui->GearRatioSpinBox, ui->RestoreGearRatioLbl);
    add(registers::kAngleEncoder, ui->EncoderTypeComboBox, ui->RestoreEncoderTypeLbl);
    add(registers::kTorqueConstant, ui->TorqueConstDoubleSpinBox, ui->RestoreTorqueConstLbl);
    add(registers::kCurrentKp, ui->CurrentKpDoubleSpinBox, ui->RestoreCurrentKpLbl);
    add(registers::kCurrentKi, ui->CurrentKiDoubleSpinBox, ui->RestoreCurrentKiLbl);
    add(registers::kCurrentKd, ui->CurrentKdDoubleSpinBox, ui->RestoreCurrentKdLbl);
    add(registers::kAngleOffset, ui->PosOffsetDoubleSpinBox, ui->RestorePosOffsetLbl);
    add(registers::kFilterA, ui->FilterADoubleSpinBox, ui->RestoreFilterALbl);
    add(registers::kFilterG1, ui->FilterG1DoubleSpinBox, ui->RestoreFilterG1Lbl);
    add(registers::kFilterG2, ui->FilterG2DoubleSpinBox, ui->RestoreFilterG2Lbl);
    add(registers::kFilterG3, ui->FilterG3DoubleSpinBox, ui->RestoreFilterG3Lbl);
    add(registers::kCurrentLpf, ui->CurrentLpfDoubleSpinBox, ui->RestoreCurrentLpfLbl);

    // The firmware only implements rotor and shaft; the third entry is kept in the
    // .ui so enabling it later is a one-line change.
    ui->EncoderTypeComboBox->removeItem(static_cast<int>(registers::EncoderType::External));

    for (const RegisterBinding &binding : m_bindings) {
        const QString name = binding.name;

        if (auto *spin = qobject_cast<QDoubleSpinBox *>(binding.editor)) {
            connect(spin, &QDoubleSpinBox::valueChanged, this,
                    [this, name] { onEditorChanged(name); });
        } else if (auto *spin = qobject_cast<QSpinBox *>(binding.editor)) {
            connect(spin, &QSpinBox::valueChanged, this,
                    [this, name] { onEditorChanged(name); });
        } else if (auto *combo = qobject_cast<QComboBox *>(binding.editor)) {
            connect(combo, &QComboBox::currentIndexChanged, this,
                    [this, name] { onEditorChanged(name); });
        } else if (auto *edit = qobject_cast<QLineEdit *>(binding.editor)) {
            connect(edit, &QLineEdit::textEdited, this,
                    [this, name] { onEditorChanged(name); });
        }

        if (binding.enabler) {
            connect(binding.enabler, &QCheckBox::toggled, this,
                    [this, name] { onEditorChanged(name); });
        }
        if (binding.restore) {
            connect(binding.restore, &RestoreLabel::clicked, this, [this, name] {
                DeviceModel *device = m_devices->selected();
                if (!device)
                    return;
                // A shared Restore icon (the angle row) reverts both of its registers.
                for (const RegisterBinding &other : m_bindings) {
                    if (other.restore == bindingFor(name)->restore)
                        device->restore(other.name);
                }
                refreshAllEditors();
                refreshAllRestoreIcons();
            });
            binding.restore->setVisible(false);
        }
    }

    // The voltage limit has no register in the firmware yet, so its row is not a
    // binding; its Restore icon still behaves like the others, against the state
    // the row starts in.
    m_voltageLimitBaseline = {ui->VoltageLimitCheckBox->isChecked(),
                              ui->VoltageLimitDoubleSpinBox->value()};
    ui->RestoreVoltageLimitLbl->setVisible(false);
    // As with the bound limits, an unchecked box means "no limit" and locks its editor.
    ui->VoltageLimitDoubleSpinBox->setEnabled(ui->VoltageLimitCheckBox->isChecked());
    connect(ui->VoltageLimitCheckBox, &QCheckBox::toggled, ui->VoltageLimitDoubleSpinBox,
            &QWidget::setEnabled);
    connect(ui->VoltageLimitCheckBox, &QCheckBox::toggled, this,
            &MainWindow::updateVoltageRestoreIcon);
    connect(ui->VoltageLimitDoubleSpinBox, &QDoubleSpinBox::valueChanged, this,
            &MainWindow::updateVoltageRestoreIcon);
    connect(ui->RestoreVoltageLimitLbl, &RestoreLabel::clicked, this, [this] {
        ui->VoltageLimitCheckBox->setChecked(m_voltageLimitBaseline.first);
        ui->VoltageLimitDoubleSpinBox->setValue(m_voltageLimitBaseline.second);
    });
}

void MainWindow::updateVoltageRestoreIcon()
{
    const bool modified = ui->VoltageLimitCheckBox->isChecked() != m_voltageLimitBaseline.first
            || !qFuzzyCompare(1.0 + ui->VoltageLimitDoubleSpinBox->value(),
                              1.0 + m_voltageLimitBaseline.second);
    ui->RestoreVoltageLimitLbl->setVisible(modified);
}

const MainWindow::RegisterBinding *MainWindow::bindingFor(const QString &name) const
{
    const auto it = m_bindingIndex.constFind(name);
    if (it == m_bindingIndex.constEnd())
        return nullptr;
    return &m_bindings.at(*it);
}

double MainWindow::toDisplayUnits(const QString &name, double nativeValue) const
{
    const RegisterInfo *info = RegisterCatalog::find(name);
    if (!info || std::isnan(nativeValue))
        return nativeValue;
    switch (info->quantity) {
    case RegisterQuantity::Angle:
    case RegisterQuantity::AngularVelocity:
        return units::fromRadians(nativeValue, m_angleUnit);
    case RegisterQuantity::Temperature:
        return units::kelvinToCelsius(nativeValue);
    case RegisterQuantity::Plain:
        break;
    }
    return nativeValue;
}

double MainWindow::toNativeUnits(const QString &name, double displayValue) const
{
    const RegisterInfo *info = RegisterCatalog::find(name);
    if (!info || std::isnan(displayValue))
        return displayValue;
    switch (info->quantity) {
    case RegisterQuantity::Angle:
    case RegisterQuantity::AngularVelocity:
        return units::toRadians(displayValue, m_angleUnit);
    case RegisterQuantity::Temperature:
    case RegisterQuantity::Plain:
        break;
    }
    return displayValue;
}

void MainWindow::writeEditorFromValue(const RegisterBinding &binding,
                                      const RegisterValue &value)
{
    const bool wasUpdating = m_updatingEditors;
    m_updatingEditors = true;

    const double native = value.toDouble();
    const bool unset = std::isnan(native);

    if (binding.enabler) {
        const QSignalBlocker blocker(binding.enabler);
        // NaN is the firmware's "no limit", which is what an unchecked box means.
        binding.enabler->setChecked(!unset);
        if (binding.editor)
            binding.editor->setEnabled(!unset);
    }

    if (auto *spin = qobject_cast<QDoubleSpinBox *>(binding.editor)) {
        const QSignalBlocker blocker(spin);
        spin->setValue(unset ? 0.0 : toDisplayUnits(binding.name, native));
    } else if (auto *spin = qobject_cast<QSpinBox *>(binding.editor)) {
        const QSignalBlocker blocker(spin);
        spin->setValue(unset ? spin->minimum() : static_cast<int>(qRound(native)));
    } else if (auto *combo = qobject_cast<QComboBox *>(binding.editor)) {
        const QSignalBlocker blocker(combo);
        int index = 0;
        if (binding.name == QLatin1String(registers::kAngleDirection))
            index = (value.toInt32() == kDirectionCw) ? 1 : 0;
        else if (!unset)
            index = static_cast<int>(qRound(native));
        combo->setCurrentIndex(qBound(0, index, combo->count() - 1));
    } else if (auto *edit = qobject_cast<QLineEdit *>(binding.editor)) {
        const QSignalBlocker blocker(edit);
        if (value.type() == RegisterType::String)
            edit->setText(value.toString());
        else
            edit->setText(unset ? QString()
                                : QString::number(static_cast<qint64>(qRound(native))));
    }

    m_updatingEditors = wasUpdating;
}

RegisterValue MainWindow::valueFromEditor(const RegisterBinding &binding) const
{
    const RegisterInfo *info = RegisterCatalog::find(binding.name);
    if (!info)
        return RegisterValue{};

    if (binding.enabler && !binding.enabler->isChecked())
        return RegisterValue::fromReal32(std::numeric_limits<double>::quiet_NaN());

    if (auto *spin = qobject_cast<QDoubleSpinBox *>(binding.editor))
        return RegisterValue::fromReal32(toNativeUnits(binding.name, spin->value()));

    if (auto *spin = qobject_cast<QSpinBox *>(binding.editor))
        return RegisterValue::fromUInt32(static_cast<quint32>(spin->value()));

    if (auto *combo = qobject_cast<QComboBox *>(binding.editor)) {
        if (binding.name == QLatin1String(registers::kAngleDirection)) {
            return RegisterValue::fromInt32(combo->currentIndex() == 1 ? kDirectionCw
                                                                       : kDirectionCcw);
        }
        return RegisterValue::fromUInt32(static_cast<quint32>(combo->currentIndex()));
    }

    if (auto *edit = qobject_cast<QLineEdit *>(binding.editor)) {
        if (info->type == RegisterType::String) {
            // Serial strips trailing blanks anyway; an empty name is refused.
            const QString text = edit->text().trimmed();
            return text.isEmpty() ? RegisterValue{} : RegisterValue::fromString(text);
        }
        bool ok = false;
        const uint parsed = edit->text().trimmed().toUInt(&ok);
        if (!ok)
            return RegisterValue{};
        return RegisterValue::fromUInt32(parsed);
    }
    return RegisterValue{};
}

void MainWindow::onEditorChanged(const QString &name)
{
    if (m_updatingEditors)
        return;
    DeviceModel *device = m_devices->selected();
    if (!device)
        return;

    const RegisterBinding *binding = bindingFor(name);
    if (!binding)
        return;

    // A limit checkbox governs its editor, and the angle row has two of them.
    if (binding->enabler) {
        const bool enabled = binding->enabler->isChecked();
        for (const RegisterBinding &other : m_bindings) {
            if (other.enabler == binding->enabler && other.editor)
                other.editor->setEnabled(enabled);
        }
        for (const RegisterBinding &other : m_bindings) {
            if (other.enabler == binding->enabler && other.name != name) {
                device->setEditValue(other.name, valueFromEditor(other));
                refreshRestoreIcon(other.name);
            }
        }
    }

    device->setEditValue(name, valueFromEditor(*binding));
    refreshRestoreIcon(name);
}

void MainWindow::refreshRestoreIcon(const QString &name)
{
    const RegisterBinding *binding = bindingFor(name);
    if (!binding || !binding->restore)
        return;
    DeviceModel *device = m_devices->selected();
    if (!device) {
        binding->restore->setVisible(false);
        return;
    }
    // One icon can serve several registers (the angle row); it shows when any of them
    // differs from the DeviceParamList snapshot.
    bool modified = false;
    for (const RegisterBinding &other : m_bindings) {
        if (other.restore == binding->restore && device->isModified(other.name)) {
            modified = true;
            break;
        }
    }
    binding->restore->setVisible(modified);
}

void MainWindow::refreshAllEditors()
{
    DeviceModel *device = m_devices->selected();
    if (!device)
        return;
    m_updatingEditors = true;
    for (const RegisterBinding &binding : m_bindings) {
        if (device->hasEditValue(binding.name))
            writeEditorFromValue(binding, device->editValue(binding.name));
    }
    m_updatingEditors = false;
}

void MainWindow::refreshAllRestoreIcons()
{
    for (const RegisterBinding &binding : m_bindings)
        refreshRestoreIcon(binding.name);
}

// --- connection ------------------------------------------------------------------------

void MainWindow::setupConnectionUi()
{
    for (QComboBox *combo : {ui->SerialCombo, ui->CanCombo}) {
        combo->setSizeAdjustPolicy(QComboBox::AdjustToMinimumContentsLengthWithIcon);
        combo->setMinimumContentsLength(kPortComboChars);
        combo->setItemDelegate(new LongLabelDelegate(combo));
        connect(combo, &QComboBox::currentIndexChanged, this,
                [this, combo] { updateComboToolTip(combo); });
    }

    connect(ui->SerialRefreshBtn, &QPushButton::clicked, this, &MainWindow::refreshSerialPorts);
    connect(ui->CanRefreshBtn, &QPushButton::clicked, this, &MainWindow::refreshCanInterfaces);
    connect(ui->SerialConnectBtn, &QPushButton::clicked, this,
            &MainWindow::onSerialConnectClicked);
    connect(ui->CanConnectBtn, &QPushButton::clicked, this, &MainWindow::onCanConnectClicked);
    connect(ui->SerialRadioBtn, &QRadioButton::toggled, this, [this] { updateUiState(); });
}

void MainWindow::lockConnectButtonWidths()
{
    // Re-measured rather than cached: the captions change with the language and their
    // width with the font size, and both can change while the window is up.
    for (QPushButton *button : {ui->SerialConnectBtn, ui->CanConnectBtn}) {
        const QString current = button->text();
        button->setMinimumWidth(0);
        button->setMaximumWidth(QWIDGETSIZE_MAX);
        int widest = 0;
        for (const QString &caption : {tr("Connect"), tr("Disconnect")}) {
            button->setText(caption);
            widest = qMax(widest, button->sizeHint().width());
        }
        button->setText(current);
        button->setFixedWidth(widest);
    }
}

void MainWindow::updateComboToolTip(QComboBox *combo)
{
    // The CAN list puts the reason an interface cannot be used in the item's tool tip;
    // that beats repeating the label.
    const QString itemTip = combo->currentData(Qt::ToolTipRole).toString();
    combo->setToolTip(itemTip.isEmpty() ? combo->currentText() : itemTip);
}

void MainWindow::refreshSerialPorts()
{
    const QString previous = ui->SerialCombo->currentData().toString();
    ui->SerialCombo->clear();
    for (const QSerialPortInfo &info : QSerialPortInfo::availablePorts()) {
        const QString label = info.description().isEmpty()
                ? info.portName()
                : QStringLiteral("%1 (%2)").arg(info.portName(), info.description());
        // The port name identifies the port; the description only confirms it, so the
        // closed box shows the name and the popup and tool tip carry the whole label.
        ui->SerialCombo->addItem(info.portName(), info.portName());
        const int added = ui->SerialCombo->count() - 1;
        ui->SerialCombo->setItemData(added, label, kLongLabelRole);
        ui->SerialCombo->setItemData(added, label, Qt::ToolTipRole);
    }
    const int index = ui->SerialCombo->findData(previous);
    if (index >= 0)
        ui->SerialCombo->setCurrentIndex(index);
    updateComboToolTip(ui->SerialCombo);
    widenPopupToContents(ui->SerialCombo);
}

void MainWindow::refreshCanInterfaces()
{
    const QString previous = ui->CanCombo->currentData().toString();
    ui->CanCombo->clear();
    for (const CanInterfaceInfo &info : CanInterfaceList::available()) {
        // Unusable interfaces are still listed, with the reason, so the user can see
        // that the adapter exists but is down or not in CAN FD mode.
        const QString label = info.usable()
                ? info.name
                : tr("%1 (unavailable)").arg(info.name);
        ui->CanCombo->addItem(label, info.name);
        if (!info.usable())
            ui->CanCombo->setItemData(ui->CanCombo->count() - 1, info.problem(),
                                      Qt::ToolTipRole);
    }
    const int index = ui->CanCombo->findData(previous);
    if (index >= 0)
        ui->CanCombo->setCurrentIndex(index);
    updateComboToolTip(ui->CanCombo);
    widenPopupToContents(ui->CanCombo);
}

void MainWindow::setLink(DeviceLink *link)
{
    if (m_link == link)
        return;

    // Only the DeviceLink connections go: `m_link->disconnect(this)` would also
    // drop the services' own signals (connectionResult, deviceReappeared) that
    // setupServices() wired once, and the next connect would never be reported.
    for (const QMetaObject::Connection &connection : std::as_const(m_linkConnections))
        disconnect(connection);
    m_linkConnections.clear();

    m_link = link;
    m_control->setLink(link);

    if (!m_link)
        return;

    m_linkConnections
            << connect(m_link, &DeviceLink::registerRead, this, &MainWindow::onRegisterRead)
            << connect(m_link, &DeviceLink::registerWritten, this,
                       &MainWindow::onRegisterWritten)
            << connect(m_link, &DeviceLink::writeBatchFinished, this,
                       &MainWindow::onWriteBatchFinished)
            << connect(m_link, &DeviceLink::telemetryReceived, this, &MainWindow::onTelemetry)
            << connect(m_link, &DeviceLink::deviceDiscovered, this,
                       &MainWindow::onDeviceDiscovered)
            << connect(m_link, &DeviceLink::deviceLost, this, &MainWindow::onDeviceLost)
            << connect(m_link, &DeviceLink::driveNotCalibrated, this,
                       &MainWindow::onDriveNotCalibrated)
            << connect(m_link, &DeviceLink::linkError, this, &MainWindow::onLinkError)
            << connect(m_link, &DeviceLink::logLine, this,
                       [this](const QString &line) { m_plot->appendLogLine(line); })
            << connect(m_link, &DeviceLink::linkClosed, this, &MainWindow::handleDisconnected);
}

void MainWindow::onSerialConnectClicked()
{
    if (m_link && m_link->kind() == LinkKind::Serial && m_link->isConnected()) {
        // Explicit disconnect: leave the drive disabled first. The service delivers
        // the write and its own `log_off` before closing, and linkClosed() then
        // brings the UI back to the disconnected state.
        m_control->stopAll();
        m_statusTimer.stop();
        m_pollTimer.stop();
        setDriverEnabled(SerialService::kSerialNodeId, false);
        ui->SerialConnectBtn->setEnabled(false);
        setStatusMessage(tr("Disconnecting..."));
        m_serial->closeLink();
        return;
    }

    const QString port = ui->SerialCombo->currentData().toString();
    if (port.isEmpty()) {
        showError(tr("Connection failed"), tr("No serial port selected."));
        return;
    }
    connectSerial(port);
}

void MainWindow::connectSerial(const QString &port)
{
    setLink(m_serial);
    ui->SerialConnectBtn->setEnabled(false);
    setStatusMessage(tr("Opening %1...").arg(port));
    m_serial->connectToPort(port, m_config.ui.serial_baud);
}

void MainWindow::onCanConnectClicked()
{
    if (m_link && m_link->kind() == LinkKind::Can && m_link->isConnected()) {
        m_control->stopAll();
        m_statusTimer.stop();
        m_pollTimer.stop();
        for (DeviceModel *device : m_devices->devices()) {
            setDriverEnabled(device->nodeId(), false);
        }
        m_cyphal->closeLink();
        return;
    }

    const QString interfaceName = ui->CanCombo->currentData().toString();
    const CanInterfaceInfo info = CanInterfaceList::describe(interfaceName);
    if (!info.usable()) {
        showError(tr("Connection failed"), info.problem());
        return;
    }

    setLink(m_cyphal);
    ui->CanConnectBtn->setEnabled(false);
    setStatusMessage(tr("Listening for actuators on %1...").arg(interfaceName));
    m_cyphal->connectToInterface(interfaceName,
                                 static_cast<quint8>(m_config.ui.local_node_id));
}

void MainWindow::handleConnected(LinkKind kind)
{
    if (!m_link || !m_link->isConnected())
        return;  // closed again before the handshake was reported
    m_driveNotCalibrated = false;

    // Every discovered drive is enabled and fully read, which also fills the
    // DeviceParamList snapshot the Restore icons compare against.
    const QStringList configNames = RegisterCatalog::configGroupNames();
    for (DeviceModel *device : m_devices->devices()) {
        const quint8 nodeId = device->nodeId();
        setDriverEnabled(nodeId, true);
        m_link->readRegisters(nodeId, configNames);
        m_link->readRegisters(nodeId, {QString::fromLatin1(registers::kFirmwareRev),
                                       QString::fromLatin1(registers::kName)});
        m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
    }

    if (kind == LinkKind::Serial)
        m_serial->setLogStreaming(true);  // 100 Hz `state:` telemetry

    m_statusTimer.start();
    m_pollTimer.start();
    if (m_latestFirmware.isEmpty())
        m_downloader->checkLatest();  // the lookup at start-up may have had no network
    showConnectionBadge(true, kind == LinkKind::Serial ? tr("Serial connected")
                                                       : tr("CAN connected"));
    setPlotLive(true);
    updateUiState();
}

void MainWindow::handleDisconnected()
{
    m_control->stopAll();
    m_statusTimer.stop();
    m_pollTimer.stop();
    m_devices->clear();
    m_awaitingReconnect.clear();
    m_writesInFlight.clear();
    m_originChecks.clear();
    m_runningLocks.clear();
    m_safety->clear();
    m_driveNotCalibrated = false;
    m_calibrating = false;
    if (m_canFlashNode && !m_vbboot->isRunning()) {
        // Nothing left to wait for; a transfer still running reports back by itself.
        m_canFlashNode.reset();
        ui->FlashPushButton->setEnabled(true);
    }
    setLink(nullptr);
    showConnectionBadge(false, tr("Not connected"));
    setStatusMessage(tr("Disconnected."));
    // Nothing feeds the plot any more; freeze it so the last picture can be
    // inspected. handleConnected() sets it live again.
    setPlotLive(false);
    updateUiState();

    if (m_closePending) {
        close();  // closeEvent() deferred the close until the link was down
        return;
    }
    if (m_emergencyStopPending) {
        // Deferred so the modal dialog does not sit inside the link's close path
        // (Serial reports the close twice: deviceLost, then linkClosed).
        m_emergencyStopPending = false;
        QTimer::singleShot(0, this, [this] {
            QMessageBox::information(
                    this, tr("Emergency stop"),
                    tr("The actuator has been stopped by the emergency stop. To resume, "
                       "restart the actuator and connect to it again."));
        });
    }
    if (m_reconnectAfterFlash) {
        // The close that followed a flash is done; now the reopen. Deferred: the
        // Serial close arrives here twice in a row (deviceLost, then linkClosed),
        // and a link set up in between would be dropped by the second call.
        m_reconnectAfterFlash = false;
        QTimer::singleShot(0, this, &MainWindow::tryFlashReconnect);
    }
}

void MainWindow::updateUiState()
{
    const bool connected = m_link && m_link->isConnected();
    const bool serial = connected && m_link->kind() == LinkKind::Serial;
    const bool can = connected && m_link->kind() == LinkKind::Can;

    // Before a connection only the plot controls, the two global combo boxes and
    // the firmware panel are usable; everything else needs a drive.
    ui->ControlGroupBox->setEnabled(connected);
    ui->StatusGroupBox->setEnabled(connected);
    ui->EmergStopPushButton->setEnabled(connected);
    ui->DevicesGroupBox->setEnabled(can);

    // Only the row of the chosen transport is on screen, and while a link is up the
    // rest of CONNECTION is locked to its own control.
    const bool serialChosen = ui->SerialRadioBtn->isChecked();
    const bool serialRow = !connected && serialChosen;
    const bool canRow = !connected && !serialChosen;
    ui->ConnectionStack->setCurrentWidget(serialChosen ? ui->SerialConnectionPage
                                                       : ui->CanConnectionPage);
    ui->SerialRadioBtn->setEnabled(!connected);
    ui->CanRadioBtn->setEnabled(!connected);
    ui->SerialCombo->setEnabled(serialRow);
    ui->CanCombo->setEnabled(canRow);
    ui->SerialRefreshBtn->setEnabled(serialRow);
    ui->CanRefreshBtn->setEnabled(canRow);
    ui->SerialConnectBtn->setEnabled(serialRow || serial);
    ui->CanConnectBtn->setEnabled(canRow || can);
    ui->SerialConnectBtn->setText(serial ? tr("Disconnect") : tr("Connect"));
    ui->CanConnectBtn->setText(can ? tr("Disconnect") : tr("Connect"));

    // The CAN bit rates are drive registers that the firmware only exposes for
    // editing over Serial, per the spec.
    ui->DataBaudComboBox->setEnabled(serial);
    ui->NomBaudComboBox->setEnabled(serial);

    // CONFIGURATION: the register tabs need a drive, but System stays open because
    // without a CAN link flashing goes over SWD, not over the link, and has to work
    // on a drive that cannot answer at all - one with no firmware on it yet, say.
    for (int i = 0; i < ui->ConfigTabWidget->count(); ++i) {
        ui->ConfigTabWidget->setTabEnabled(
                i, connected || ui->ConfigTabWidget->widget(i) == ui->SystemTab);
    }
    ui->RegisterParamsGroupBox->setEnabled(connected);
    updateRegisterActionButtons();

    // Calibration is Serial-only. Flashing is OpenOCD over SWD with a Serial link or
    // none at all, and VBBoot over CAN for the drive selected in DeviceList.
    ui->CalibrateBtn->setEnabled(serial && !m_calibrating);
    ui->SensorGroupBox->setEnabled(serial);
    ui->FirmwareGroupBox->setEnabled(flashingAvailable());
    ui->OpenHexPushButton->setEnabled(flashingAvailable()
                                      && ui->ChooseFirmwareFileRadioButton->isChecked());

    // Always available, connection or not.
    updateSavePlotButton();
    ui->crosshairPushButton->setEnabled(true);
    // The log is the drive's Serial text output, so it needs a Serial link; the plot
    // is brought back so it is not left hidden behind a locked button.
    if (!serial)
        ui->LogBtn->setChecked(false);
    ui->LogBtn->setEnabled(serial);
    // Disconnecting pauses the plot and nothing can resume it until a drive is
    // back, so the button only makes sense while connected.
    ui->PausePltBtn->setEnabled(connected);
    ui->UnitsComboBox->setEnabled(true);
    ui->PreferencesBtn->setEnabled(true);

    onServoControlTypeChanged();
    updateControlLock();

    if (m_calibrating) {
        // The drive takes no commands until CALIBRATE is over - not even STOP, so
        // the emergency stop and Disconnect would only pretend to do something.
        for (QWidget *widget : {static_cast<QWidget *>(ui->ControlGroupBox),
                                static_cast<QWidget *>(ui->FirmwareGroupBox),
                                static_cast<QWidget *>(ui->SerialConnectBtn),
                                static_cast<QWidget *>(ui->EmergStopPushButton)})
            widget->setEnabled(false);
    }
    if (m_canFlashNode) {
        // The drive being flashed answers nothing until it is back with the new
        // image; the link and the selection stay as they are until then (Flash
        // itself is off from the click on). The emergency stop still reaches the
        // other drives.
        for (QWidget *widget : {static_cast<QWidget *>(ui->ControlGroupBox),
                                static_cast<QWidget *>(ui->DevicesGroupBox),
                                static_cast<QWidget *>(ui->CanConnectBtn),
                                static_cast<QWidget *>(ui->RegisterParamsGroupBox)})
            widget->setEnabled(false);
    }
}

// --- devices ---------------------------------------------------------------------------

void MainWindow::setupDeviceListUi()
{
    connect(ui->DeviceList, &QTreeWidget::itemSelectionChanged, this,
            &MainWindow::onDeviceListSelectionChanged);
    connect(ui->RefreshDeviceBtn, &QPushButton::clicked, this, [this] {
        if (m_link && m_link->kind() == LinkKind::Can)
            m_cyphal->rescan();
    });

    // A flat two-column list rather than a tree: no branch indicators, no indent, and
    // the whole row reacts as one so a click on the id selects the drive as well.
    ui->DeviceList->setRootIsDecorated(false);
    ui->DeviceList->setIndentation(0);
    ui->DeviceList->setUniformRowHeights(true);
    ui->DeviceList->setAllColumnsShowFocus(true);
    ui->DeviceList->setSelectionBehavior(QAbstractItemView::SelectRows);
    ui->DeviceList->setSelectionMode(QAbstractItemView::SingleSelection);
    // The order comes from DeviceManager, which is what rebuildDeviceList() walks.
    // Letting the widget sort itself as well would fight with it on every insert and
    // would sort the id column as the text "10" < "9".
    ui->DeviceList->setSortingEnabled(false);
    ui->DeviceList->headerItem()->setTextAlignment(kDeviceCanIdColumn,
                                                   Qt::AlignRight | Qt::AlignVCenter);

    QHeaderView *header = ui->DeviceList->header();
    header->setSectionsClickable(true);
    header->setSectionsMovable(false);
    header->setStretchLastSection(false);
    // The name takes the slack; the id column is only ever a few digits wide.
    header->setSectionResizeMode(kDeviceNameColumn, QHeaderView::Stretch);
    header->setSectionResizeMode(kDeviceCanIdColumn, QHeaderView::ResizeToContents);
    header->setSortIndicatorShown(true);
    connect(header, &QHeaderView::sectionClicked, this,
            &MainWindow::onDeviceListSortRequested);
    syncDeviceListSortIndicator();
}

void MainWindow::setupStatusPanelUi()
{
    // The panel is a three-column grid built in the .ui file; the object names are
    // what tells the columns apart: <name>CaptionLbl, <name>Lbl, <name>UnitLbl.
    const QList<QLabel *> labels = ui->StatusGroupBox->findChildren<QLabel *>();
    for (QLabel *label : labels) {
        const QString name = label->objectName();
        if (name.endsWith(QLatin1String("CaptionLbl"))) {
            label->setProperty("role", "caption");
        } else if (name.endsWith(QLatin1String("UnitLbl"))) {
            label->setProperty("role", "unit");
        } else {
            label->setProperty("role", "value");
            // Numbers line up on their last digit, which is what makes a column of
            // readings scannable.
            label->setAlignment(Qt::AlignRight | Qt::AlignVCenter);
        }
    }

    if (auto *grid = qobject_cast<QGridLayout *>(ui->StatusGroupBox->layout())) {
        grid->setColumnStretch(1, 1);      // the value column takes the slack
        grid->setColumnMinimumWidth(2, 32);  // units keep their own lane
        grid->setHorizontalSpacing(10);
        grid->setVerticalSpacing(6);
    }
}

void MainWindow::rebuildDeviceList()
{
    m_rebuildingDeviceList = true;
    ui->DeviceList->clear();
    syncDeviceListSortIndicator();

    for (DeviceModel *device : m_devices->devices()) {
        // The id column shows what the drive reports in `node_id`, not the transport
        // address, which is always 0 on Serial; a dash stands in until that register
        // has been read.
        const int canId = device->canId();
        auto *item = new QTreeWidgetItem;
        item->setText(kDeviceNameColumn, device->displayName());
        item->setText(kDeviceCanIdColumn,
                      canId >= 0 ? QString::number(canId) : QStringLiteral("-"));
        item->setTextAlignment(kDeviceCanIdColumn, Qt::AlignRight | Qt::AlignVCenter);
        item->setData(kDeviceNameColumn, Qt::UserRole, device->nodeId());
        if (!device->isOnline()) {
            item->setText(kDeviceNameColumn,
                          item->text(kDeviceNameColumn) + tr("  (no heartbeat)"));
            for (int column = 0; column < ui->DeviceList->columnCount(); ++column)
                item->setForeground(column, Qt::gray);
        }
        ui->DeviceList->addTopLevelItem(item);
        if (device == m_devices->selected())
            ui->DeviceList->setCurrentItem(item);
    }

    if (ui->DeviceList->topLevelItemCount() == 0) {
        // An empty white box says nothing; this says what to do about it. NoItemFlags
        // keeps the placeholder out of selection, so onDeviceListSelectionChanged()
        // never sees it.
        auto *placeholder = new QTreeWidgetItem;
        placeholder->setText(kDeviceNameColumn, tr("No actuators found - press refresh"));
        placeholder->setFlags(Qt::NoItemFlags);
        placeholder->setForeground(kDeviceNameColumn, QColor(0x94, 0xA3, 0xB8));
        placeholder->setTextAlignment(kDeviceNameColumn, Qt::AlignCenter);
        ui->DeviceList->addTopLevelItem(placeholder);
        // The message is about the list, not about one column of it.
        placeholder->setFirstColumnSpanned(true);
    }
    m_rebuildingDeviceList = false;
}

void MainWindow::onDeviceListSortRequested(int column)
{
    const auto key = (column == kDeviceCanIdColumn) ? DeviceManager::SortKey::CanId
                                                    : DeviceManager::SortKey::Name;
    // Clicking the column that already orders the list reverses it, the way a header
    // behaves everywhere else; a different column starts ascending.
    const bool reverse = (key == m_devices->sortKey()
                          && m_devices->sortOrder() == Qt::AscendingOrder);
    // setSort() reports the new order through listChanged(), which rebuilds the list
    // and moves the indicator with it.
    m_devices->setSort(key, reverse ? Qt::DescendingOrder : Qt::AscendingOrder);
}

void MainWindow::syncDeviceListSortIndicator()
{
    const int column = (m_devices->sortKey() == DeviceManager::SortKey::CanId)
            ? kDeviceCanIdColumn
            : kDeviceNameColumn;
    QSignalBlocker blocker(ui->DeviceList->header());
    ui->DeviceList->header()->setSortIndicator(column, m_devices->sortOrder());
}

void MainWindow::onDeviceListSelectionChanged()
{
    if (m_rebuildingDeviceList)
        return;
    QTreeWidgetItem *item = ui->DeviceList->currentItem();
    if (!item)
        return;

    const auto nodeId =
            static_cast<quint8>(item->data(kDeviceNameColumn, Qt::UserRole).toUInt());
    DeviceModel *target = m_devices->device(nodeId);
    DeviceModel *current = m_devices->selected();
    if (!target || target == current)
        return;

    if (current && !confirmLeavingDevice(current)) {
        rebuildDeviceList();  // put the highlight back on the current drive
        return;
    }
    m_devices->select(target);
}

bool MainWindow::confirmLeavingDevice(DeviceModel *device)
{
    if (!device->hasUnsavedChanges())
        return true;

    const auto answer = QMessageBox::question(
            this, tr("Unsaved changes"),
            tr("Actuator %1 has register changes that were not written.\n"
               "Write them before switching?")
                    .arg(device->displayName()),
            QMessageBox::Yes | QMessageBox::No | QMessageBox::Cancel, QMessageBox::Cancel);

    if (answer == QMessageBox::Cancel)
        return false;
    if (answer == QMessageBox::Yes) {
        RegisterWrites writes = pendingWrites(device);
        if (m_link && !writes.isEmpty() && confirmCriticalWrites(device, &writes)
            && !writes.isEmpty()) {
            writeConfigToDrive(device, writes);
        }
    }
    return true;
}

void MainWindow::onDeviceSelected(DeviceModel *device)
{
    // The set-points on the plot belonged to the previous drive; a running new one
    // reopens the stream with its next batch.
    m_plot->endSetpoints();

    if (!device) {
        for (const RegisterBinding &binding : m_bindings) {
            if (binding.restore)
                binding.restore->setVisible(false);
        }
        updateStatusLabels();
        updateControlLock();
        return;
    }

    // Selecting a drive re-freezes the DeviceParamList, unless edits are already
    // pending on it - those must survive the round trip. A drive selected right at
    // discovery has nothing read yet; its snapshot is taken by onRegisterRead().
    if (!device->hasSnapshot() && configGroupComplete(device))
        device->captureSnapshot();

    refreshAllEditors();
    refreshAllRestoreIcons();
    updateStatusLabels();
    showServoSettingsOf(device);

    if (m_link) {
        m_link->readRegisters(device->nodeId(),
                              {QString::fromLatin1(registers::kFirmwareRev)});
    }
    updateControlLock();
    rebuildDeviceList();
}

quint8 MainWindow::activeNodeId() const
{
    if (DeviceModel *device = m_devices->selected())
        return device->nodeId();
    return SerialService::kSerialNodeId;
}

// --- configuration actions ---------------------------------------------------------------

void MainWindow::setupConfigUi()
{
    connect(ui->ReadRegBtn, &QPushButton::clicked, this, &MainWindow::onReadRegisters);
    connect(ui->WriteRegBtn, &QPushButton::clicked, this, &MainWindow::onWriteRegisters);
    connect(ui->SetOriginBtn, &QPushButton::clicked, this, &MainWindow::onSetOrigin);
    connect(ui->SaveRegBtn, &QPushButton::clicked, this, &MainWindow::onSaveProfile);
    connect(ui->LoadRegBtn, &QPushButton::clicked, this, &MainWindow::onLoadProfile);
    connect(ui->RestoreRegBtn, &QPushButton::clicked, this, &MainWindow::onRestoreDefaults);
    connect(ui->CalibrateBtn, &QPushButton::clicked, this, &MainWindow::onCalibrate);

    // `name` is 1-15 printable bytes; ASCII keeps the byte count equal to the length.
    ui->driveNameLineEdit->setMaxLength(15);
    ui->driveNameLineEdit->setValidator(new QRegularExpressionValidator(
            QRegularExpression(QStringLiteral("[\\x21-\\x7E][\\x20-\\x7E]{0,14}")),
            ui->driveNameLineEdit));
    ui->CalibProgressBar->setValue(0);
}

void MainWindow::onReadRegisters()
{
    if (!m_link)
        return;
    // Deliberately does not refresh the snapshot: Restore keeps comparing against the
    // values the drive had when it was selected.
    m_link->readRegisters(activeNodeId(), RegisterCatalog::configGroupNames());
    setStatusMessage(tr("Reading registers..."));
}

void MainWindow::onWriteRegisters()
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    RegisterWrites writes = pendingWrites(device);
    if (writes.isEmpty()) {
        setStatusMessage(tr("No changes to write."));
        return;
    }
    if (!confirmCriticalWrites(device, &writes))
        return;
    if (writes.isEmpty()) {
        setStatusMessage(tr("No changes to write."));
        return;
    }
    writeConfigToDrive(device, writes);
}

bool MainWindow::confirmCriticalWrites(const DeviceModel *device, RegisterWrites *writes)
{
    const QString name = QString::fromLatin1(registers::kRatedMaxCurrent);
    const auto it = std::find_if(writes->begin(), writes->end(),
                                 [&name](const RegisterWrite &write) {
                                     return write.first == name;
                                 });
    if (it == writes->end())
        return true;

    // The rating caps the current the drive will ever push, so a slip of the
    // finger here is worth a second look.
    const RegisterValue current = device->deviceValue(name);
    QMessageBox box(this);
    box.setIcon(QMessageBox::Warning);
    box.setWindowTitle(tr("Critical register"));
    box.setText(tr("The value of register %1 will be changed from %2 A to %3 A. "
                   "Are you sure you want to overwrite it?")
                        .arg(name, formatNumber(current.isEmpty() ? DeviceStatus::kUnknown
                                                                  : current.toDouble(), 1),
                             formatNumber(it->second.toDouble(), 1)));
    QPushButton *yes = box.addButton(tr("Yes"), QMessageBox::YesRole);
    QPushButton *no = box.addButton(tr("No"), QMessageBox::NoRole);
    QPushButton *allButThis =
            box.addButton(tr("Write all except this register"), QMessageBox::AcceptRole);
    box.setDefaultButton(no);
    box.setEscapeButton(no);
    box.exec();

    if (box.clickedButton() == allButThis) {
        writes->erase(it);
        return true;
    }
    return box.clickedButton() == yes;
}

RegisterWrites MainWindow::pendingWrites(const DeviceModel *device) const
{
    // Everything the editors show that the drive does not have yet. Not the
    // modified (Restore-icon) set: that one is relative to the snapshot, which
    // stays put across Writes, so a value loaded from a profile that happens to
    // equal the snapshot would never be sent although the drive runs with
    // something else.
    RegisterWrites writes;
    for (const QString &name : device->pendingWriteNames()) {
        if (RegisterCatalog::isWritable(name))
            writes.append({name, device->editValue(name)});
    }
    return writes;
}

void MainWindow::writeConfigToDrive(DeviceModel *device, const RegisterWrites &writes)
{
    RegisterMap &inFlight = m_writesInFlight[device->nodeId()];
    inFlight.clear();
    for (const RegisterWrite &write : writes)
        inFlight.insert(write.first, write.second);

    ui->WriteRegBtn->setEnabled(false);
    ui->SetOriginBtn->setEnabled(false);
    if (m_link->kind() == LinkKind::Serial) {
        // The link stages the values in CONFIG mode (which stops the motor) and
        // applies them with APPLY, which reboots the drive. A trajectory would only
        // be spamming a drive that refuses to move and is then gone for a moment.
        m_control->stop(device->nodeId());
        m_link->writeRegisters(device->nodeId(), writes);
        setStatusMessage(tr("Writing %n register(s), the actuator restarts to apply them...",
                            nullptr, writes.size()));
        return;
    }
    m_link->writeRegisters(device->nodeId(), writes);
    setStatusMessage(tr("Writing %n register(s)...", nullptr, writes.size()));
}

void MainWindow::onSetOrigin()
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    writeOrigin(device);
    // With the rotor encoder the drive knows the output angle only within one rotor
    // turn (2*pi/gear) after a restart: the turns it counted are gone. On Serial
    // ang_off is applied by APPLY, which restarts it, so the zero written here can
    // come back off by whole rotor turns. The first sample after the restart tells,
    // and the offset is corrected from it (checkOrigin()). CAN applies it live.
    if (m_link->kind() == LinkKind::Serial)
        m_originChecks.insert(device->nodeId(), {kOriginCorrections, 0});
}

void MainWindow::writeOrigin(DeviceModel *device)
{
    // The drive reports angle as measured*ang_dir + ang_off, so making the current
    // reading read as zero means subtracting it from the existing offset.
    const double reported = device->telemetry().position;
    const RegisterValue currentOffset =
            device->deviceValue(QString::fromLatin1(registers::kAngleOffset));
    const double offset = currentOffset.isEmpty() || std::isnan(currentOffset.toDouble())
            ? 0.0
            : currentOffset.toDouble();

    const double newOffset = offset - reported;
    const QString name = QString::fromLatin1(registers::kAngleOffset);
    device->setEditValue(name, RegisterValue::fromReal32(newOffset));
    refreshAllEditors();
    refreshRestoreIcon(name);

    // Written exactly like the Write button writes it: ang_off is a config
    // register, so on Serial it goes CONFIG -> write -> APPLY with the reboot.
    writeConfigToDrive(device, {{name, RegisterValue::fromReal32(newOffset)}});
    setStatusMessage(tr("Origin set; angle offset is now %1.")
                             .arg(toDisplayUnits(name, newOffset), 0, 'f', 4));
}

void MainWindow::checkOrigin(DeviceModel *device, const TelemetrySample &sample)
{
    const auto check = m_originChecks.find(device->nodeId());
    if (check == m_originChecks.end() || check->rebootedUs == 0
        || sample.host_us <= check->rebootedUs)
        return;
    if (std::abs(sample.position) <= kOriginTolerance) {
        m_originChecks.erase(check);
        return;
    }
    if (check->correctionsLeft == 0) {
        m_originChecks.erase(check);
        setStatusMessage(tr("The angle did not settle at zero after the restart; "
                            "press Set Origin again."));
        return;
    }
    --check->correctionsLeft;
    check->rebootedUs = 0;
    writeOrigin(device);
}

void MainWindow::onCalibrate()
{
    if (!m_link || m_link->kind() != LinkKind::Serial)
        return;

    const auto answer = QMessageBox::question(
            this, tr("Calibrate sensor"),
            tr("Calibration moves the motor and cannot be cancelled. The actuator stops "
               "answering until it finishes.\n\nStart calibration?"),
            QMessageBox::Yes | QMessageBox::No, QMessageBox::No);
    if (answer != QMessageBox::Yes)
        return;

    // The drive discards every command until it reports back, so nothing may be
    // left talking to it: no trajectory, no status polling, and the UI that would
    // queue more is locked until onCalibrationFinished().
    m_control->stopAll();
    m_pollTimer.stop();
    m_calibrating = true;
    ui->CalibProgressBar->setValue(0);
    updateUiState();
    setStatusMessage(tr("Calibration started; the actuator will not answer until it is done."),
                     0);
    m_serial->startCalibration();
}

void MainWindow::onCalibrationProgress(int done, int total)
{
    if (total > 0)
        ui->CalibProgressBar->setValue(qBound(0, 100 * done / total, 100));
    setStatusMessage(tr("Calibrating: stage %1 of %2 done...").arg(done).arg(total), 0);
}

void MainWindow::onCalibrationFinished(bool success, bool stalled, const QString &error)
{
    if (!m_calibrating)
        return;
    m_calibrating = false;
    const bool connected = m_link && m_link->isConnected();

    if (success) {
        ui->CalibProgressBar->setValue(100);
        m_driveNotCalibrated = false;
        if (connected) {
            // Calibration leaves the drive in RUNNING with the driver as it found
            // it, and a drive that was NOT_CALIBRATED refused is_on:1 at connect.
            const quint8 nodeId = activeNodeId();
            setDriverEnabled(nodeId, true);
            m_link->readRegisters(nodeId, RegisterCatalog::configGroupNames());
            m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
            m_pollTimer.start();
        }
        updateUiState();
        setStatusMessage(tr("Calibration finished."));
        return;
    }

    ui->CalibProgressBar->setValue(0);
    updateUiState();
    setStatusMessage(tr("Calibration failed: %1").arg(error), 10000);
    if (connected && stalled) {
        // A silent drive may be hung: nothing on this link can be trusted any more,
        // and an is_on:0 it would not answer either only adds a second error.
        m_statusTimer.stop();
        m_serial->closeLink();
    } else if (connected) {
        m_pollTimer.start();
    }
    // Deferred, like every dialog raised from inside the link.
    QTimer::singleShot(0, this, [this, stalled, error] {
        showError(tr("Calibration failed"),
                  stalled ? tr("%1\n\nThe actuator may be hung. Restart it and connect "
                               "again.").arg(error)
                          : error);
    });
}

void MainWindow::applyProfile(const RegisterMap &values)
{
    DeviceModel *device = m_devices->selected();
    if (!device)
        return;
    // Loading a profile fills the editors but leaves the snapshot alone, so the
    // Restore icons still point back at the drive's own values.
    device->mergeEditState(values);
    refreshAllEditors();
    refreshAllRestoreIcons();
}

void MainWindow::onSaveProfile()
{
    DeviceModel *device = m_devices->selected();
    if (!device)
        return;

    const QString path = QFileDialog::getSaveFileName(
            this, tr("Save register profile"),
            QDir(RegisterYaml::defaultsDirectory())
                    .filePath(QStringLiteral("%1.yaml").arg(device->displayName().toLower())),
            tr("YAML files (*.yaml *.yml)"));
    if (path.isEmpty())
        return;

    RegisterMap values;
    for (const QString &name : RegisterCatalog::profileNames()) {
        if (device->hasEditValue(name))
            values.insert(name, device->editValue(name));
        else if (device->hasDeviceValue(name))
            values.insert(name, device->deviceValue(name));
    }

    QString error;
    if (!RegisterYaml::save(path, values, &error))
        showError(tr("Could not save the profile"), error);
    else
        setStatusMessage(tr("Profile saved to %1.").arg(QDir::toNativeSeparators(path)));
}

void MainWindow::onLoadProfile()
{
    const QString path = QFileDialog::getOpenFileName(
            this, tr("Load register profile"), RegisterYaml::defaultsDirectory(),
            tr("YAML files (*.yaml *.yml)"));
    if (path.isEmpty())
        return;

    RegisterMap values;
    QString error;
    QStringList warnings;
    if (!RegisterYaml::load(path, &values, &error, &warnings)) {
        showError(tr("Could not load the profile"), error);
        return;
    }
    applyProfile(values);
    if (warnings.isEmpty())
        setStatusMessage(tr("Loaded %n register(s) from the profile.", nullptr, values.size()));
    else
        setStatusMessage(tr("Loaded with warnings: %1").arg(warnings.join(QStringLiteral("; "))));
}

void MainWindow::onRestoreDefaults()
{
    RestoreModelDialog dialog(this);
    if (DeviceModel *device = m_devices->selected())
        dialog.preselectModel(device->displayName());
    if (dialog.exec() != QDialog::Accepted)
        return;

    const QString path = RegisterYaml::defaultsPathForModel(dialog.selectedModelKey());
    RegisterMap values;
    QString error;
    QStringList warnings;
    if (!RegisterYaml::load(path, &values, &error, &warnings)) {
        showError(tr("Could not load the default profile"), error);
        return;
    }
    applyProfile(values);
    setStatusMessage(tr("Default values for %1 loaded into the editors.")
                             .arg(dialog.selectedModelKey().toUpper()));
}

// --- link callbacks ------------------------------------------------------------------------

void MainWindow::onDeviceDiscovered(quint8 nodeId)
{
    DeviceModel *device = m_devices->ensureDevice(nodeId);
    m_awaitingReconnect.remove(nodeId);
    device->setOnline(true);

    if (!m_link)
        return;
    // Identify the drive first so the list label is right, then pull its registers.
    m_link->readRegisters(nodeId, {QString::fromLatin1(registers::kName),
                                   QString::fromLatin1(registers::kFirmwareRev)});
    if (!m_safety->isTripped(nodeId)) {
        setDriverEnabled(nodeId, true);
    }
    m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
}

void MainWindow::onRegisterRead(quint8 nodeId, const QString &name, const RegisterValue &value,
                                bool ok, const QString &error)
{
    if (!ok) {
        // A failed read leaves the displayed value alone, as the spec requires.
        setStatusMessage(tr("Could not read '%1': %2").arg(name, error));
        return;
    }

    DeviceModel *device = m_devices->ensureDevice(nodeId);
    device->setDeviceValue(name, value);
    m_safety->check(nodeId, name, value);

    // The first full read of a drive establishes its DeviceParamList. Counting
    // values is not enough: identity, profile and status registers arrive
    // interleaved with the CONFIGURATION ones, and anything read after the
    // snapshot but missing from it would show up as a pending edit.
    if (!device->hasSnapshot() && configGroupComplete(device)) {
        device->captureSnapshot();
        if (device == m_devices->selected()) {
            refreshAllEditors();
            refreshAllRestoreIcons();
        }
    }

    if (device != m_devices->selected())
        return;

    if (name == QLatin1String(registers::kFirmwareRev)) {
        ui->CurFirmwareRevLabel->setText(value.toString());
        updateFirmwareRevLabel();
    }
    showServoSetting(name, value);

    // Only CONFIGURATION registers have editors and an edit state; the status
    // registers polled in the background are display-only.
    if (!bindingFor(name))
        return;

    // Only adopt the value into the editor when the user has not edited that field.
    if (!device->isModified(name)) {
        device->setEditValue(name, value);
        if (const RegisterBinding *binding = bindingFor(name))
            writeEditorFromValue(*binding, value);
    }
    refreshRestoreIcon(name);
}

void MainWindow::onRegisterWritten(quint8 nodeId, const QString &name, bool ok,
                                   const QString &error)
{
    if (ok)
        return;
    // The value stays editable and its Restore icon stays visible, so the user can
    // still get the old value back. It also stays pending, so the next Write
    // sends it again.
    m_writesInFlight[nodeId].remove(name);
    setStatusMessage(tr("Could not write '%1': %2").arg(name, error));
}

void MainWindow::onWriteBatchFinished(quint8 nodeId, bool ok, const QString &error)
{
    const RegisterMap written = m_writesInFlight.take(nodeId);
    updateRegisterActionButtons();
    if (!ok)
        m_originChecks.remove(nodeId);
    if (ok) {
        // What was acknowledged is now what the drive runs with, so it is no
        // longer pending; on Serial the re-read after the reboot confirms it.
        // Restore icons deliberately stay visible after a successful write: the spec
        // requires the previous values to remain recoverable.
        if (DeviceModel *device = m_devices->device(nodeId)) {
            for (auto it = written.constBegin(); it != written.constEnd(); ++it)
                device->setDeviceValue(it.key(), it.value());
        }
        setStatusMessage(tr("Registers written."));
        return;
    }
    if (error.isEmpty())
        return;  // already reported by the link (driveNotCalibrated)
    if (m_closePending || !m_link) {
        // Nothing to fix any more; a modal box here would only get in the way.
        setStatusMessage(error);
        return;
    }
    showError(tr("Some registers were not written"), error);
}

void MainWindow::onDriveNotCalibrated(quint8)
{
    const QString text =
            tr("The actuator is not calibrated. Please calibrate the actuator to start working.");
    setStatusMessage(text, 0);
    // Connecting enables the drive twice (discovery, then the connected handler) and
    // disconnecting disables it; each is refused the same way, one dialog is enough.
    if (m_driveNotCalibrated || m_closePending || !m_link)
        return;
    m_driveNotCalibrated = true;
    showError(tr("Actuator not calibrated"), text);
}

void MainWindow::onTelemetry(quint8 nodeId, const TelemetryBatch &samples)
{
    if (samples.isEmpty())
        return;
    DeviceModel *device = m_devices->device(nodeId);
    if (!device)
        return;
    device->setTelemetry(samples.last());
    checkOrigin(device, samples.last());

    if (device == m_devices->selected())
        m_plot->appendTelemetry(samples);
}

void MainWindow::onLinkError(const QString &message)
{
    setStatusMessage(message, 8000);
}

void MainWindow::onDeviceLost(quint8 nodeId)
{
    DeviceModel *device = m_devices->device(nodeId);
    if (!device)
        return;

    // Serial can only ever have one drive; losing it is an ordinary disconnect.
    if (m_link && m_link->kind() == LinkKind::Serial) {
        handleDisconnected();
        return;
    }

    if (nodeId == m_canFlashNode || !device->isOnline()) {
        // Expected: it has been reset into VBBoot, which sends no heartbeats - for a
        // flash under way, or one that broke off and left it there (already offline).
        device->setOnline(false);
        rebuildDeviceList();
        return;
    }

    if (device != m_devices->selected()) {
        // A drive nobody is looking at disappears without a dialog.
        m_control->stop(nodeId);
        m_devices->removeDevice(nodeId);
        return;
    }

    // The trajectory is suspended rather than stopped: sending into a drive that is
    // not there achieves nothing, and the user may be about to get it back.
    m_control->setPaused(nodeId, true);
    device->setOnline(false);
    rebuildDeviceList();

    QMessageBox box(this);
    box.setIcon(QMessageBox::Warning);
    box.setWindowTitle(tr("Actuator lost"));
    box.setText(tr("Actuator %1 (node %2) stopped sending heartbeats.")
                        .arg(device->displayName())
                        .arg(nodeId));
    box.setInformativeText(tr("Wait for it to come back, keeping your unsaved register "
                              "changes, or drop it and discard them?"));
    QPushButton *wait = box.addButton(tr("Reconnect"), QMessageBox::AcceptRole);
    QPushButton *drop = box.addButton(tr("Remove actuator"), QMessageBox::DestructiveRole);
    box.setDefaultButton(wait);
    box.exec();

    if (box.clickedButton() == drop) {
        device->restoreAll();  // as if Restore had been pressed on every edited field
        m_control->stop(nodeId);
        m_devices->removeDevice(nodeId);
        m_awaitingReconnect.remove(nodeId);
    } else {
        Q_UNUSED(wait);
        m_awaitingReconnect.insert(nodeId, true);
        setStatusMessage(tr("Waiting for node %1 to return...").arg(nodeId));
    }
}

void MainWindow::onDriveRebooted()
{
    if (m_link != m_serial)
        return;
    const quint8 nodeId = SerialService::kSerialNodeId;
    DeviceModel *device = m_devices->device(nodeId);
    if (!device)
        return;

    // The reboot that applies the config is invisible as a connection event: the
    // same drive is still selected, its snapshot and the user's pending edits are
    // kept. What the reboot did reset has to be redone: the driver is enabled
    // again, and the registers are re-read so the editors show what the drive
    // actually runs with now (the link itself turns the `state:` log back on).
    // A drive the protective stop switched off stays off until the next Start.
    if (!m_safety->isTripped(nodeId)) {
        setDriverEnabled(nodeId, true);
    }
    // Only the angle the drive restarted with tells whether the origin held. A
    // second restart before any sample arrived means the check went stale.
    if (const auto check = m_originChecks.find(nodeId); check != m_originChecks.end()) {
        if (check->rebootedUs == 0)
            check->rebootedUs = hostTimeUs();
        else
            m_originChecks.erase(check);
    }
    m_link->readRegisters(nodeId, RegisterCatalog::configGroupNames());
    m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
    setStatusMessage(tr("The actuator restarted with the new settings."));
}

void MainWindow::onDeviceReappeared(quint8 nodeId)
{
    DeviceModel *device = m_devices->device(nodeId);
    if (!device)
        return;
    if (nodeId == m_canFlashNode) {
        // Back from VBBoot with the new image. A heartbeat while the transfer still
        // runs means the drive never left the old one; the transfer reports that.
        if (!m_vbboot->isRunning())
            finishCanFlash();
        return;
    }
    device->setOnline(true);
    m_awaitingReconnect.remove(nodeId);
    // Resume exactly where the trajectory left off.
    m_control->setPaused(nodeId, false);
    rebuildDeviceList();
    setStatusMessage(tr("Node %1 is back.").arg(nodeId));

    if (m_link && !m_safety->isTripped(nodeId)) {
        setDriverEnabled(nodeId, true);
    }
}

// --- realtime status -------------------------------------------------------------------------

void MainWindow::onPollTick()
{
    if (!m_link)
        return;
    // The selected drive is polled for the whole STATUS panel. The others only for
    // what the protective stop watches: they stay enabled, and may still be running.
    DeviceModel *selected = m_devices->selected();
    for (DeviceModel *device : m_devices->devices()) {
        if (!device->isOnline())
            continue;
        m_link->readRegisters(device->nodeId(), device == selected
                                                        ? statusRegisters()
                                                        : SafetyMonitor::watchedRegisters());
    }
}

void MainWindow::onStatusTick()
{
    updateStatusLabels();

    DeviceModel *device = m_devices->selected();
    if (!device)
        return;

    // What telemetry does not carry is plotted from the polled registers.
    m_plot->appendStatus(device->status());
}

void MainWindow::updateStatusLabels()
{
    DeviceModel *device = m_devices->selected();
    if (!device) {
        const QString dash = QStringLiteral("--");
        ui->StatusTempMcuLbl->setText(dash);
        ui->StatusTempStatorLbl->setText(dash);
        ui->StatusBusVoltageLbl->setText(dash);
        ui->StatusAngleLbl->setText(dash);
        ui->StatusRotorEncoderLbl->setText(dash);
        ui->StatusShaftEncoderLbl->setText(dash);
        setFaultIndicator({});
        // Now that the panel is readable without a drive, a version left over from
        // the last one (or the .ui placeholder) must not pass for a current reading.
        ui->CurFirmwareRevLabel->setText(dash);
        updateFirmwareRevLabel();
        return;
    }

    // Recompute the status snapshot from the most recent register reads.
    DeviceStatus status;
    const auto readDouble = [device](const char *name) {
        const RegisterValue value = device->deviceValue(QString::fromLatin1(name));
        return value.isEmpty() ? DeviceStatus::kUnknown : value.toDouble();
    };
    status.busVoltage = readDouble(registers::kBusVoltage);
    status.busCurrent = readDouble(registers::kBusCurrent);
    const double mcuKelvin = readDouble(registers::kTempMcu);
    const double statorKelvin = readDouble(registers::kTempStator);
    status.tempMcu = std::isnan(mcuKelvin) ? mcuKelvin : units::kelvinToCelsius(mcuKelvin);
    status.tempStator =
            std::isnan(statorKelvin) ? statorKelvin : units::kelvinToCelsius(statorKelvin);
    status.encoderRotor = readDouble(registers::kEncoderRotor);
    status.encoderShaft = readDouble(registers::kEncoderShaft);
    const RegisterValue fault = device->deviceValue(QString::fromLatin1(registers::kIsFault));
    status.faultKnown = !fault.isEmpty();
    status.fault = fault.toBool();
    device->setStatus(status);

    ui->StatusTempMcuLbl->setText(formatNumber(status.tempMcu, 1));
    ui->StatusTempStatorLbl->setText(formatNumber(status.tempStator, 1));
    ui->StatusBusVoltageLbl->setText(formatNumber(status.busVoltage, 2));
    ui->StatusAngleLbl->setText(formatNumber(
            units::fromRadians(device->telemetry().position, m_angleUnit), 4));
    ui->StatusRotorEncoderLbl->setText(formatNumber(status.encoderRotor, 0));
    ui->StatusShaftEncoderLbl->setText(formatNumber(status.encoderShaft, 0));
    setFaultIndicator(status.faultKnown ? QString::fromLatin1(status.fault ? "on" : "off")
                                        : QString());
    ui->StatusAngleUnitLbl->setText(QString::fromLatin1(units::angleSuffix(m_angleUnit)));
}

// --- control ------------------------------------------------------------------------------

void MainWindow::setupControlUi()
{
    // Servo: control type and transient form together pick the servo_cmd type and
    // the pages of parameters and gains that go with it.
    for (QRadioButton *button :
         {ui->ServoPositionRadioBtn, ui->ServoVelocityRadioBtn, ui->ServoTorqueRadioBtn,
          ui->ServoVoltageRadioBtn, ui->PosDirectRadioBtn, ui->PosFilterRadioBtn,
          ui->PosPolyRadioBtn, ui->VelDirectRadioBtn, ui->VelRampRadioBtn,
          ui->TorqDirectRadioBtn}) {
        connect(button, &QRadioButton::toggled, this, &MainWindow::onServoControlTypeChanged);
    }
    const auto connectSet = [this](QPushButton *button, const QList<const char *> &names) {
        connect(button, &QPushButton::clicked, this, [this, names] { writeServoSettings(names); });
    };
    connectSet(ui->PosFilterSetBtn, {registers::kServoInputBandwidth});
    connectSet(ui->PosPolySetBtn, {registers::kServoVelLimit, registers::kServoAccelLimit,
                                   registers::kServoDecelLimit});
    connectSet(ui->VelRampSetBtn, {registers::kServoVelRampRate});
    connectSet(ui->ServoPosGainsSetBtn,
               {registers::kServoPosP, registers::kServoPosI, registers::kServoPosD});
    connectSet(ui->ServoVelGainsSetBtn, {registers::kServoVelP, registers::kServoVelI});

    // Every Start button drives the same worker; the active trajectory tab decides
    // the waveform, so switching tabs mid-run just changes the shape (switching
    // into the User tab is the exception, see onControlParamsEdited()).
    for (QPushButton *button : {ui->ServoSinStartBtn, ui->ServoMeanderStartBtn,
                                ui->ServoTriangleStartBtn}) {
        connect(button, &QPushButton::clicked, this,
                [this] { onTrajectoryStart(ControlProtocol::Servo); });
    }
    // The User tab is the exception: its button never turns into Stop, it applies
    // the typed target each time it is pressed.
    connect(ui->ServoUserStartBtn, &QPushButton::clicked, this, &MainWindow::onServoUserStart);
    connect(ui->MitStartBtn, &QPushButton::clicked, this,
            [this] { onTrajectoryStart(ControlProtocol::Mit); });

    connect(ui->RefTrajectoryTabWidget, &QTabWidget::currentChanged, this,
            &MainWindow::onControlParamsEdited);

    for (QRadioButton *button : {ui->MitStepRadioBtn, ui->MitSinRadioBtn,
                                 ui->MitMeanderRadioBtn, ui->MitTriangleRadioBtn}) {
        connect(button, &QRadioButton::toggled, this, &MainWindow::onMitTrajectoryChanged);
    }
    for (QRadioButton *button : {ui->MitTrajPositionRadioBtn, ui->MitTrajVelocityRadioBtn,
                                 ui->MitTrajTorqueRadioBtn}) {
        connect(button, &QRadioButton::toggled, this, &MainWindow::onMitTrajectoryChanged);
    }

    // Live edits: anything that changes a trajectory parameter updates the running
    // worker in place, without stopping the motion. The User target is deliberately
    // absent: it is applied by ServoUserStartBtn only, so typing a new value does not
    // move the drive on every keystroke.
    const QList<QDoubleSpinBox *> liveSpins = {
        ui->ServoSinAmpDoubleSpinBox,
        ui->ServoSinFreqDoubleSpinBox,    ui->ServoMeanderAmpDoubleSpinBox,
        ui->ServoMeanderFreqDoubleSpinBox, ui->ServoTriangleAmpDoubleSpinBox,
        ui->ServoTriangleFreqDoubleSpinBox, ui->MitStepPosDoubleSpinBox,
        ui->MitStepVelDoubleSpinBox,      ui->MitStepTorqDoubleSpinBox,
        ui->MitStepKpDoubleSpinBox,       ui->MitStepKdDoubleSpinBox,
        ui->MitTrajAmpDoubleSpinBox,      ui->MitTrajFreqDoubleSpinBox,
        ui->MitTrajKpDoubleSpinBox,       ui->MitTrajKdDoubleSpinBox,
    };
    for (QDoubleSpinBox *spin : liveSpins) {
        connect(spin, &QDoubleSpinBox::valueChanged, this, &MainWindow::onControlParamsEdited);
    }
    connect(ui->MitDerivativeCheckBox, &QCheckBox::toggled, this,
            &MainWindow::onControlParamsEdited);

    connect(ui->EmergStopPushButton, &QPushButton::clicked, this,
            &MainWindow::onEmergencyStop);

    // Sliders drive their spin box in hundredths: slider position 628 is 6.28.
    const QVector<QPair<QSlider *, QDoubleSpinBox *>> pairs = {
        {ui->ServoPosKpSlider, ui->ServoPosKpDoubleSpinBox},
        {ui->ServoPosKiSlider, ui->ServoPosKiDoubleSpinBox},
        {ui->ServoPosKdSlider, ui->ServoPosKdDoubleSpinBox},
        {ui->ServoVelKpSlider, ui->ServoVelKpDoubleSpinBox},
        {ui->ServoVelKiSlider, ui->ServoVelKiDoubleSpinBox},
        {ui->ServoUserTargetSlider, ui->ServoUserTargetDoubleSpinBox},
        {ui->ServoSinAmpSlider, ui->ServoSinAmpDoubleSpinBox},
        {ui->ServoSinFreqSlider, ui->ServoSinFreqDoubleSpinBox},
        {ui->ServoMeanderAmpSlider, ui->ServoMeanderAmpDoubleSpinBox},
        {ui->ServoMeanderFreqSlider, ui->ServoMeanderFreqDoubleSpinBox},
        {ui->ServoTriangleAmpSlider, ui->ServoTriangleAmpDoubleSpinBox},
        {ui->ServoTriangleFreqSlider, ui->ServoTriangleFreqDoubleSpinBox},
        {ui->MitStepPosSlider, ui->MitStepPosDoubleSpinBox},
        {ui->MitStepVelSlider, ui->MitStepVelDoubleSpinBox},
        {ui->MitStepTorqSlider, ui->MitStepTorqDoubleSpinBox},
        {ui->MitStepKpSlider, ui->MitStepKpDoubleSpinBox},
        {ui->MitStepKdSlider, ui->MitStepKdDoubleSpinBox},
        {ui->MitTrajAmpSlider, ui->MitTrajAmpDoubleSpinBox},
        {ui->MitTrajFreqSlider, ui->MitTrajFreqDoubleSpinBox},
        {ui->MitTrajKpSlider, ui->MitTrajKpDoubleSpinBox},
        {ui->MitTrajKdSlider, ui->MitTrajKdDoubleSpinBox},
    };
    for (const auto &pair : pairs) {
        QSlider *slider = pair.first;
        QDoubleSpinBox *spin = pair.second;
        slider->setSingleStep(1);
        slider->setPageStep(10);
        connect(slider, &QSlider::valueChanged, this, [spin](int position) {
            // setValue() emits valueChanged(), which drives the spin box's own
            // handlers; the reverse direction below blocks the slider, so this
            // cannot loop.
            spin->setValue(position / 100.0);
        });
        connect(spin, &QDoubleSpinBox::valueChanged, this, [slider](double value) {
            // The spin box accepts values outside the slider's span; the slider
            // then just sits at the nearer end.
            const QSignalBlocker blocker(slider);
            slider->setValue(qRound(value * 100.0));
        });
    }
    updateControlSliderRanges();
    updateServoPages();

    onMitTrajectoryChanged();
}

void MainWindow::onServoControlTypeChanged()
{
    updateServoPages();
    updateControlSliderRanges();
    onControlParamsEdited();
}

void MainWindow::updateServoPages()
{
    // Torque and voltage have neither an input shaper nor feedback gains.
    if (ui->ServoPositionRadioBtn->isChecked()) {
        ui->TransientFormStack->setCurrentWidget(ui->PosTransientPage);
        ui->FbGainsStack->setCurrentWidget(ui->PosGainsPage);
        ui->TrajParamsStack->setCurrentWidget(
                ui->PosFilterRadioBtn->isChecked() ? ui->PosFilterPage
                : ui->PosPolyRadioBtn->isChecked() ? ui->PosPolyPage
                                                   : ui->TrajParamsEmptyPage);
    } else if (ui->ServoVelocityRadioBtn->isChecked()) {
        ui->TransientFormStack->setCurrentWidget(ui->VelTransientPage);
        ui->FbGainsStack->setCurrentWidget(ui->VelGainsPage);
        ui->TrajParamsStack->setCurrentWidget(ui->VelRampRadioBtn->isChecked()
                                                      ? ui->VelRampPage
                                                      : ui->TrajParamsEmptyPage);
    } else {
        ui->TransientFormStack->setCurrentWidget(ui->TorqTransientPage);
        ui->FbGainsStack->setCurrentWidget(ui->FbGainsEmptyPage);
        ui->TrajParamsStack->setCurrentWidget(ui->TrajParamsEmptyPage);
    }
}

ServoCommandType MainWindow::servoCommandType() const
{
    if (ui->ServoPositionRadioBtn->isChecked()) {
        if (ui->PosFilterRadioBtn->isChecked())
            return ServoCommandType::PositionFilter;
        if (ui->PosPolyRadioBtn->isChecked())
            return ServoCommandType::PositionPoly;
        return ServoCommandType::PositionDirect;
    }
    if (ui->ServoVelocityRadioBtn->isChecked()) {
        return ui->VelRampRadioBtn->isChecked() ? ServoCommandType::VelocityRamp
                                                : ServoCommandType::VelocityDirect;
    }
    if (ui->ServoVoltageRadioBtn->isChecked())
        return ServoCommandType::VoltageDirect;
    return ServoCommandType::TorqueDirect;
}

QVector<MainWindow::ServoSettingEditor> MainWindow::servoSettingEditors() const
{
    return {
        {registers::kServoPosP, ui->ServoPosKpDoubleSpinBox, false},
        {registers::kServoPosI, ui->ServoPosKiDoubleSpinBox, false},
        {registers::kServoPosD, ui->ServoPosKdDoubleSpinBox, false},
        {registers::kServoVelP, ui->ServoVelKpDoubleSpinBox, false},
        {registers::kServoVelI, ui->ServoVelKiDoubleSpinBox, false},
        {registers::kServoInputBandwidth, ui->PosFilterBandwidthDoubleSpinBox, false},
        {registers::kServoVelLimit, ui->PosPolyVelLimitDoubleSpinBox, true},
        {registers::kServoAccelLimit, ui->PosPolyAccelLimitDoubleSpinBox, true},
        {registers::kServoDecelLimit, ui->PosPolyDecelLimitDoubleSpinBox, true},
        {registers::kServoVelRampRate, ui->VelRampRateDoubleSpinBox, true},
    };
}

void MainWindow::showServoSetting(const QString &name, const RegisterValue &value)
{
    if (value.isEmpty() || std::isnan(value.toDouble()))
        return;
    for (const ServoSettingEditor &editor : servoSettingEditors()) {
        if (name != QLatin1String(editor.name))
            continue;
        // Not blocked: the slider beside a gain follows its spin box this way.
        editor.spin->setValue(editor.angular
                                      ? units::fromRadians(value.toDouble(), m_angleUnit)
                                      : value.toDouble());
        return;
    }
}

void MainWindow::showServoSettingsOf(const DeviceModel *device)
{
    for (const ServoSettingEditor &editor : servoSettingEditors()) {
        const QString name = QString::fromLatin1(editor.name);
        showServoSetting(name, device->deviceValue(name));
    }
}

void MainWindow::writeServoSettings(const QList<const char *> &names)
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    RegisterWrites writes;
    for (const ServoSettingEditor &editor : servoSettingEditors()) {
        if (!names.contains(editor.name))
            continue;
        const double shown = editor.spin->value();
        writes.append({QString::fromLatin1(editor.name),
                       RegisterValue::fromReal32(editor.angular
                                                         ? units::toRadians(shown, m_angleUnit)
                                                         : shown)});
    }
    // Servo settings take effect at once: on Serial the batch closes with SAVE, so
    // the drive does not reboot for them.
    m_link->writeRegisters(device->nodeId(), writes);
    setStatusMessage(tr("Servo settings written."));
}

bool MainWindow::servoUserTabActive() const
{
    return ui->ControlTabWidget->currentIndex() == 0
            && ui->RefTrajectoryTabWidget->currentIndex() == 0;
}

void MainWindow::applyControlLock(ControlLock lock)
{
    if (m_controlLock == lock)
        return;
    m_controlLock = lock;

    const bool servoLocked = lock == ControlLock::ServoWaveform;
    const bool mitLocked = lock == ControlLock::Mit;

    // The panels themselves stay as they are - only what sits inside them stops
    // reacting, so the titles and the values on display remain readable.
    for (QGroupBox *box : {ui->ServoControlTypeGroupBox, ui->TransientFormGroupBox,
                           ui->TrajParamsGroupBox, ui->FbGainsGroupBox}) {
        const QList<QWidget *> children = box->findChildren<QWidget *>();
        for (QWidget *child : children)
            child->setEnabled(!servoLocked);
    }

    // The other protocol is a second set-point stream into the same drive, so the
    // tab it lives on is closed for as long as this one is running.
    ui->ControlTabWidget->setTabEnabled(kMitTabIndex, !servoLocked);
    ui->ControlTabWidget->setTabEnabled(kServoTabIndex, !mitLocked);
    // Register traffic shares the Serial line with the set-points, and a Write goes
    // through CONFIG -> APPLY, which reboots the drive out from under the motion.
    updateRegisterActionButtons();
}

void MainWindow::updateRegisterActionButtons()
{
    const bool registers = m_link && m_link->isConnected() && m_controlLock == ControlLock::None
            && !m_calibrating && !m_canFlashNode;
    ui->ReadRegBtn->setEnabled(registers);
    ui->WriteRegBtn->setEnabled(registers);
    ui->SetOriginBtn->setEnabled(registers);
}

bool MainWindow::flashingAvailable() const
{
    if (m_link && m_link->isConnected() && m_link->kind() == LinkKind::Can)
        return m_devices->selected() != nullptr;
    return true;
}

void MainWindow::updateControlLock()
{
    // Serial only: there the servo settings are register writes that would land while
    // the drive is being fed set-points, and the register actions share the one line
    // the set-points go down. Pressing Stop clears the node and lifts the lock.
    const DeviceModel *device = m_devices->selected();
    const bool serial = m_link && m_link->isConnected() && m_link->kind() == LinkKind::Serial;
    if (!serial || !device || !m_control->isRunning(device->nodeId())) {
        applyControlLock(ControlLock::None);
        return;
    }
    applyControlLock(m_runningLocks.value(device->nodeId(), ControlLock::None));
}

void MainWindow::setRunningControlLock(quint8 nodeId, const TrajectoryParams &params)
{
    // MIT streams whatever its form is, including Step; on Servo the User target is
    // applied once and leaves nothing running that the settings could disturb.
    ControlLock lock = ControlLock::None;
    if (params.protocol == ControlProtocol::Mit)
        lock = ControlLock::Mit;
    else if (isWaveformForm(params.form))
        lock = ControlLock::ServoWaveform;

    if (lock == ControlLock::None)
        m_runningLocks.remove(nodeId);
    else
        m_runningLocks.insert(nodeId, lock);
    updateControlLock();
}

void MainWindow::setSliderRange(QSlider *slider, QDoubleSpinBox *spin, double min, double max)
{
    const QSignalBlocker blocker(slider);
    slider->setRange(qRound(min * 100.0), qRound(max * 100.0));
    // setRange() clamps the position, so re-seat the handle from the spin box.
    slider->setValue(qRound(spin->value() * 100.0));
}

void MainWindow::updateControlSliderRanges()
{
    // One turn, 60 rad/s and 25 N*m in the display unit; the angular spans are
    // what the user sees, so they follow the rad/deg switch.
    const double angle = units::fromRadians(2.0 * units::kPi, m_angleUnit);
    const double velocity = units::fromRadians(60.0, m_angleUnit);
    // Voltage shares the torque span: both are a few tens of units at most.
    constexpr double kTorque = 25.0;
    constexpr double kMaxKp = 64.0;
    constexpr double kMaxKd = 10.0;
    constexpr double kMaxFrequency = 40.0;
    // The servo gains span a few times the firmware defaults (position 150 / 200 /
    // 10, velocity 30 / 60).
    constexpr double kMaxServoPosKp = 500.0;
    constexpr double kMaxServoPosKi = 1000.0;
    constexpr double kMaxServoPosKd = 50.0;
    constexpr double kMaxServoVelKp = 100.0;
    constexpr double kMaxServoVelKi = 300.0;

    const auto spanFor = [&](bool velocityMode, bool torqueMode) {
        return torqueMode ? kTorque : velocityMode ? velocity : angle;
    };
    const double servoSpan = spanFor(ui->ServoVelocityRadioBtn->isChecked(),
                                     ui->ServoTorqueRadioBtn->isChecked()
                                             || ui->ServoVoltageRadioBtn->isChecked());
    const double mitSpan = spanFor(ui->MitTrajVelocityRadioBtn->isChecked(),
                                   ui->MitTrajTorqueRadioBtn->isChecked());

    setSliderRange(ui->ServoPosKpSlider, ui->ServoPosKpDoubleSpinBox, 0.0, kMaxServoPosKp);
    setSliderRange(ui->ServoPosKiSlider, ui->ServoPosKiDoubleSpinBox, 0.0, kMaxServoPosKi);
    setSliderRange(ui->ServoPosKdSlider, ui->ServoPosKdDoubleSpinBox, 0.0, kMaxServoPosKd);
    setSliderRange(ui->ServoVelKpSlider, ui->ServoVelKpDoubleSpinBox, 0.0, kMaxServoVelKp);
    setSliderRange(ui->ServoVelKiSlider, ui->ServoVelKiDoubleSpinBox, 0.0, kMaxServoVelKi);
    setSliderRange(ui->ServoUserTargetSlider, ui->ServoUserTargetDoubleSpinBox, -servoSpan,
                   servoSpan);
    // Amplitudes are magnitudes, so their sliders start at zero.
    for (const auto &pair : {qMakePair(ui->ServoSinAmpSlider, ui->ServoSinAmpDoubleSpinBox),
                             qMakePair(ui->ServoMeanderAmpSlider, ui->ServoMeanderAmpDoubleSpinBox),
                             qMakePair(ui->ServoTriangleAmpSlider,
                                       ui->ServoTriangleAmpDoubleSpinBox)}) {
        setSliderRange(pair.first, pair.second, 0.0, servoSpan);
    }
    for (const auto &pair : {qMakePair(ui->ServoSinFreqSlider, ui->ServoSinFreqDoubleSpinBox),
                             qMakePair(ui->ServoMeanderFreqSlider, ui->ServoMeanderFreqDoubleSpinBox),
                             qMakePair(ui->ServoTriangleFreqSlider,
                                       ui->ServoTriangleFreqDoubleSpinBox),
                             qMakePair(ui->MitTrajFreqSlider, ui->MitTrajFreqDoubleSpinBox)}) {
        setSliderRange(pair.first, pair.second, 0.0, kMaxFrequency);
    }

    setSliderRange(ui->MitStepPosSlider, ui->MitStepPosDoubleSpinBox, -angle, angle);
    setSliderRange(ui->MitStepVelSlider, ui->MitStepVelDoubleSpinBox, -velocity, velocity);
    setSliderRange(ui->MitStepTorqSlider, ui->MitStepTorqDoubleSpinBox, -kTorque, kTorque);
    setSliderRange(ui->MitStepKpSlider, ui->MitStepKpDoubleSpinBox, 0.0, kMaxKp);
    setSliderRange(ui->MitStepKdSlider, ui->MitStepKdDoubleSpinBox, 0.0, kMaxKd);
    setSliderRange(ui->MitTrajAmpSlider, ui->MitTrajAmpDoubleSpinBox, 0.0, mitSpan);
    setSliderRange(ui->MitTrajKpSlider, ui->MitTrajKpDoubleSpinBox, 0.0, kMaxKp);
    setSliderRange(ui->MitTrajKdSlider, ui->MitTrajKdDoubleSpinBox, 0.0, kMaxKd);
}

void MainWindow::onMitTrajectoryChanged()
{
    // Step maps one-to-one onto mit_cmd; the other shapes drive one quantity. The
    // two target panels are the pages of one stack, so only the one that belongs to
    // the selected shape is on screen and the column is as tall as the taller page
    // rather than as tall as both.
    const bool step = ui->MitStepRadioBtn->isChecked();
    ui->MitTargetsStack->setCurrentWidget(step ? ui->MitStepPage : ui->MitTrajectoryPage);
    // "+derivative" only means anything when the waveform drives position.
    ui->MitDerivativeCheckBox->setEnabled(ui->MitTrajPositionRadioBtn->isChecked());
    updateControlSliderRanges();
    onControlParamsEdited();
}

TrajectoryParams MainWindow::collectServoParams() const
{
    TrajectoryParams params;
    params.protocol = ControlProtocol::Servo;

    if (ui->ServoVelocityRadioBtn->isChecked())
        params.servoType = ServoControlType::Velocity;
    else if (ui->ServoTorqueRadioBtn->isChecked())
        params.servoType = ServoControlType::Torque;
    else if (ui->ServoVoltageRadioBtn->isChecked())
        params.servoType = ServoControlType::Voltage;
    else
        params.servoType = ServoControlType::Position;
    params.servoCommand = servoCommandType();

    const bool angular = params.servoType == ServoControlType::Position
            || params.servoType == ServoControlType::Velocity;
    const auto native = [this, angular](double displayed) {
        return angular ? units::toRadians(displayed, m_angleUnit) : displayed;
    };

    switch (ui->RefTrajectoryTabWidget->currentIndex()) {
    case 1:
        params.form = TrajectoryForm::Sin;
        params.amplitude = native(ui->ServoSinAmpDoubleSpinBox->value());
        params.frequency = ui->ServoSinFreqDoubleSpinBox->value();
        break;
    case 2:
        params.form = TrajectoryForm::Meander;
        params.amplitude = native(ui->ServoMeanderAmpDoubleSpinBox->value());
        params.frequency = ui->ServoMeanderFreqDoubleSpinBox->value();
        break;
    case 3:
        params.form = TrajectoryForm::Triangle;
        params.amplitude = native(ui->ServoTriangleAmpDoubleSpinBox->value());
        params.frequency = ui->ServoTriangleFreqDoubleSpinBox->value();
        break;
    default:
        params.form = TrajectoryForm::User;
        params.userTarget = native(ui->ServoUserTargetDoubleSpinBox->value());
        break;
    }
    return params;
}

TrajectoryParams MainWindow::collectMitParams() const
{
    TrajectoryParams params;
    params.protocol = ControlProtocol::Mit;

    if (ui->MitStepRadioBtn->isChecked()) {
        params.form = TrajectoryForm::Step;
        params.stepPosition = units::toRadians(ui->MitStepPosDoubleSpinBox->value(), m_angleUnit);
        params.stepVelocity = units::toRadians(ui->MitStepVelDoubleSpinBox->value(), m_angleUnit);
        params.stepTorque = ui->MitStepTorqDoubleSpinBox->value();
        params.stepPositionGain = ui->MitStepKpDoubleSpinBox->value();
        params.stepVelocityGain = ui->MitStepKdDoubleSpinBox->value();
        return params;
    }

    if (ui->MitSinRadioBtn->isChecked())
        params.form = TrajectoryForm::Sin;
    else if (ui->MitMeanderRadioBtn->isChecked())
        params.form = TrajectoryForm::Meander;
    else
        params.form = TrajectoryForm::Triangle;

    if (ui->MitTrajVelocityRadioBtn->isChecked())
        params.mitChannel = ServoControlType::Velocity;
    else if (ui->MitTrajTorqueRadioBtn->isChecked())
        params.mitChannel = ServoControlType::Torque;
    else
        params.mitChannel = ServoControlType::Position;

    const bool angular = params.mitChannel != ServoControlType::Torque;
    params.amplitude = angular
            ? units::toRadians(ui->MitTrajAmpDoubleSpinBox->value(), m_angleUnit)
            : ui->MitTrajAmpDoubleSpinBox->value();
    params.frequency = ui->MitTrajFreqDoubleSpinBox->value();
    params.positionGain = ui->MitTrajKpDoubleSpinBox->value();
    params.velocityGain = ui->MitTrajKdDoubleSpinBox->value();
    params.sendDerivative = ui->MitDerivativeCheckBox->isChecked()
            && params.mitChannel == ServoControlType::Position;
    return params;
}

TrajectoryParams MainWindow::collectCurrentParams() const
{
    return ui->ControlTabWidget->currentIndex() == 1 ? collectMitParams()
                                                     : collectServoParams();
}

void MainWindow::onTrajectoryStart(ControlProtocol protocol)
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    const quint8 nodeId = device->nodeId();
    if (m_control->isRunning(nodeId)) {
        m_control->stop(nodeId);
        return;
    }
    if (!prepareSafeStart(device))
        return;

    const TrajectoryParams params = protocol == ControlProtocol::Mit ? collectMitParams()
                                                                     : collectServoParams();
    const int rate = m_control->effectiveRateHz(protocol);
    const int wanted = protocol == ControlProtocol::Mit ? ControlManager::kMitRateHz
                                                        : ControlManager::kServoRateHz;
    if (rate < wanted) {
        // Worth saying plainly: at 115200 baud the Serial line cannot carry 1 kHz.
        setStatusMessage(tr("Serial cannot sustain %1 Hz; running at %2 Hz instead.")
                                 .arg(wanted)
                                 .arg(rate),
                         8000);
    }

    m_control->start(nodeId, params);
    setRunningControlLock(nodeId, params);
}

void MainWindow::onServoUserStart()
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    // Whatever is running keeps running; the press only swaps in the new target.
    const quint8 nodeId = device->nodeId();
    if (m_control->isRunning(nodeId)) {
        const TrajectoryParams params = collectServoParams();
        m_control->updateParams(nodeId, params);
        setRunningControlLock(nodeId, params);
        return;
    }
    onTrajectoryStart(ControlProtocol::Servo);
}

void MainWindow::onControlParamsEdited()
{
    // The User tab waits for its Start button; see onServoUserStart().
    if (servoUserTabActive())
        return;
    DeviceModel *device = m_devices->selected();
    if (!device)
        return;
    const quint8 nodeId = device->nodeId();
    if (!m_control->isRunning(nodeId))
        return;
    const TrajectoryParams params = collectCurrentParams();
    m_control->updateParams(nodeId, params);
    // Switching trajectory tabs mid-run changes the shape, and with it the lock.
    setRunningControlLock(nodeId, params);
}

void MainWindow::setDriverEnabled(quint8 nodeId, bool on)
{
    if constexpr (!registers::kIsOnEnabled) {
        // Zero torque and zero gains take the set-point off without is_on.
        if (!on)
            m_link->sendMitCommand(nodeId, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f);
        return;
    }
    m_link->writeRegisters(nodeId, {{QString::fromLatin1(registers::kIsOn),
                                     RegisterValue::fromBool(on)}});
}

void MainWindow::onEmergencyStop()
{
    m_control->stopAll();
    if (!m_link)
        return;
    m_statusTimer.stop();
    m_pollTimer.stop();
    // Every drive, not only the selected one.
    for (DeviceModel *device : m_devices->devices()) {
        setDriverEnabled(device->nodeId(), false);
    }
    setStatusMessage(tr("Emergency stop: all actuators disabled."), 10000);
    if (!m_link->isConnected())
        return;
    // The link goes down with the drives: the session is over until the drive has
    // been power-cycled and connected to again. handleDisconnected() tells the
    // user so once the close (asynchronous on Serial) has finished.
    m_emergencyStopPending = true;
    ui->EmergStopPushButton->setEnabled(false);
    ui->SerialConnectBtn->setEnabled(false);
    ui->CanConnectBtn->setEnabled(false);
    m_link->closeLink();
}

void MainWindow::onSafetyTripped(quint8 nodeId, const QString &reason)
{
    // Joins the command thread, so no set-point can follow the zero command below.
    m_control->stop(nodeId);
    if (m_link) {
        // Zero torque and zero gains take the set-point off entirely; position and
        // velocity mean nothing without gains.
        m_link->sendMitCommand(nodeId, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f);
        setDriverEnabled(nodeId, false);
    }

    const DeviceModel *device = m_devices->device(nodeId);
    const QString name = device ? device->displayName() : tr("Node %1").arg(nodeId);
    setStatusMessage(tr("Protective stop of %1: %2").arg(name, reason), 10000);
    // Deferred, so the modal dialog does not sit inside the link's read callback.
    QTimer::singleShot(0, this, [this, name, reason] {
        QMessageBox::critical(
                this, tr("Protective stop"),
                tr("%1 has been stopped and disabled.\n\n%2\n\nLet the actuator cool down "
                   "or clear the fault; the next Start enables it again.")
                        .arg(name, reason));
    });
}

bool MainWindow::prepareSafeStart(DeviceModel *device)
{
    const auto value = [device](const char *name) {
        return device->deviceValue(QString::fromLatin1(name));
    };
    const QString problem =
            SafetyMonitor::preStartProblem(value(registers::kIsFault), value(registers::kTempStator),
                                           value(registers::kTempMcu), m_config.safety);
    if (!problem.isEmpty()) {
        QMessageBox::critical(this, tr("Protective stop"), problem);
        return false;
    }

    const quint8 nodeId = device->nodeId();
    if (m_safety->isTripped(nodeId)) {
        // The protective stop switched the driver off; the user's Start is what
        // switches it back on.
        m_safety->rearm(nodeId);
        setDriverEnabled(nodeId, true);
    }
    return true;
}

void MainWindow::onSetpointsProduced(quint8 nodeId, const TrajectoryBatch &outputs)
{
    DeviceModel *device = m_devices->selected();
    if (!device || device->nodeId() != nodeId)
        return;
    // A batch still queued when Stop was pressed would reopen the set-point stream
    // that onTrajectoryRunningChanged() has just closed.
    if (!m_control->isRunning(nodeId))
        return;
    // Native units: the plot scales the set-point together with the sample it is
    // drawn against. Every channel that is commanded is reported; the plot keeps a
    // target trace for each.
    for (const TrajectoryOutput &output : outputs) {
        if (output.protocol == ControlProtocol::Mit) {
            m_plot->appendSetpoint(output.position, ServoControlType::Position, output.t_us);
            m_plot->appendSetpoint(output.velocity, ServoControlType::Velocity, output.t_us);
            m_plot->appendSetpoint(output.torque, ServoControlType::Torque, output.t_us);
        } else {
            m_plot->appendSetpoint(output.primary, output.primaryType, output.t_us);
        }
    }
}

void MainWindow::onTrajectoryRunningChanged(quint8 nodeId, bool running)
{
    // Stop releases the servo configuration, whichever drive was running.
    if (!running)
        m_runningLocks.remove(nodeId);
    updateControlLock();

    DeviceModel *device = m_devices->selected();
    if (!device || device->nodeId() != nodeId)
        return;

    // A protocol change rebuilds the worker, and the old one reports its stop while
    // the new one already runs.
    if (!running && !m_control->isRunning(nodeId))
        m_plot->endSetpoints();

    // ServoUserStartBtn stays "Start": it applies a target rather than toggling.
    const QString label = running ? tr("Stop") : tr("Start");
    for (QPushButton *button : {ui->ServoSinStartBtn, ui->ServoMeanderStartBtn,
                                ui->ServoTriangleStartBtn, ui->MitStartBtn}) {
        button->setText(label);
    }
}

// --- plot and preferences -----------------------------------------------------------------

void MainWindow::setupPlotUi()
{
    m_plot->setupPlot(ui->PlotHost);

    connect(ui->LogBtn, &QPushButton::toggled, this, [this](bool checked) {
        m_plot->setLogVisible(checked);
        updateSavePlotButton();
    });
    connect(ui->UnitsComboBox, &QComboBox::currentIndexChanged, this,
            &MainWindow::onUnitsChanged);
    connect(ui->PausePltBtn, &QPushButton::clicked, this, &MainWindow::onPausePlot);
    connect(ui->crosshairPushButton, &QPushButton::toggled, m_plot,
            &PlotController::setCrosshairEnabled);
    connect(ui->SavePltBtn, &QPushButton::clicked, this, &MainWindow::onSavePlot);
    connect(m_plot, &PlotController::measurementChanged, this,
            &MainWindow::onMeasurementChanged);
    onMeasurementChanged(PlotMeasurement{});

    connect(ui->PreferencesBtn, &QPushButton::clicked, this, [this] {
        PreferencesDialog dialog(this);
        dialog.setConfig(m_config);
        connect(&dialog, &PreferencesDialog::configApplied, this,
                [this](const AppConfig &config) {
                    const bool languageChanged = config.ui.language != m_config.ui.language;
                    m_config = config;
                    m_safety->setLimits(m_config.safety);
                    applyUiSettings();
                    if (languageChanged)
                        applyLanguage();
                    saveSettings();
                });
        dialog.exec();
    });
}

void MainWindow::onUnitsChanged()
{
    const AngleUnit previous = m_angleUnit;
    m_angleUnit = ui->UnitsComboBox->currentIndex() == 1 ? AngleUnit::Degrees
                                                         : AngleUnit::Radians;
    if (m_angleUnit == previous)
        return;
    m_plot->setAngleUnit(m_angleUnit);
    // Editors hold display units, so every angular field has to be re-rendered.
    refreshAllEditors();
    convertControlEditors(previous, m_angleUnit);
    updateControlSliderRanges();
    updateStatusLabels();
}

void MainWindow::convertControlEditors(AngleUnit from, AngleUnit to)
{
    // The control-tab spin boxes are not register bindings, so they are converted
    // directly: the same physical value, re-expressed in the new unit. Which of them
    // are angular follows the selected control type, as in collectServoParams() and
    // collectMitParams(). m_angleUnit is already `to`, so the valueChanged() handlers
    // that push live edits to a running trajectory compute the same radian value.
    QList<QDoubleSpinBox *> angular = {
        ui->MitStepPosDoubleSpinBox,
        ui->MitStepVelDoubleSpinBox,
    };
    for (const ServoSettingEditor &editor : servoSettingEditors()) {
        if (editor.angular)
            angular << editor.spin;
    }
    if (!ui->ServoTorqueRadioBtn->isChecked() && !ui->ServoVoltageRadioBtn->isChecked()) {
        angular << ui->ServoUserTargetDoubleSpinBox << ui->ServoSinAmpDoubleSpinBox
                << ui->ServoMeanderAmpDoubleSpinBox << ui->ServoTriangleAmpDoubleSpinBox;
    }
    if (!ui->MitTrajTorqueRadioBtn->isChecked())
        angular << ui->MitTrajAmpDoubleSpinBox;

    for (QDoubleSpinBox *spin : angular)
        spin->setValue(units::fromRadians(units::toRadians(spin->value(), from), to));
}

void MainWindow::onPausePlot()
{
    setPlotLive(!m_plot->isLiveMode());
}

void MainWindow::setPlotLive(bool live)
{
    m_plot->setLiveMode(live);
    // The button shows the action it will take: pause a live plot, play a paused one.
    ui->PausePltBtn->setIcon(ThemeManager::icon(live ? QStringLiteral("pause_white")
                                                     : QStringLiteral("play_white"),
                                                m_config.ui.theme,
                                                ui->PausePltBtn->iconSize().width()));
    ui->PausePltBtn->setToolTip(live ? tr("Pause the plot") : tr("Resume the plot"));
    setMeasurementReadoutVisible(!live);
}

void MainWindow::onMeasurementChanged(const PlotMeasurement &measurement)
{
    PlotMeasurementTool::showInLabels(measurement, ui->PlotXPosLabel, ui->PlotYPosLabel,
                                      ui->PlotDistLabel, ui->PlotDistLabel_2,
                                      QLatin1Char(' ') + tr("s"));
}

void MainWindow::setMeasurementReadoutVisible(bool visible)
{
    const QList<QWidget *> readout = {ui->line_2,  ui->label,         ui->PlotXPosLabel,
                                      ui->label_3, ui->PlotYPosLabel, ui->line_3,
                                      ui->label_5, ui->PlotDistLabel, ui->label_6,
                                      ui->PlotDistLabel_2};
    for (QWidget *widget : readout)
        widget->setVisible(visible);
}

void MainWindow::onSavePlot()
{
    SaveFileDialog dialog(this);
    dialog.setTheme(m_config.ui.theme);
    dialog.setSuggestedName(QStringLiteral("plot"));
    if (dialog.exec() != QDialog::Accepted)
        return;
    const SaveFileDialog::Options options = dialog.options();
    if (options.path.isEmpty()) {
        setStatusMessage(tr("No file was selected."));
        return;
    }
    if (QFileInfo::exists(options.path)
        && QMessageBox::question(this, tr("Save plot"),
                                 tr("%1 already exists. Overwrite it?")
                                         .arg(QDir::toNativeSeparators(options.path)))
                != QMessageBox::Yes) {
        return;
    }

    QString error;
    bool ok = false;
    switch (options.format) {
    case SaveFileDialog::Format::Csv:
        ok = m_plot->saveCsv(options.path, &error);
        break;
    case SaveFileDialog::Format::Png:
        ok = m_plot->saveImage(options.path, plot_export::ImageFormat::Png, options.theme,
                               options.dpi, &error);
        break;
    case SaveFileDialog::Format::Jpg:
        ok = m_plot->saveImage(options.path, plot_export::ImageFormat::Jpg, options.theme,
                               options.dpi, &error);
        break;
    case SaveFileDialog::Format::Svg:
        ok = m_plot->saveImage(options.path, plot_export::ImageFormat::Svg, options.theme,
                               options.dpi, &error);
        break;
    }
    if (ok)
        setStatusMessage(tr("Saved to %1.").arg(QDir::toNativeSeparators(options.path)));
    else
        showError(tr("Could not save the plot"), error);
}

void MainWindow::updateSavePlotButton()
{
    ui->SavePltBtn->setEnabled(!m_plot->isLogVisible());
}

// --- firmware --------------------------------------------------------------------------------

void MainWindow::setupFirmwareUi()
{
    ui->FlashProgressBar->setValue(0);

    connect(ui->ChooseFirmwareFileRadioButton, &QRadioButton::toggled, this,
            &MainWindow::updateFirmwareSourceWidgets);
    // clicked, not toggled: pressing it again while checked is how a failed lookup
    // is retried.
    connect(ui->DownloadFirmwareRadioButton, &QRadioButton::clicked, this,
            &MainWindow::requestFirmwareReleases);
    // The default popup delegate takes the stylesheet's text colour over the
    // items' own, which would lose the muted beta releases; this one also puts the
    // release titles back into the popup.
    ui->FirmwareVersionComboBox->setItemDelegate(
            new LongLabelDelegate(ui->FirmwareVersionComboBox));
    connect(ui->OpenHexPushButton, &QPushButton::clicked, this, &MainWindow::onOpenHexFile);
    connect(ui->FlashPushButton, &QPushButton::clicked, this, &MainWindow::onFlashClicked);
    updateFirmwareSourceWidgets();
    updateFirmwareVersionCombo();
}

void MainWindow::onOpenHexFile()
{
    const QString path = QFileDialog::getOpenFileName(
            this, tr("Select firmware image"), FirmwareDownloader::firmwareDirectory(),
            tr("Intel HEX files (*.hex)"));
    if (path.isEmpty())
        return;
    m_selectedHexPath = path;
    setStatusMessage(tr("Selected %1.").arg(QFileInfo(path).fileName()));
}

void MainWindow::updateFirmwareSourceWidgets()
{
    const bool local = ui->ChooseFirmwareFileRadioButton->isChecked();
    ui->OpenHexPushButton->setVisible(local);
    ui->OpenHexPushButton->setEnabled(local && flashingAvailable());
    ui->FirmwareVersionComboBox->setVisible(!local);
    // The list takes the button's place and whatever the row has left: its own size
    // hint, set by the "No releases" placeholder, would widen the left column every
    // time Remote repo is picked, so the .ui makes the layout ignore it.
    ui->FirmwareVersionComboBox->setMinimumWidth(ui->OpenHexPushButton->sizeHint().width());
}

void MainWindow::requestFirmwareReleases()
{
    if (m_downloader->isListing())
        return;
    setStatusMessage(tr("Looking up the firmware releases..."), 0);
    m_downloader->listReleases();
    updateFirmwareVersionCombo();
}

void MainWindow::onFirmwareReleasesListed(const QList<FirmwareRelease> &releases)
{
    QComboBox *combo = ui->FirmwareVersionComboBox;
    const QString previous = combo->currentData(kFirmwareVersionRole).toString();
    combo->clear();
    auto *model = qobject_cast<QStandardItemModel *>(combo->model());
    for (const FirmwareRelease &release : releases) {
        // The early releases say "beta" only in their title ("Beta 2.4"), so it is
        // shown next to the tag.
        // The closed box shows the bare tag, so the title does not widen the panel.
        const bool titled = release.beta
                && !release.version.contains(QLatin1String("beta"), Qt::CaseInsensitive)
                && release.name.contains(QLatin1String("beta"), Qt::CaseInsensitive);
        combo->addItem(release.version);
        const int index = combo->count() - 1;
        if (titled)
            combo->setItemData(index, QStringLiteral("%1 (%2)").arg(release.version, release.name),
                               kLongLabelRole);
        combo->setItemData(index, release.version, kFirmwareVersionRole);
        combo->setItemData(index, release.assetUrl, kFirmwareAssetRole);
        combo->setItemData(index, release.beta, kFirmwareBetaRole);
        combo->setItemData(index, release.name, Qt::ToolTipRole);
        if (!release.assetUrl.isValid() && model) {
            model->item(index)->setEnabled(false);
            combo->setItemData(index, tr("This release carries no firmware image to flash."),
                               Qt::ToolTipRole);
        }
    }

    // A repeated lookup keeps the user's pick; otherwise the newest flashable one.
    int current = combo->findData(previous, kFirmwareVersionRole);
    for (int i = 0; current < 0 && i < combo->count(); ++i) {
        if (combo->itemData(i, kFirmwareAssetRole).toUrl().isValid())
            current = i;
    }
    combo->setCurrentIndex(current);
    widenPopupToContents(combo);

    updateFirmwareVersionColors();
    updateFirmwareVersionCombo();
    setStatusMessage(tr("Found %n firmware release(s).", nullptr, int(releases.size())));
}

void MainWindow::onFirmwareReleasesFailed(const QString &error)
{
    ui->FirmwareVersionComboBox->clear();
    updateFirmwareVersionCombo();
    setStatusMessage(tr("Could not list the firmware releases."));
    // Only bother the user while they are looking at the list.
    if (ui->DownloadFirmwareRadioButton->isChecked())
        showError(tr("Firmware releases unavailable"),
                  tr("%1\n\nSelect Remote repo again to retry.").arg(error));
}

void MainWindow::updateFirmwareVersionCombo()
{
    QComboBox *combo = ui->FirmwareVersionComboBox;
    const bool listing = m_downloader->isListing();
    combo->setPlaceholderText(listing ? tr("Loading...") : tr("No releases"));
    combo->setEnabled(!listing && combo->count() > 0);
}

void MainWindow::updateFirmwareVersionColors()
{
    QComboBox *combo = ui->FirmwareVersionComboBox;
    const QColor muted = ThemeManager::mutedTextColor(m_config.ui.theme);
    for (int i = 0; i < combo->count(); ++i) {
        const bool beta = combo->itemData(i, kFirmwareBetaRole).toBool();
        combo->setItemData(i, beta ? QVariant(QBrush(muted)) : QVariant(), Qt::ForegroundRole);
    }
}

void MainWindow::onFlashClicked()
{
    if (ui->DownloadFirmwareRadioButton->isChecked()) {
        const QComboBox *combo = ui->FirmwareVersionComboBox;
        const QString version = combo->currentData(kFirmwareVersionRole).toString();
        const QUrl assetUrl = combo->currentData(kFirmwareAssetRole).toUrl();
        if (version.isEmpty()) {
            showError(tr("No firmware selected"),
                      tr("Pick a release from the list. If it is empty, select Remote repo "
                         "again to retry."));
            return;
        }

        // Flashing what the drive already runs, or something older, is most likely a
        // mistake - but a deliberate reflash or downgrade is allowed.
        const DeviceModel *device = m_devices->selected();
        const QString installedText = device
                ? device->deviceValue(QString::fromLatin1(registers::kFirmwareRev)).toString()
                : QString();
        const auto installed = FirmwareVersion::parse(installedText);
        const auto selected = FirmwareVersion::parse(version);
        if (installed && selected && !(*installed < *selected)) {
            const QString text = *selected < *installed
                    ? tr("The actuator runs firmware %1, which is newer than %2.\n"
                         "Flash %2 anyway?")
                    : tr("The actuator already runs firmware %1.\nFlash %2 anyway?");
            const auto answer = QMessageBox::warning(this, tr("Flash firmware"),
                                                     text.arg(installedText, version),
                                                     QMessageBox::Yes | QMessageBox::No,
                                                     QMessageBox::No);
            if (answer != QMessageBox::Yes) {
                setStatusMessage(tr("Flashing cancelled."));
                return;
            }
        }
        ui->FlashPushButton->setEnabled(false);
        ui->FlashProgressBar->setValue(5);
        m_downloader->download(assetUrl, version, FirmwareDownloader::firmwareDirectory());
        return;
    }

    if (m_selectedHexPath.isEmpty()) {
        showError(tr("No firmware selected"),
                  tr("Choose a .hex file first, or switch to a release from the remote repo."));
        return;
    }
    ui->FlashPushButton->setEnabled(false);
    startFlashing(m_selectedHexPath);
}

void MainWindow::updateFirmwareRevLabel()
{
    const DeviceModel *device = m_devices->selected();
    const auto installed = device ? FirmwareVersion::parse(
                                            device->deviceValue(QString::fromLatin1(
                                                                        registers::kFirmwareRev))
                                                    .toString())
                                  : std::nullopt;
    const auto latest = FirmwareVersion::parse(m_latestFirmware);

    QString status;
    QString tip;
    if (installed && latest) {
        if (*installed < *latest) {
            status = QStringLiteral("outdated");
            tip = tr("The firmware is outdated: release %1 is available.").arg(m_latestFirmware);
        } else {
            status = QStringLiteral("latest");
            tip = tr("You have the latest firmware version.");
        }
    }
    QLabel *label = ui->CurFirmwareRevLabel;
    label->setToolTip(tip);
    if (label->property("firmwareStatus").toString() == status)
        return;
    // The colour comes from the stylesheet, which only re-reads a dynamic property
    // when the widget is polished again.
    label->setProperty("firmwareStatus", status);
    label->style()->unpolish(label);
    label->style()->polish(label);
}

void MainWindow::setFaultIndicator(const QString &state)
{
    // A filled circle stands in for a fault LED; a dash while is_fault is unknown.
    QLabel *label = ui->FaultLabel;
    label->setText(state.isEmpty() ? QStringLiteral("--") : QString(QChar(0x25CF)));
    if (label->property("fault").toString() == state)
        return;
    // The stylesheet only re-reads a dynamic property when the widget is polished again.
    label->setProperty("fault", state);
    label->style()->unpolish(label);
    label->style()->polish(label);
}

void MainWindow::startFlashing(const QString &hexPath)
{
    if (m_link == m_cyphal && m_link->isConnected()) {
        startCanFlashing(hexPath);
        return;
    }

    // OpenOCD drives the target over SWD while the application holds the UART. The
    // drive is disabled first so it is not spinning while its flash is rewritten,
    // and the status polling pauses: a halted core answers nothing.
    m_flashSerialPort.clear();
    if (m_link && m_link->isConnected()) {
        m_control->stopAll();
        m_pollTimer.stop();
        setDriverEnabled(activeNodeId(), false);
        if (m_link->kind() == LinkKind::Serial)
            m_flashSerialPort = ui->SerialCombo->currentData().toString();
    } else if (ui->SerialRadioBtn->isChecked()) {
        // No link - a drive with no firmware on it cannot be connected to. The port
        // picked in CONNECTION, if any, is where the flashed drive is looked for.
        m_flashSerialPort = ui->SerialCombo->currentData().toString();
    }
    setStatusMessage(tr("Flashing %1...").arg(QFileInfo(hexPath).fileName()), 0);
    m_flasher->flash(hexPath, m_config.ui.openocd_interface, m_config.ui.openocd_target);
}

void MainWindow::startCanFlashing(const QString &hexPath)
{
    DeviceModel *device = m_devices->selected();
    if (!device) {
        ui->FlashPushButton->setEnabled(true);
        showError(tr("No actuator selected"),
                  tr("Select the actuator to flash in the device list."));
        return;
    }
    const quint8 nodeId = device->nodeId();
    // VBBoot takes commands on the node_id stored in the EEPROM, and on its fallback
    // id when the drive has none (0 makes the firmware pick a temporary node id).
    // Until node_id has been read, the drive's own node id is the best guess.
    quint32 bootId = nodeId;
    if (const int stored = device->canId(); stored >= 0) {
        bootId = stored >= 1 && stored <= kMaxVbbootNodeId ? quint32(stored)
                                                            : VbbootFlasher::kDefaultCanId;
    }

    m_control->stop(nodeId);
    m_pollTimer.stop();
    m_awaitingReconnect.remove(nodeId);
    m_canFlashNode = nodeId;
    // A drive that is offline is taken to be still in VBBoot after a broken flash:
    // it is not asked again, the transfer simply starts.
    if (device->isOnline())
        m_cyphal->requestBootloader(nodeId);
    updateUiState();

    setStatusMessage(tr("Flashing %1 into %2 over CAN...")
                             .arg(QFileInfo(hexPath).fileName(), device->displayName()),
                     0);
    m_vbboot->flash(hexPath, m_cyphal->interfaceName(), bootId);
}

void MainWindow::onCanFlashFinished(bool ok, const QString &message)
{
    if (!ok) {
        m_canFlashNode.reset();
        ui->FlashPushButton->setEnabled(true);
        ui->FlashProgressBar->setValue(0);
        updateUiState();
        if (m_link && m_link->isConnected())
            m_pollTimer.start();
        showError(tr("Flashing failed"), message);
        return;
    }

    ui->FlashProgressBar->setValue(100);
    const DeviceModel *device = m_canFlashNode ? m_devices->device(*m_canFlashNode) : nullptr;
    if (!device || !m_link || !m_link->isConnected()) {
        // The link went down meanwhile; the drive is found again on connecting.
        m_canFlashNode.reset();
        ui->FlashPushButton->setEnabled(true);
        updateUiState();
        setStatusMessage(message);
        return;
    }
    if (device->isOnline()) {
        // Never reported lost: the flash was over before its heartbeats were missed.
        finishCanFlash();
        return;
    }
    setStatusMessage(tr("%1 Waiting for the actuator to start...").arg(message), 0);
    const quint8 nodeId = *m_canFlashNode;
    QTimer::singleShot(kFlashReconnectWindowMs, this, [this, nodeId] {
        if (m_canFlashNode != nodeId || m_vbboot->isRunning())
            return;  // back already, or flashed again since
        m_canFlashNode.reset();
        ui->FlashPushButton->setEnabled(true);
        updateUiState();
        if (m_link && m_link->isConnected())
            m_pollTimer.start();
        showError(tr("Actuator did not start"),
                  tr("The firmware was written, but node %1 has sent no heartbeat since. "
                     "Power-cycle the actuator; if it stays silent, flash it over SWD.")
                          .arg(nodeId));
    });
}

void MainWindow::finishCanFlash()
{
    const quint8 nodeId = *m_canFlashNode;
    m_canFlashNode.reset();
    ui->FlashPushButton->setEnabled(true);
    if (DeviceModel *device = m_devices->device(nodeId)) {
        device->setOnline(true);
        rebuildDeviceList();
    }

    // Everything may have changed with the image, so the drive is read as on
    // connecting - but left disabled: the new firmware may not take the stored
    // configuration.
    m_link->readRegisters(nodeId, RegisterCatalog::configGroupNames());
    m_link->readRegisters(nodeId, {QString::fromLatin1(registers::kFirmwareRev),
                                   QString::fromLatin1(registers::kName)});
    m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
    m_pollTimer.start();
    updateUiState();
    setStatusMessage(tr("Node %1 is running the new firmware.").arg(nodeId));
}

void MainWindow::reconnectAfterFlash()
{
    m_flashReconnectDeadline = QDeadlineTimer(kFlashReconnectWindowMs);
    m_flashReconnectPending = true;

    if (m_link == m_serial && m_link->isConnected()) {
        // Still up (the UART bridge survived the flash): close it cleanly first;
        // handleDisconnected() then reopens it.
        m_reconnectAfterFlash = true;
        m_control->stopAll();
        m_statusTimer.stop();
        m_pollTimer.stop();
        setStatusMessage(tr("Reconnecting to the flashed actuator..."), 0);
        m_serial->closeLink();
        return;
    }
    // The port went away with the reset; it is polled for until it is back.
    tryFlashReconnect();
}

void MainWindow::tryFlashReconnect()
{
    if (!m_flashReconnectPending)
        return;
    if (m_link && m_link->isConnected()) {
        m_flashReconnectPending = false;  // the user connected by hand meanwhile
        m_flashSerialPort.clear();
        return;
    }

    // Just open it: a port that is not back yet fails the open, and the
    // connectionResult handler retries until the deadline.
    const QString port = m_flashSerialPort;
    refreshSerialPorts();
    const int index = ui->SerialCombo->findData(port);
    if (index >= 0)
        ui->SerialCombo->setCurrentIndex(index);
    connectSerial(port);
    setStatusMessage(tr("Reconnecting to %1...").arg(port), 0);
}
