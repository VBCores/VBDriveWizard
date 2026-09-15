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

#include <QApplication>
#include <QCheckBox>
#include <QCloseEvent>
#include <QComboBox>
#include <QDir>
#include <QDoubleSpinBox>
#include <QFileDialog>
#include <QLabel>
#include <QLineEdit>
#include <QListWidgetItem>
#include <QMenu>
#include <QMessageBox>
#include <QScreen>
#include <QSerialPortInfo>
#include <QSignalBlocker>
#include <QSlider>
#include <QSpinBox>
#include <QStatusBar>

#include <cmath>
#include <utility>

namespace {

/// STATUS refresh rate required by the spec.
constexpr int kStatusRefreshHz = 20;
/// Rate at which the read-only status registers are re-read. They are service calls
/// on CAN and round trips on Serial, so they are polled far slower than the labels
/// are repainted; the labels simply show the most recent values.
constexpr int kRegisterPollHz = 5;
/// Longest the window waits for the link to shut down on close before giving up;
/// the Serial drain itself is bounded at 2 s by the service.
constexpr int kCloseFallbackMs = 3000;

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

/// ang_dir is +1 or -1; the combo shows it as a rotation direction.
constexpr int kDirectionCcw = 1;
constexpr int kDirectionCw = -1;

QString formatNumber(double value, int decimals)
{
    if (std::isnan(value))
        return QStringLiteral("--");
    return QString::number(value, 'f', decimals);
}

} // namespace

MainWindow::MainWindow(TranslationController *translationController, QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
    , m_translation(translationController)
{
    ui->setupUi(this);

    m_connectionStatusLabel = new QLabel(this);
    statusBar()->addPermanentWidget(m_connectionStatusLabel);

    setupServices();
    setupRegisterBindings();
    setupConnectionUi();
    setupConfigUi();
    setupControlUi();
    setupPlotUi();
    setupFirmwareUi();
    setupDeviceListUi();

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
                    handleConnected(LinkKind::Serial);
                    setStatusMessage(message);
                } else {
                    m_serial->closeLink();
                    setLink(nullptr);
                    updateUiState();
                    showError(tr("Connection failed"), message);
                }
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

    connect(m_devices, &DeviceManager::listChanged, this, &MainWindow::rebuildDeviceList);
    connect(m_devices, &DeviceManager::selectionChanged, this, &MainWindow::onDeviceSelected);

    connect(m_control, &ControlManager::setpointProduced, this,
            &MainWindow::onSetpointProduced);
    connect(m_control, &ControlManager::runningChanged, this,
            &MainWindow::onTrajectoryRunningChanged);

    connect(m_downloader, &FirmwareDownloader::progress, this,
            [this](int percent, const QString &stage) {
                ui->FlashProgressBar->setValue(percent);
                setStatusMessage(stage);
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
                    setStatusMessage(stage);
            });
    connect(m_flasher, &FirmwareFlasher::output, this,
            [this](const QString &line) { m_plot->appendLogLine(line); });
    connect(m_flasher, &FirmwareFlasher::finished, this,
            [this](bool ok, const QString &message) {
                ui->FlashPushButton->setEnabled(true);
                if (ok) {
                    ui->FlashProgressBar->setValue(100);
                    setStatusMessage(message);
                    // The drive reboots into the new image, so the revision is stale.
                    if (m_link)
                        m_link->readRegister(activeNodeId(),
                                             QString::fromLatin1(registers::kFirmwareRev));
                } else {
                    ui->FlashProgressBar->setValue(0);
                    showError(tr("Flashing failed"), message);
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

    m_serial->setTelemetryBatchIntervalMs(
            qBound(10, 1000 / qMax(1, m_config.ui.plot_draw_rate_hz), 100));
    updateLogo();
}

void MainWindow::updateLogo()
{
    const QPixmap logo(ThemeManager::logoPath(m_config.ui.theme));
    if (logo.isNull())
        return;
    ui->LogoLabel->setPixmap(
            logo.scaledToWidth(qMax(120, ui->LogoLabel->width()), Qt::SmoothTransformation));
    ui->LogoLabel->setText(QString());
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

    ui->PausePltBtn->setText(m_plot->isLiveMode() ? tr("Pause") : tr("Resume"));

    if (!connected)
        m_connectionStatusLabel->setText(tr("Not connected"));

    updateStatusLabels();
    rebuildDeviceList();
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
                tr("Some register changes have not been written to the drive.\n"
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

void MainWindow::setStatusMessage(const QString &message, int timeoutMs)
{
    statusBar()->showMessage(message, timeoutMs);
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
    add(registers::kAngleDirection, ui->DirComboBox, ui->RestoreDirLbl, ui->DirCheckBox);

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
    connect(ui->SerialRefreshBtn, &QPushButton::clicked, this, &MainWindow::refreshSerialPorts);
    connect(ui->CanRefreshBtn, &QPushButton::clicked, this, &MainWindow::refreshCanInterfaces);
    connect(ui->SerialConnectBtn, &QPushButton::clicked, this,
            &MainWindow::onSerialConnectClicked);
    connect(ui->CanConnectBtn, &QPushButton::clicked, this, &MainWindow::onCanConnectClicked);
    connect(ui->SerialRadioBtn, &QRadioButton::toggled, this, [this] { updateUiState(); });
}

void MainWindow::refreshSerialPorts()
{
    const QString previous = ui->SerialCombo->currentData().toString();
    ui->SerialCombo->clear();
    for (const QSerialPortInfo &info : QSerialPortInfo::availablePorts()) {
        const QString label = info.description().isEmpty()
                ? info.portName()
                : QStringLiteral("%1 (%2)").arg(info.portName(), info.description());
        ui->SerialCombo->addItem(label, info.portName());
    }
    const int index = ui->SerialCombo->findData(previous);
    if (index >= 0)
        ui->SerialCombo->setCurrentIndex(index);
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
    setStatusMessage(tr("Listening for drives on %1...").arg(interfaceName));
    m_cyphal->connectToInterface(interfaceName,
                                 static_cast<quint8>(m_config.ui.local_node_id));
}

void MainWindow::handleConnected(LinkKind kind)
{
    if (!m_link || !m_link->isConnected())
        return;  // closed again before the handshake was reported

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
    m_connectionStatusLabel->setText(kind == LinkKind::Serial ? tr("Serial connected")
                                                              : tr("CAN connected"));
    updateUiState();
}

void MainWindow::handleDisconnected()
{
    m_control->stopAll();
    m_statusTimer.stop();
    m_pollTimer.stop();
    m_devices->clear();
    m_awaitingReconnect.clear();
    setLink(nullptr);
    m_connectionStatusLabel->setText(tr("Not connected"));
    setStatusMessage(tr("Disconnected."));
    updateUiState();

    if (m_closePending)
        close();  // closeEvent() deferred the close until the link was down
}

void MainWindow::updateUiState()
{
    const bool connected = m_link && m_link->isConnected();
    const bool serial = connected && m_link->kind() == LinkKind::Serial;
    const bool can = connected && m_link->kind() == LinkKind::Can;

    // Before a connection only the plot controls and the two global combo boxes are
    // usable; everything else needs a drive.
    ui->ConfigGroupBox->setEnabled(connected);
    ui->ControlGroupBox->setEnabled(connected);
    ui->StatusGroupBox->setEnabled(connected);
    ui->EmergStopPushButton->setEnabled(connected);
    ui->DevicesGroupBox->setEnabled(can);

    // While a link is up, the rest of CONNECTION is locked to its own control.
    ui->SerialRadioBtn->setEnabled(!connected);
    ui->CanRadioBtn->setEnabled(!connected);
    ui->SerialCombo->setEnabled(!connected);
    ui->CanCombo->setEnabled(!connected);
    ui->SerialRefreshBtn->setEnabled(!connected);
    ui->CanRefreshBtn->setEnabled(!connected);
    ui->SerialConnectBtn->setEnabled(!connected || serial);
    ui->CanConnectBtn->setEnabled(!connected || can);
    ui->SerialConnectBtn->setText(serial ? tr("Disconnect") : tr("Connect"));
    ui->CanConnectBtn->setText(can ? tr("Disconnect") : tr("Connect"));

    // The CAN bit rates are drive registers that the firmware only exposes for
    // editing over Serial, per the spec.
    ui->DataBaudComboBox->setEnabled(serial);
    ui->NomBaudComboBox->setEnabled(serial);

    // Calibration and firmware flashing are Serial-only.
    ui->CalibrateBtn->setEnabled(serial);
    ui->FirmwareGroupBox->setEnabled(serial);
    ui->OpenHexPushButton->setEnabled(serial && ui->ChooseFirmwareFileRadioButton->isChecked());

    // Always available, connection or not.
    ui->SavePltCsvBtn->setEnabled(true);
    ui->SavePltPngBtn->setEnabled(true);
    ui->PausePltBtn->setEnabled(true);
    ui->SignalComboBox->setEnabled(true);
    ui->UnitsComboBox->setEnabled(true);
    ui->LanguageComboBox->setEnabled(true);
    ui->PreferencesBtn->setEnabled(true);

    onServoControlTypeChanged();
}

// --- devices ---------------------------------------------------------------------------

void MainWindow::setupDeviceListUi()
{
    connect(ui->DeviceList, &QListWidget::itemSelectionChanged, this,
            &MainWindow::onDeviceListSelectionChanged);
    connect(ui->RefreshDeviceBtn, &QPushButton::clicked, this, [this] {
        if (m_link && m_link->kind() == LinkKind::Can)
            m_cyphal->rescan();
    });

    // The list widget has no header to click, so the sort key lives in a context menu.
    ui->DeviceList->setContextMenuPolicy(Qt::CustomContextMenu);
    connect(ui->DeviceList, &QListWidget::customContextMenuRequested, this,
            [this](const QPoint &pos) {
                QMenu menu(this);
                QAction *byModel = menu.addAction(tr("Sort by model"));
                QAction *byNode = menu.addAction(tr("Sort by Node ID"));
                byModel->setCheckable(true);
                byNode->setCheckable(true);
                byModel->setChecked(m_devices->sortKey() == DeviceManager::SortKey::Model);
                byNode->setChecked(m_devices->sortKey() == DeviceManager::SortKey::NodeId);
                QAction *chosen = menu.exec(ui->DeviceList->mapToGlobal(pos));
                if (chosen == byModel)
                    m_devices->setSortKey(DeviceManager::SortKey::Model);
                else if (chosen == byNode)
                    m_devices->setSortKey(DeviceManager::SortKey::NodeId);
            });
}

void MainWindow::rebuildDeviceList()
{
    m_rebuildingDeviceList = true;
    ui->DeviceList->clear();

    for (DeviceModel *device : m_devices->devices()) {
        // QListWidget has no columns, so the two fields the spec asks for are laid out
        // as padded text: model on the left, node id on the right.
        auto *item = new QListWidgetItem(
                QStringLiteral("%1\tID %2")
                        .arg(device->displayName(), -14)
                        .arg(device->nodeId()));
        item->setData(Qt::UserRole, device->nodeId());
        if (!device->isOnline()) {
            item->setText(item->text() + tr("  (no heartbeat)"));
            item->setForeground(Qt::gray);
        }
        ui->DeviceList->addItem(item);
        if (device == m_devices->selected())
            ui->DeviceList->setCurrentItem(item);
    }
    m_rebuildingDeviceList = false;
}

void MainWindow::onDeviceListSelectionChanged()
{
    if (m_rebuildingDeviceList)
        return;
    QListWidgetItem *item = ui->DeviceList->currentItem();
    if (!item)
        return;

    const auto nodeId = static_cast<quint8>(item->data(Qt::UserRole).toUInt());
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
            tr("Drive %1 has register changes that were not written.\n"
               "Write them before switching?")
                    .arg(device->displayName()),
            QMessageBox::Yes | QMessageBox::No | QMessageBox::Cancel, QMessageBox::Cancel);

    if (answer == QMessageBox::Cancel)
        return false;
    if (answer == QMessageBox::Yes) {
        RegisterWrites writes;
        for (const QString &name : device->modifiedNames())
            writes.append({name, device->editValue(name)});
        if (m_link && !writes.isEmpty())
            m_link->writeRegisters(device->nodeId(), writes);
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

    RegisterWrites writes;
    for (const QString &name : device->modifiedNames()) {
        if (RegisterCatalog::isWritable(name))
            writes.append({name, device->editValue(name)});
    }
    if (writes.isEmpty()) {
        setStatusMessage(tr("No changes to write."));
        return;
    }

    ui->WriteRegBtn->setEnabled(false);
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

    m_link->writeRegisters(device->nodeId(), {{name, RegisterValue::fromReal32(newOffset)}});
    setStatusMessage(tr("Origin set; angle offset is now %1.")
                             .arg(toDisplayUnits(name, newOffset), 0, 'f', 4));
}

void MainWindow::onCalibrate()
{
    if (!m_link || m_link->kind() != LinkKind::Serial)
        return;

    const auto answer = QMessageBox::question(
            this, tr("Calibrate sensor"),
            tr("Calibration moves the motor and cannot be cancelled. The drive stops "
               "answering until it finishes.\n\nStart calibration?"),
            QMessageBox::Yes | QMessageBox::No, QMessageBox::No);
    if (answer != QMessageBox::Yes)
        return;

    // The drive discards all input for the duration, so nothing is awaited. The
    // progress bar is already in the layout, hidden, for the planned staged protocol.
    m_serial->sendBareCommand(QStringLiteral("CALIBRATE"), false);
    setStatusMessage(tr("Calibration started; the drive will not answer until it is done."));
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
    Q_UNUSED(nodeId);
    if (ok)
        return;
    // The value stays editable and its Restore icon stays visible, so the user can
    // still get the old value back.
    setStatusMessage(tr("Could not write '%1': %2").arg(name, error));
}

void MainWindow::onWriteBatchFinished(quint8 nodeId, bool ok, const QString &error)
{
    Q_UNUSED(nodeId);
    ui->WriteRegBtn->setEnabled(true);
    if (ok) {
        // Restore icons deliberately stay visible after a successful write: the spec
        // requires the previous values to remain recoverable.
        setStatusMessage(tr("Registers written."));
        return;
    }
    if (m_closePending || !m_link) {
        // Nothing to fix any more; a modal box here would only get in the way.
        setStatusMessage(error);
        return;
    }
    showError(tr("Some registers were not written"), error);
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
    box.setWindowTitle(tr("Drive lost"));
    box.setText(tr("Drive %1 (node %2) stopped sending heartbeats.")
                        .arg(device->displayName())
                        .arg(nodeId));
    box.setInformativeText(tr("Wait for it to come back, keeping your unsaved register "
                              "changes, or drop it and discard them?"));
    QPushButton *wait = box.addButton(tr("Reconnect"), QMessageBox::AcceptRole);
    QPushButton *drop = box.addButton(tr("Remove drive"), QMessageBox::DestructiveRole);
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
    // the waveform, so switching tabs mid-run just changes the shape.
    for (QPushButton *button : {ui->ServoUserStartBtn, ui->ServoSinStartBtn,
                                ui->ServoMeanderStartBtn, ui->ServoTriangleStartBtn}) {
        connect(button, &QPushButton::clicked, this,
                [this] { onTrajectoryStart(ControlProtocol::Servo); });
    }
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
    // worker in place, without stopping the motion.
    const QList<QDoubleSpinBox *> liveSpins = {
        ui->ServoUserTargetDoubleSpinBox, ui->ServoSinAmpDoubleSpinBox,
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

    // Sliders are normalised 0..1000 handles for their spin box.
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
        connect(slider, &QSlider::valueChanged, this, [slider, spin](int position) {
            const double fraction = static_cast<double>(position) / slider->maximum();
            const double value = spin->minimum() + fraction * (spin->maximum() - spin->minimum());
            // setValue() emits valueChanged(), which drives the spin box's own
            // handlers; the reverse direction below blocks the slider, so this
            // cannot loop.
            spin->setValue(value);
        });
        connect(spin, &QDoubleSpinBox::valueChanged, this, [slider, spin](double value) {
            const double span = spin->maximum() - spin->minimum();
            if (span <= 0.0)
                return;
            const QSignalBlocker blocker(slider);
            slider->setValue(qRound((value - spin->minimum()) / span * slider->maximum()));
        });
    }

    onMitTrajectoryChanged();
}

void MainWindow::onServoControlTypeChanged()
{
    // Position uses all three gains, Velocity only Kp and Ki, Torque none at all.
    const bool position = ui->ServoPositionRadioBtn->isChecked();
    const bool velocity = ui->ServoVelocityRadioBtn->isChecked();
    const bool anyGains = position || velocity;

    ui->ServoKpDoubleSpinBox->setEnabled(anyGains);
    ui->ServoKpSlider->setEnabled(anyGains);
    ui->ServoKiDoubleSpinBox->setEnabled(anyGains);
    ui->ServoKiSlider->setEnabled(anyGains);
    ui->ServoKdDoubleSpinBox->setEnabled(position);
    ui->ServoKdSlider->setEnabled(position);
    ui->ServoGainsSetBtn->setEnabled(anyGains);

    onControlParamsEdited();
}

void MainWindow::onMitTrajectoryChanged()
{
    // Step maps one-to-one onto mit_cmd; the other shapes drive one quantity.
    const bool step = ui->MitStepRadioBtn->isChecked();
    ui->StepTargetsGroupBox->setVisible(step);
    ui->TrajectoryTargetsGroupBox->setVisible(!step);
    // "+derivative" only means anything when the waveform drives position.
    ui->MitDerivativeCheckBox->setEnabled(ui->MitTrajPositionRadioBtn->isChecked());
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
}

void MainWindow::onControlParamsEdited()
{
    DeviceModel *device = m_devices->selected();
    if (!device)
        return;
    const quint8 nodeId = device->nodeId();
    if (m_control->isRunning(nodeId))
        m_control->updateParams(nodeId, collectCurrentParams());
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
    // Every drive, not only the selected one.
    for (DeviceModel *device : m_devices->devices()) {
        m_link->writeRegisters(device->nodeId(), {{QString::fromLatin1(registers::kIsOn),
                                                   RegisterValue::fromBool(false)}});
    }
    setStatusMessage(tr("Emergency stop: all drives disabled."), 10000);
}

void MainWindow::onSetpointProduced(quint8 nodeId, const TrajectoryOutput &output)
{
    DeviceModel *device = m_devices->selected();
    if (!device || device->nodeId() != nodeId)
        return;
    const bool angular = output.primaryType == ServoControlType::Position
            || output.primaryType == ServoControlType::Velocity;
    const double displayed = angular
            ? units::fromRadians(output.primary, m_angleUnit)
            : output.primary;
    m_plot->appendSetpoint(displayed, output.primaryType);
}

void MainWindow::onTrajectoryRunningChanged(quint8 nodeId, bool running)
{
    DeviceModel *device = m_devices->selected();
    if (!device || device->nodeId() != nodeId)
        return;

    const QString label = running ? tr("Stop") : tr("Start");
    for (QPushButton *button : {ui->ServoUserStartBtn, ui->ServoSinStartBtn,
                                ui->ServoMeanderStartBtn, ui->ServoTriangleStartBtn,
                                ui->MitStartBtn}) {
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
    m_angleUnit = ui->UnitsComboBox->currentIndex() == 1 ? AngleUnit::Degrees
                                                         : AngleUnit::Radians;
    m_plot->setAngleUnit(m_angleUnit);
    // Editors hold display units, so every angular field has to be re-rendered.
    refreshAllEditors();
    updateStatusLabels();
}

void MainWindow::onPausePlot()
{
    const bool live = !m_plot->isLiveMode();
    m_plot->setLiveMode(live);
    ui->PausePltBtn->setText(live ? tr("Pause") : tr("Resume"));
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
        ui->OpenHexPushButton->setEnabled(on && m_link && m_link->kind() == LinkKind::Serial);
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
    // drive is disabled first so it is not spinning while its flash is rewritten.
    if (m_link && m_link->isConnected()) {
        m_control->stopAll();
        m_link->writeRegisters(activeNodeId(), {{QString::fromLatin1(registers::kIsOn),
                                                 RegisterValue::fromBool(false)}});
    }
    setStatusMessage(tr("Flashing %1...").arg(QFileInfo(hexPath).fileName()));
    m_flasher->flash(hexPath, m_config.ui.openocd_interface, m_config.ui.openocd_target);
}
