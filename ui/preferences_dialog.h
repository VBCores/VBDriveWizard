#ifndef VBDW_UI_PREFERENCES_DIALOG_H
#define VBDW_UI_PREFERENCES_DIALOG_H

#include "app_types.h"

#include <QDialog>

namespace Ui {
class PreferencesDialog;
}

/// Application settings that are not tied to a particular drive.
///
/// The interface language is deliberately absent: it lives in LanguageComboBox on the
/// main window. The dialog never writes the settings file; MainWindow does that when
/// it receives configApplied().
class PreferencesDialog : public QDialog
{
    Q_OBJECT

public:
    explicit PreferencesDialog(QWidget *parent = nullptr);
    ~PreferencesDialog() override;

    void setConfig(const AppConfig &config);
    AppConfig updatedConfig() const { return m_config; }

signals:
    void configApplied(const AppConfig &config);

protected:
    void changeEvent(QEvent *event) override;

private:
    void applyChanges();

    Ui::PreferencesDialog *ui;
    AppConfig m_config;
};

#endif // VBDW_UI_PREFERENCES_DIALOG_H
