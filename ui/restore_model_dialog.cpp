#include "ui/restore_model_dialog.h"

#include "ui_restore_model_dialog.h"

#include <QEvent>

RestoreModelDialog::RestoreModelDialog(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::RestoreModelDialog)
{
    ui->setupUi(this);
}

RestoreModelDialog::~RestoreModelDialog()
{
    delete ui;
}

QString RestoreModelDialog::selectedModelKey() const
{
    return ui->ModelComboBox->currentText().toLower();
}

void RestoreModelDialog::preselectModel(const QString &displayName)
{
    const int index = ui->ModelComboBox->findText(displayName, Qt::MatchFixedString);
    if (index >= 0)
        ui->ModelComboBox->setCurrentIndex(index);
}

void RestoreModelDialog::changeEvent(QEvent *event)
{
    QDialog::changeEvent(event);
    if (event->type() == QEvent::LanguageChange)
        ui->retranslateUi(this);
}
