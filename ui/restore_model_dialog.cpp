#include "ui/restore_model_dialog.h"

#include "ui_restore_model_dialog.h"

#include <QAbstractButton>
#include <QDialogButtonBox>
#include <QEvent>
#include <QPushButton>
#include <QStyle>

RestoreModelDialog::RestoreModelDialog(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::RestoreModelDialog)
{
    ui->setupUi(this);
    // As in PreferencesDialog: no platform icons on the standard buttons, and OK is
    // the primary action.
    for (QAbstractButton *button : ui->ButtonBox->buttons())
        button->setIcon(QIcon());
    // A dynamic property set after the button was polished only reaches the
    // stylesheet on a repolish.
    QPushButton *ok = ui->ButtonBox->button(QDialogButtonBox::Ok);
    ok->setProperty("variant", "primary");
    ok->style()->unpolish(ok);
    ok->style()->polish(ok);
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
