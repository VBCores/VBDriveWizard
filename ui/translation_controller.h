#ifndef UI_TRANSLATION_CONTROLLER_H
#define UI_TRANSLATION_CONTROLLER_H

#include <QString>
#include <QTranslator>

QT_BEGIN_NAMESPACE
class QApplication;
QT_END_NAMESPACE

/// Installs and swaps the application and Qt translation catalogues at runtime.
///
/// Swapping a QTranslator makes Qt post QEvent::LanguageChange to every top-level
/// widget, which is what drives retranslateUi(); objects that are not widgets
/// (QCustomPlot text elements, status strings) are retranslated by hand from
/// MainWindow::retranslateDynamicTexts().
class TranslationController
{
public:
    explicit TranslationController(QApplication &application);

    QString configuredLanguage() const { return m_configuredLanguage; }
    QString effectiveLanguage() const { return m_effectiveLanguage; }

    /// Returns true when the language actually changed, i.e. a LanguageChange event
    /// was posted.
    bool applyConfiguredLanguage(const QString &configuredLanguage);

private:
    void removeInstalledTranslators();
    bool installAppTranslator(const QString &effectiveLanguage);
    void installQtTranslator(const QString &effectiveLanguage);

    QApplication &m_application;
    QTranslator m_appTranslator;
    QTranslator m_qtTranslator;
    bool m_appTranslatorInstalled = false;
    bool m_qtTranslatorInstalled = false;
    QString m_configuredLanguage = QStringLiteral("system");
    QString m_effectiveLanguage = QStringLiteral("en_US");
};

#endif // UI_TRANSLATION_CONTROLLER_H
