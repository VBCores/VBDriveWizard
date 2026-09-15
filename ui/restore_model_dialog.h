#ifndef VBDW_UI_RESTORE_MODEL_DIALOG_H
#define VBDW_UI_RESTORE_MODEL_DIALOG_H

#include <QDialog>

namespace Ui {
class RestoreModelDialog;
}

/// Asks which drive model's factory profile RestoreRegBtn should load.
class RestoreModelDialog : public QDialog
{
    Q_OBJECT

public:
    explicit RestoreModelDialog(QWidget *parent = nullptr);
    ~RestoreModelDialog() override;

    /// Profile key of the chosen model, e.g. "m4310r36", matching
    /// registers/vbdrive_<key>.yaml.
    QString selectedModelKey() const;

    /// Pre-selects the model, if the connected drive reported one we recognise.
    void preselectModel(const QString &displayName);

protected:
    void changeEvent(QEvent *event) override;

private:
    Ui::RestoreModelDialog *ui;
};

#endif // VBDW_UI_RESTORE_MODEL_DIALOG_H
