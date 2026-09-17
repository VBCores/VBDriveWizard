#include "mainwindow.h"

#include "./ui_mainwindow.h"

#include "control/control_manager.h"
#include "core/device_manager.h"
#include "core/register_catalog.h"
#include "core/units.h"
#include "firmware/firmware_downloader.h"
#include "firmware/firmware_flasher.h"
#include "transport/can_interface_list.h"
#include "transport/cyphal_service.h"
#include "transport/serial_service.h"
#include "ui/config_manager.h"
#include "ui/language_manager.h"
#include "ui/plot_controller.h"
#include "ui/preferences_dialog.h"
#include "ui/restore_label.h"
#include "ui/restore_model_dialog.h"
#include "ui/theme_manager.h"
#include "ui/translation_controller.h"

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
#include <QScreen>
#include <QSerialPortInfo>
#include <QSignalBlocker>
#include <QSlider>
#include <QSpinBox>
#include <QStatusBar>
#include <QTreeWidget>

#include <cmath>
#include <utility>

namespace {

/// The two ControlTabWidget tabs, in the order the .ui declares them.
constexpr int kServoTabIndex = 0;
constexpr int kMitTabIndex = 1;

/// The two DeviceList columns, in the order the .ui declares them.
constexpr int kDeviceModelColumn = 0;
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
/// Width the logo is scaled to; the label itself is 100 px wide before the first
/// layout pass, so this is what the logo has always been shown at on start-up.
constexpr int kLogoWidth = 120;
/// After flashing the drive is reset by OpenOCD and, like after APPLY, ignores its
/// input for a second or so; the reconnect is retried at this pace until the window
/// has passed, which also covers a USB re-enumeration of the port.
constexpr int kFlashReconnectRetryMs = 500;
constexpr int kFlashReconnectWindowMs = 15000;

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
constexpr int kPortComboChars = 10;

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

    // The one action each panel is for gets the accent; every other button stays
    // quiet (see buttonStyle() in ThemeManager). STOP is styled by its object name.
    for (QPushButton *button : { ui->SerialConnectBtn, ui->CanConnectBtn, ui->WriteRegBtn,
                                 ui->ServoUserStartBtn, ui->ServoSinStartBtn,
                                 ui->ServoMeanderStartBtn, ui->ServoTriangleStartBtn,
                                 ui->MitStartBtn })
        button->setProperty("variant", "primary");

    // Link state on the left, transient messages on the right.
    m_connectionStatusLabel = new QLabel(this);
    statusBar()->addWidget(m_connectionStatusLabel);
    showConnectionBadge(false, tr("Not connected"));

    m_statusMessageLabel = new QLabel(this);
    m_statusMessageLabel->setProperty("role", "caption");
    m_statusMessageLabel->setAlignment(Qt::AlignRight | Qt::AlignVCenter);
    statusBar()->addPermanentWidget(m_statusMessageLabel, 1);
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
    m_serial = new SerialService(this);
    m_cyphal = new CyphalService(this);
    m_downloader = new FirmwareDownloader(this);
    m_flasher = new FirmwareFlasher(this);

    m_serial->start();

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

    connect(m_devices, &DeviceManager::listChanged, this, &MainWindow::rebuildDeviceList);
    connect(m_devices, &DeviceManager::selectionChanged, this, &MainWindow::onDeviceSelected);

    connect(m_control, &ControlManager::setpointProduced, this,
            &MainWindow::onSetpointProduced);
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
}

// --- settings, theme and language ----------------------------------------------------

void MainWindow::loadSettings()
{
    m_configPath = ConfigManager::resolveConfigFilePath();
    m_config = ConfigManager::loadConfig(m_configPath);

    {
        const QSignalBlocker blocker(ui->LanguageComboBox);
        ui->LanguageComboBox->setCurrentIndex(LanguageManager::comboIndexForLanguage(
                LanguageManager::effectiveLanguage(m_config.ui.language)));
    }

    applyUiSettings();

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
    m_config.ui.language = LanguageManager::languageForComboIndex(
            ui->LanguageComboBox->currentIndex());

    QString error;
    if (!ConfigManager::saveConfig(m_configPath, m_config, &error))
        setStatusMessage(error);
}

void MainWindow::applyUiSettings()
{
    ThemeManager::applyApplicationTheme(*qApp, m_config.ui);
    m_plot->applySettings(m_config.ui);
    m_plot->applyTheme(m_config.ui.theme);

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
    setPlotLive(m_plot->isLiveMode());
    // A new font size changes how wide the captions are.
    lockConnectButtonWidths();
    updateServoTargetLabel();
}

void MainWindow::updateLogo()
{
    // A fixed width: scaling to the label's current width would grow the logo
    // every time the theme is switched, since the label expands to fit the pixmap.
    const QPixmap logo = ThemeManager::logo(m_config.ui.theme, kLogoWidth);
    if (!logo.isNull())
        ui->LogoLabel->setPixmap(logo);
}

void MainWindow::applyLanguageFromCombo()
{
    const QString language =
            LanguageManager::languageForComboIndex(ui->LanguageComboBox->currentIndex());
    m_config.ui.language = language;
    if (m_translation)
        m_translation->applyConfiguredLanguage(language);
    // Widgets get QEvent::LanguageChange; everything else is retranslated by hand.
    retranslateDynamicTexts();
    saveSettings();
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
    updateServoTargetLabel();

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
            m_link->writeRegisters(device->nodeId(),
                                   {{QString::fromLatin1(registers::kIsOn),
                                     RegisterValue::fromBool(false)}});
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

    // CAN
    add(registers::kNodeId, ui->NodeIdLineEdit, ui->RestoreNodeIdLbl);
    add(registers::kDataBaud, ui->DataBaudComboBox, ui->RestoreDataBaudLbl);
    add(registers::kNominalBaud, ui->NomBaudComboBox, ui->RestoreNomBaudLbl);

    // Advanced
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
        edit->setText(unset ? QString() : QString::number(static_cast<qint64>(qRound(native))));
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
        m_link->writeRegisters(SerialService::kSerialNodeId,
                               {{QString::fromLatin1(registers::kIsOn),
                                 RegisterValue::fromBool(false)}});
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
            m_link->writeRegisters(device->nodeId(),
                                   {{QString::fromLatin1(registers::kIsOn),
                                     RegisterValue::fromBool(false)}});
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
        m_link->writeRegisters(nodeId, {{QString::fromLatin1(registers::kIsOn),
                                         RegisterValue::fromBool(true)}});
        m_link->readRegisters(nodeId, configNames);
        m_link->readRegisters(nodeId, {QString::fromLatin1(registers::kFirmwareRev),
                                       QString::fromLatin1(registers::kModel),
                                       QString::fromLatin1(registers::kGear)});
        m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
    }

    if (kind == LinkKind::Serial)
        m_serial->setLogStreaming(true);  // 100 Hz `state:` telemetry

    m_statusTimer.start();
    m_pollTimer.start();
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
    m_runningLocks.clear();
    m_driveNotCalibrated = false;
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

    // Only the row of the chosen transport is usable, and while a link is up the
    // rest of CONNECTION is locked to its own control.
    const bool serialChosen = ui->SerialRadioBtn->isChecked();
    const bool serialRow = !connected && serialChosen;
    const bool canRow = !connected && !serialChosen;
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
    // flashing goes over SWD, not over the link, and has to work on a drive that
    // cannot answer at all - one with no firmware on it yet, say.
    for (int i = 0; i < ui->ConfigTabWidget->count(); ++i) {
        ui->ConfigTabWidget->setTabEnabled(
                i, connected || ui->ConfigTabWidget->widget(i) == ui->SystemTab);
    }
    ui->RegisterParamsGroupBox->setEnabled(connected);
    updateRegisterActionButtons();

    // Calibration is Serial-only. Flashing is Serial or no link at all; over CAN it
    // stays off, as the reconnect after a flash is a Serial affair.
    ui->CalibrateBtn->setEnabled(serial);
    ui->SensorGroupBox->setEnabled(serial);
    ui->FirmwareGroupBox->setEnabled(flashingAvailable());
    ui->OpenHexPushButton->setEnabled(flashingAvailable()
                                      && ui->ChooseFirmwareFileRadioButton->isChecked());

    // Always available, connection or not.
    ui->SavePltCsvBtn->setEnabled(true);
    ui->SavePltPngBtn->setEnabled(true);
    // Disconnecting pauses the plot and nothing can resume it until a drive is
    // back, so the button only makes sense while connected.
    ui->PausePltBtn->setEnabled(connected);
    ui->SignalComboBox->setEnabled(true);
    ui->UnitsComboBox->setEnabled(true);
    ui->LanguageComboBox->setEnabled(true);
    ui->PreferencesBtn->setEnabled(true);

    onServoControlTypeChanged();
    updateControlLock();
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
    // The model name takes the slack; the id column is only ever a few digits wide.
    header->setSectionResizeMode(kDeviceModelColumn, QHeaderView::Stretch);
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
        item->setText(kDeviceModelColumn, device->displayName());
        item->setText(kDeviceCanIdColumn,
                      canId >= 0 ? QString::number(canId) : QStringLiteral("-"));
        item->setTextAlignment(kDeviceCanIdColumn, Qt::AlignRight | Qt::AlignVCenter);
        item->setData(kDeviceModelColumn, Qt::UserRole, device->nodeId());
        if (!device->isOnline()) {
            item->setText(kDeviceModelColumn,
                          item->text(kDeviceModelColumn) + tr("  (no heartbeat)"));
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
        placeholder->setText(kDeviceModelColumn, tr("No actuators found - press refresh"));
        placeholder->setFlags(Qt::NoItemFlags);
        placeholder->setForeground(kDeviceModelColumn, QColor(0x94, 0xA3, 0xB8));
        placeholder->setTextAlignment(kDeviceModelColumn, Qt::AlignCenter);
        ui->DeviceList->addTopLevelItem(placeholder);
        // The message is about the list, not about one column of it.
        placeholder->setFirstColumnSpanned(true);
    }
    m_rebuildingDeviceList = false;
}

void MainWindow::onDeviceListSortRequested(int column)
{
    const auto key = (column == kDeviceCanIdColumn) ? DeviceManager::SortKey::CanId
                                                    : DeviceManager::SortKey::Model;
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
            : kDeviceModelColumn;
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
            static_cast<quint8>(item->data(kDeviceModelColumn, Qt::UserRole).toUInt());
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
        const RegisterWrites writes = pendingWrites(device);
        if (m_link && !writes.isEmpty())
            writeConfigToDrive(device, writes);
    }
    return true;
}

void MainWindow::onDeviceSelected(DeviceModel *device)
{
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

    const RegisterWrites writes = pendingWrites(device);
    if (writes.isEmpty()) {
        setStatusMessage(tr("No changes to write."));
        return;
    }
    writeConfigToDrive(device, writes);
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

    // The drive discards all input for the duration, so nothing is awaited. The
    // progress bar is already in the layout, hidden, for the planned staged protocol.
    m_serial->sendBareCommand(QStringLiteral("CALIBRATE"), false);
    setStatusMessage(tr("Calibration started; the actuator will not answer until it is done."));
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
    m_link->readRegisters(nodeId, {QString::fromLatin1(registers::kModel),
                                   QString::fromLatin1(registers::kGear),
                                   QString::fromLatin1(registers::kFirmwareRev)});
    m_link->writeRegisters(nodeId, {{QString::fromLatin1(registers::kIsOn),
                                     RegisterValue::fromBool(true)}});
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

    if (name == QLatin1String(registers::kFirmwareRev))
        ui->CurFirmwareRevLabel->setText(value.toString());

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
    m_link->writeRegisters(nodeId, {{QString::fromLatin1(registers::kIsOn),
                                     RegisterValue::fromBool(true)}});
    m_link->readRegisters(nodeId, RegisterCatalog::configGroupNames());
    m_link->readRegisters(nodeId, RegisterCatalog::profileNames());
    setStatusMessage(tr("The actuator restarted with the new settings."));
}

void MainWindow::onDeviceReappeared(quint8 nodeId)
{
    DeviceModel *device = m_devices->device(nodeId);
    if (!device)
        return;
    device->setOnline(true);
    m_awaitingReconnect.remove(nodeId);
    // Resume exactly where the trajectory left off.
    m_control->setPaused(nodeId, false);
    rebuildDeviceList();
    setStatusMessage(tr("Node %1 is back.").arg(nodeId));

    if (m_link) {
        m_link->writeRegisters(nodeId, {{QString::fromLatin1(registers::kIsOn),
                                         RegisterValue::fromBool(true)}});
    }
}

// --- realtime status -------------------------------------------------------------------------

void MainWindow::onPollTick()
{
    if (!m_link)
        return;
    DeviceModel *device = m_devices->selected();
    if (!device || !device->isOnline())
        return;
    // Only the selected drive is polled; the others keep their last known values.
    m_link->readRegisters(device->nodeId(), statusRegisters());
}

void MainWindow::onStatusTick()
{
    updateStatusLabels();

    DeviceModel *device = m_devices->selected();
    if (!device)
        return;

    // Signals that are not carried by telemetry are fed from the polled registers.
    switch (m_plot->currentSignal()) {
    case PlotSignal::Temperature:
    case PlotSignal::Current:
    case PlotSignal::Encoder:
        m_plot->appendStatus(device->status());
        break;
    default:
        break;
    }
}

void MainWindow::updateStatusLabels()
{
    DeviceModel *device = m_devices->selected();
    if (!device) {
        const QString dash = QStringLiteral("--");
        ui->StatusModelLbl->setText(dash);
        ui->StatusTempMcuLbl->setText(dash);
        ui->StatusTempStatorLbl->setText(dash);
        ui->StatusBusVoltageLbl->setText(dash);
        ui->StatusAngleLbl->setText(dash);
        ui->StatusRotorEncoderLbl->setText(dash);
        ui->StatusShaftEncoderLbl->setText(dash);
        ui->FaultLabel->setText(dash);
        // Now that the panel is readable without a drive, a version left over from
        // the last one (or the .ui placeholder) must not pass for a current reading.
        ui->CurFirmwareRevLabel->setText(dash);
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

    ui->StatusModelLbl->setText(device->displayName());
    ui->StatusTempMcuLbl->setText(formatNumber(status.tempMcu, 1));
    ui->StatusTempStatorLbl->setText(formatNumber(status.tempStator, 1));
    ui->StatusBusVoltageLbl->setText(formatNumber(status.busVoltage, 2));
    ui->StatusAngleLbl->setText(formatNumber(
            units::fromRadians(device->telemetry().position, m_angleUnit), 4));
    ui->StatusRotorEncoderLbl->setText(formatNumber(status.encoderRotor, 0));
    ui->StatusShaftEncoderLbl->setText(formatNumber(status.encoderShaft, 0));
    ui->FaultLabel->setText(status.faultKnown ? (status.fault ? tr("Yes") : tr("No"))
                                              : QStringLiteral("--"));
    ui->StatusAngleUnitLbl->setText(QString::fromLatin1(units::angleSuffix(m_angleUnit)));
}

// --- control ------------------------------------------------------------------------------

void MainWindow::setupControlUi()
{
    // Servo: the control type gates which feedback gains are editable.
    for (QRadioButton *button : {ui->ServoPositionRadioBtn, ui->ServoVelocityRadioBtn,
                                 ui->ServoTorqueRadioBtn}) {
        connect(button, &QRadioButton::toggled, this, &MainWindow::onServoControlTypeChanged);
    }
    connect(ui->ServoGainsSetBtn, &QPushButton::clicked, this, &MainWindow::onServoGainsSet);
    connect(ui->TransientSetBtn, &QPushButton::clicked, this, &MainWindow::onTransientFormSet);

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
        {ui->ServoKpSlider, ui->ServoKpDoubleSpinBox},
        {ui->ServoKiSlider, ui->ServoKiDoubleSpinBox},
        {ui->ServoKdSlider, ui->ServoKdDoubleSpinBox},
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

    onMitTrajectoryChanged();
}

void MainWindow::updateServoGainEnables()
{
    // Position uses all three gains, Velocity only Kp and Ki, Torque none at all.
    // A locked servo configuration overrides all of that: nothing is editable.
    const bool unlocked = m_controlLock != ControlLock::ServoWaveform;
    const bool position = ui->ServoPositionRadioBtn->isChecked() && unlocked;
    const bool velocity = ui->ServoVelocityRadioBtn->isChecked() && unlocked;
    const bool anyGains = position || velocity;

    ui->ServoKpDoubleSpinBox->setEnabled(anyGains);
    ui->ServoKpSlider->setEnabled(anyGains);
    ui->ServoKiDoubleSpinBox->setEnabled(anyGains);
    ui->ServoKiSlider->setEnabled(anyGains);
    ui->ServoKdDoubleSpinBox->setEnabled(position);
    ui->ServoKdSlider->setEnabled(position);
    ui->ServoGainsSetBtn->setEnabled(anyGains);
}

void MainWindow::onServoControlTypeChanged()
{
    updateServoGainEnables();
    updateServoTargetLabel();
    updateControlSliderRanges();
    onControlParamsEdited();
}

void MainWindow::updateServoTargetLabel()
{
    const QString velocity = tr("Target vel:");
    const QString torque = tr("Target torq:");
    const QString position = tr("Target pos:");

    // The label is sized for the widest of the three captions, so switching the
    // control type does not shift the panel around it. Re-measured every time for
    // the same reason as lockConnectButtonWidths(): language and font size change.
    QLabel *label = ui->ServoUserTargetLbl;
    label->setMinimumWidth(0);
    label->setMaximumWidth(QWIDGETSIZE_MAX);
    int widest = 0;
    for (const QString &caption : {velocity, torque, position}) {
        label->setText(caption);
        widest = qMax(widest, label->sizeHint().width());
    }
    label->setFixedWidth(widest);

    if (ui->ServoVelocityRadioBtn->isChecked())
        label->setText(velocity);
    else if (ui->ServoTorqueRadioBtn->isChecked())
        label->setText(torque);
    else
        label->setText(position);
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
                           ui->FeedbackGainsGroupBox}) {
        const QList<QWidget *> children = box->findChildren<QWidget *>();
        for (QWidget *child : children)
            child->setEnabled(!servoLocked);
    }
    // Unlocking hands the gains back to the control type rather than to everything.
    updateServoGainEnables();

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
    const bool registers = m_link && m_link->isConnected() && m_controlLock == ControlLock::None;
    ui->ReadRegBtn->setEnabled(registers);
    ui->WriteRegBtn->setEnabled(registers);
    ui->SetOriginBtn->setEnabled(registers);
}

bool MainWindow::flashingAvailable() const
{
    return !(m_link && m_link->isConnected() && m_link->kind() == LinkKind::Can);
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
    constexpr double kTorque = 25.0;
    constexpr double kMaxKp = 64.0;
    constexpr double kMaxKi = 1.0;
    constexpr double kMaxKd = 10.0;
    constexpr double kMaxFrequency = 40.0;

    const auto spanFor = [&](bool velocityMode, bool torqueMode) {
        return torqueMode ? kTorque : velocityMode ? velocity : angle;
    };
    const double servoSpan = spanFor(ui->ServoVelocityRadioBtn->isChecked(),
                                     ui->ServoTorqueRadioBtn->isChecked());
    const double mitSpan = spanFor(ui->MitTrajVelocityRadioBtn->isChecked(),
                                   ui->MitTrajTorqueRadioBtn->isChecked());

    setSliderRange(ui->ServoKpSlider, ui->ServoKpDoubleSpinBox, 0.0, kMaxKp);
    setSliderRange(ui->ServoKiSlider, ui->ServoKiDoubleSpinBox, 0.0, kMaxKi);
    setSliderRange(ui->ServoKdSlider, ui->ServoKdDoubleSpinBox, 0.0, kMaxKd);
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
    else
        params.servoType = ServoControlType::Position;

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

void MainWindow::onServoGainsSet()
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    RegisterWrites writes;
    if (ui->ServoPositionRadioBtn->isChecked()) {
        writes.append({QString::fromLatin1(registers::kServoPosP),
                       RegisterValue::fromReal32(ui->ServoKpDoubleSpinBox->value())});
        writes.append({QString::fromLatin1(registers::kServoPosI),
                       RegisterValue::fromReal32(ui->ServoKiDoubleSpinBox->value())});
        writes.append({QString::fromLatin1(registers::kServoPosD),
                       RegisterValue::fromReal32(ui->ServoKdDoubleSpinBox->value())});
    } else if (ui->ServoVelocityRadioBtn->isChecked()) {
        writes.append({QString::fromLatin1(registers::kServoVelP),
                       RegisterValue::fromReal32(ui->ServoKpDoubleSpinBox->value())});
        writes.append({QString::fromLatin1(registers::kServoVelI),
                       RegisterValue::fromReal32(ui->ServoKiDoubleSpinBox->value())});
    } else {
        return;  // torque control has no feedback gains
    }

    m_link->writeRegisters(device->nodeId(), writes);
    setStatusMessage(tr("Feedback gains written."));
}

void MainWindow::onTransientFormSet()
{
    DeviceModel *device = m_devices->selected();
    if (!m_link || !device)
        return;

    const auto form = ui->TransientPolynomialRadioBtn->isChecked() ? TransientForm::Polynomial
                                                                   : TransientForm::Linear;
    const RegisterWrites writes = {
        {QString::fromLatin1(registers::kServoTransientForm),
         RegisterValue::fromUInt32(static_cast<quint32>(form))},
        {QString::fromLatin1(registers::kServoTransientVel),
         RegisterValue::fromReal32(
                 units::toRadians(ui->TransientVelDoubleSpinBox->value(), m_angleUnit))},
    };
    m_link->writeRegisters(device->nodeId(), writes);
    setStatusMessage(tr("Transient form written."));
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
        m_link->writeRegisters(device->nodeId(), {{QString::fromLatin1(registers::kIsOn),
                                                   RegisterValue::fromBool(false)}});
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

void MainWindow::onSetpointProduced(quint8 nodeId, const TrajectoryOutput &output)
{
    DeviceModel *device = m_devices->selected();
    if (!device || device->nodeId() != nodeId)
        return;
    // Native units: the plot scales the set-point together with the sample it is
    // drawn against.
    m_plot->appendSetpoint(output.primary, output.primaryType, output.t_us);
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

    connect(ui->SignalComboBox, &QComboBox::currentIndexChanged, this,
            &MainWindow::onSignalChanged);
    connect(ui->UnitsComboBox, &QComboBox::currentIndexChanged, this,
            &MainWindow::onUnitsChanged);
    connect(ui->LanguageComboBox, &QComboBox::currentIndexChanged, this,
            &MainWindow::applyLanguageFromCombo);
    connect(ui->PausePltBtn, &QPushButton::clicked, this, &MainWindow::onPausePlot);
    connect(ui->SavePltCsvBtn, &QPushButton::clicked, this, &MainWindow::onSavePlotCsv);
    connect(ui->SavePltPngBtn, &QPushButton::clicked, this, &MainWindow::onSavePlotPng);

    connect(ui->PreferencesBtn, &QPushButton::clicked, this, [this] {
        PreferencesDialog dialog(this);
        dialog.setConfig(m_config);
        connect(&dialog, &PreferencesDialog::configApplied, this,
                [this](const AppConfig &config) {
                    m_config = config;
                    applyUiSettings();
                    saveSettings();
                });
        dialog.exec();
    });
}

void MainWindow::onSignalChanged()
{
    m_plot->setSignal(static_cast<PlotSignal>(ui->SignalComboBox->currentIndex()));
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
        ui->TransientVelDoubleSpinBox,
    };
    if (!ui->ServoTorqueRadioBtn->isChecked()) {
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
}

void MainWindow::onSavePlotCsv()
{
    const QString path = QFileDialog::getSaveFileName(this, tr("Save plot data"), QString(),
                                                      tr("CSV files (*.csv)"));
    if (path.isEmpty())
        return;
    QString error;
    if (!m_plot->saveCsv(path, &error))
        showError(tr("Could not save the CSV"), error);
    else
        setStatusMessage(tr("Plot data saved."));
}

void MainWindow::onSavePlotPng()
{
    const QString path = QFileDialog::getSaveFileName(this, tr("Save plot image"), QString(),
                                                      tr("PNG images (*.png)"));
    if (path.isEmpty())
        return;
    QString error;
    if (!m_plot->savePng(path, &error))
        showError(tr("Could not save the image"), error);
    else
        setStatusMessage(tr("Plot image saved."));
}

// --- firmware --------------------------------------------------------------------------------

void MainWindow::setupFirmwareUi()
{
    ui->FlashProgressBar->setValue(0);

    connect(ui->ChooseFirmwareFileRadioButton, &QRadioButton::toggled, this, [this](bool on) {
        ui->OpenHexPushButton->setEnabled(on && flashingAvailable());
    });
    connect(ui->OpenHexPushButton, &QPushButton::clicked, this, &MainWindow::onOpenHexFile);
    connect(ui->FlashPushButton, &QPushButton::clicked, this, &MainWindow::onFlashClicked);
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

void MainWindow::onFlashClicked()
{
    if (ui->DownloadFirmwareRadioButton->isChecked()) {
        ui->FlashPushButton->setEnabled(false);
        m_downloader->downloadLatest(FirmwareDownloader::firmwareDirectory());
        return;
    }

    if (m_selectedHexPath.isEmpty()) {
        showError(tr("No firmware selected"),
                  tr("Choose a .hex file first, or switch to downloading the latest release."));
        return;
    }
    ui->FlashPushButton->setEnabled(false);
    startFlashing(m_selectedHexPath);
}

void MainWindow::startFlashing(const QString &hexPath)
{
    // OpenOCD drives the target over SWD while the application holds the UART. The
    // drive is disabled first so it is not spinning while its flash is rewritten,
    // and the status polling pauses: a halted core answers nothing.
    m_flashSerialPort.clear();
    if (m_link && m_link->isConnected()) {
        m_control->stopAll();
        m_pollTimer.stop();
        m_link->writeRegisters(activeNodeId(), {{QString::fromLatin1(registers::kIsOn),
                                                 RegisterValue::fromBool(false)}});
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
