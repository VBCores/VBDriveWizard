#include "ui/save_file_dialog.h"

#include "ui_save_file_dialog.h"

#include "ui/plot_export.h"

#include <QAbstractButton>
#include <QDialogButtonBox>
#include <QDir>
#include <QEvent>
#include <QFileDialog>
#include <QIcon>
#include <QPushButton>
#include <QStandardItemModel>
#include <QStandardPaths>
#include <QStyle>

namespace {

/// Combo order in save_file_dialog.ui, which is also the on-screen order.
constexpr int kFormatPng = 0;
constexpr int kFormatJpg = 1;
constexpr int kFormatSvg = 2;
constexpr int kFormatCsv = 3;

QString extensionFor(SaveFileDialog::Format format)
{
    switch (format) {
    case SaveFileDialog::Format::Png:
        return QStringLiteral("png");
    case SaveFileDialog::Format::Jpg:
        return QStringLiteral("jpg");
    case SaveFileDialog::Format::Svg:
        return QStringLiteral("svg");
    case SaveFileDialog::Format::Csv:
        return QStringLiteral("csv");
    }
    return QStringLiteral("png");
}

} // namespace

SaveFileDialog::SaveFileDialog(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::SaveFileDialog)
{
    ui->setupUi(this);

    // The platform style decorates standard buttons with icons; keep them text-only.
    for (QAbstractButton *button : ui->ButtonBox->buttons())
        button->setIcon(QIcon());
    // A dynamic property set after the button was polished only reaches the
    // stylesheet on a repolish.
    QPushButton *ok = ui->ButtonBox->button(QDialogButtonBox::Ok);
    ok->setProperty("variant", "primary");
    ok->style()->unpolish(ok);
    ok->style()->polish(ok);

    connect(ui->ButtonBox, &QDialogButtonBox::accepted, this, &QDialog::accept);
    connect(ui->ButtonBox, &QDialogButtonBox::rejected, this, &QDialog::reject);
    connect(ui->BrowseBtn, &QPushButton::clicked, this, &SaveFileDialog::browse);
    connect(ui->FormatComboBox, &QComboBox::currentIndexChanged, this,
            &SaveFileDialog::updateEnabledState);

    // Offered only when this build can write it, rather than failing after the
    // user has picked a path.
    if (!plot_export::svgSupported()) {
        if (auto *model = qobject_cast<QStandardItemModel *>(ui->FormatComboBox->model())) {
            QStandardItem *item = model->item(kFormatSvg);
            item->setEnabled(false);
            item->setToolTip(tr("This build was compiled without the Qt SVG module."));
        }
    }

    updateEnabledState();
}

SaveFileDialog::~SaveFileDialog()
{
    delete ui;
}

void SaveFileDialog::setTheme(const QString &theme)
{
    ui->ThemeComboBox->setCurrentIndex(
            theme.compare(QLatin1String("dark"), Qt::CaseInsensitive) == 0 ? 1 : 0);
}

void SaveFileDialog::setSuggestedName(const QString &name)
{
    m_suggestedName = name;
    if (!ui->PathLineEdit->text().isEmpty())
        return;

    const QString dir =
            QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation);
    ui->PathLineEdit->setText(
            QDir(dir).filePath(name + QLatin1Char('.') + extensionFor(selectedFormat())));
}

SaveFileDialog::Format SaveFileDialog::selectedFormat() const
{
    switch (ui->FormatComboBox->currentIndex()) {
    case kFormatJpg:
        return Format::Jpg;
    case kFormatSvg:
        return Format::Svg;
    case kFormatCsv:
        return Format::Csv;
    case kFormatPng:
    default:
        return Format::Png;
    }
}

void SaveFileDialog::updateEnabledState()
{
    const Format format = selectedFormat();

    // A vector image has no raster resolution, and a CSV is data rather than a
    // picture, so neither takes a DPI; a CSV has no theme either.
    const bool rasterImage = (format == Format::Png || format == Format::Jpg);
    const bool image = (rasterImage || format == Format::Svg);

    ui->DpiComboBox->setEnabled(rasterImage);
    ui->DpiLabel->setEnabled(rasterImage);
    ui->ThemeComboBox->setEnabled(image);
    ui->ThemeLabel->setEnabled(image);
}

void SaveFileDialog::browse()
{
    const QString extension = extensionFor(selectedFormat());
    const QString current = ui->PathLineEdit->text();
    const QString start = current.isEmpty()
            ? QDir(QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation))
                      .filePath(m_suggestedName + QLatin1Char('.') + extension)
            : current;
    // Overwriting is confirmed once, by the caller, whether the path was browsed for
    // or typed.
    const QString path = QFileDialog::getSaveFileName(
            this, tr("Save Plot"), start,
            tr("%1 files (*.%2)").arg(extension.toUpper(), extension), nullptr,
            QFileDialog::DontConfirmOverwrite);
    if (!path.isEmpty())
        ui->PathLineEdit->setText(path);
}

SaveFileDialog::Options SaveFileDialog::options() const
{
    Options options;
    options.path = ui->PathLineEdit->text().trimmed();
    options.format = selectedFormat();
    options.theme = ui->ThemeComboBox->currentIndex() == 1 ? QStringLiteral("dark")
                                                           : QStringLiteral("light");
    options.dpi = ui->DpiComboBox->currentText().toInt();
    if (options.dpi <= 0)
        options.dpi = 150;
    return options;
}

void SaveFileDialog::changeEvent(QEvent *event)
{
    QDialog::changeEvent(event);
    if (event->type() == QEvent::LanguageChange)
        ui->retranslateUi(this);
}
