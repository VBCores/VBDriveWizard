#include "ui/preferences_dialog.h"

#include "ui_preferences_dialog.h"

#include <QAbstractButton>
#include <QDialogButtonBox>
#include <QEvent>
#include <QIcon>
#include <QPushButton>
#include <QStyle>

PreferencesDialog::PreferencesDialog(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::PreferencesDialog)
{
    ui->setupUi(this);

    ui->ThemeComboBox->setItemData(0, QStringLiteral("dark"));
    ui->ThemeComboBox->setItemData(1, QStringLiteral("light"));

    ui->OpenocdInterfaceLineEdit->setToolTip(
            tr("OpenOCD interface script, relative to its scripts directory.\n"
               "VBDrive is programmed over SWD with an ST-Link."));
    ui->OpenocdTargetLineEdit->setToolTip(
            tr("OpenOCD target script. VBDrive uses an STM32G431VB."));
    ui->LocalNodeIdSpinBox->setToolTip(
            tr("Node ID this application announces on the CAN bus.\n"
               "It must not collide with any drive."));

    // The platform style decorates standard buttons with icons; keep them text-only.
    for (QAbstractButton *button : ui->ButtonBox->buttons())
        button->setIcon(QIcon());
    // A dynamic property set after the button was polished only reaches the
    // stylesheet on a repolish.
    QPushButton *ok = ui->ButtonBox->button(QDialogButtonBox::Ok);
    ok->setProperty("variant", "primary");
    ok->style()->unpolish(ok);
    ok->style()->polish(ok);

    connect(ui->ButtonBox, &QDialogButtonBox::accepted, this, [this] {
        applyChanges();
        accept();
    });
    connect(ui->ButtonBox, &QDialogButtonBox::rejected, this, &QDialog::reject);
    connect(ui->ButtonBox, &QDialogButtonBox::clicked, this, [this](QAbstractButton *button) {
        if (ui->ButtonBox->standardButton(button) == QDialogButtonBox::Apply)
            applyChanges();
    });
}

PreferencesDialog::~PreferencesDialog()
{
    delete ui;
}

void PreferencesDialog::setConfig(const AppConfig &config)
{
    m_config = config;
    const UiSettings &settings = config.ui;

    const int themeIndex = ui->ThemeComboBox->findData(settings.theme.toLower());
    ui->ThemeComboBox->setCurrentIndex(themeIndex >= 0 ? themeIndex : 0);

    ui->FontSizeSpinBox->setValue(settings.font_size);
    ui->PlotFontSizeSpinBox->setValue(settings.plot_font_size);
    ui->PlotLineWidthSpinBox->setValue(settings.plot_line_width);
    ui->PlotTimeWindowSpinBox->setValue(settings.plot_time_window_s);
    ui->PlotDrawRateSpinBox->setValue(settings.plot_draw_rate_hz);
    ui->LocalNodeIdSpinBox->setValue(settings.local_node_id);
    ui->SerialBaudSpinBox->setValue(settings.serial_baud);
    ui->OpenocdInterfaceLineEdit->setText(settings.openocd_interface);
    ui->OpenocdTargetLineEdit->setText(settings.openocd_target);
}

void PreferencesDialog::applyChanges()
{
    // Every editor is range-constrained by the widget itself, so there is nothing to
    // reject here; the language setting is intentionally left untouched.
    UiSettings &settings = m_config.ui;
    settings.theme = ui->ThemeComboBox->currentData().toString();
    settings.font_size = ui->FontSizeSpinBox->value();
    settings.plot_font_size = ui->PlotFontSizeSpinBox->value();
    settings.plot_line_width = ui->PlotLineWidthSpinBox->value();
    settings.plot_time_window_s = ui->PlotTimeWindowSpinBox->value();
    settings.plot_draw_rate_hz = ui->PlotDrawRateSpinBox->value();
    settings.local_node_id = ui->LocalNodeIdSpinBox->value();
    settings.serial_baud = ui->SerialBaudSpinBox->value();
    settings.openocd_interface = ui->OpenocdInterfaceLineEdit->text().trimmed();
    settings.openocd_target = ui->OpenocdTargetLineEdit->text().trimmed();

    emit configApplied(m_config);
}

void PreferencesDialog::changeEvent(QEvent *event)
{
    QDialog::changeEvent(event);
    if (event->type() == QEvent::LanguageChange)
        ui->retranslateUi(this);
}
