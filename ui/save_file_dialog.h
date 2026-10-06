#ifndef VBDW_UI_SAVE_FILE_DIALOG_H
#define VBDW_UI_SAVE_FILE_DIALOG_H

#include <QDialog>
#include <QString>

namespace Ui {
class SaveFileDialog;
}

/// Asks where and how to save the plot that is on screen. It knows nothing about
/// the plot itself: it collects the choices and the caller does the writing.
class SaveFileDialog : public QDialog
{
    Q_OBJECT

public:
    enum class Format { Png, Jpg, Svg, Csv };

    struct Options
    {
        QString path;
        Format format = Format::Png;
        /// "light" or "dark"; independent of the interface theme, because a plot
        /// pasted into a report usually wants a white background.
        QString theme = QStringLiteral("light");
        int dpi = 150;
    };

    explicit SaveFileDialog(QWidget *parent = nullptr);
    ~SaveFileDialog() override;

    /// Preselects the export theme; the user can still export the other one.
    void setTheme(const QString &theme);
    /// Pre-fills the file name part; the user can still change it.
    void setSuggestedName(const QString &name);

    Options options() const;

protected:
    void changeEvent(QEvent *event) override;

private:
    void browse();
    /// SVG is resolution independent and CSV is not an image at all, so the fields
    /// that do not apply are disabled rather than silently ignored.
    void updateEnabledState();
    Format selectedFormat() const;

    Ui::SaveFileDialog *ui;
    QString m_suggestedName;
};

#endif // VBDW_UI_SAVE_FILE_DIALOG_H
