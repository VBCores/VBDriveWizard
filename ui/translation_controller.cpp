#include "ui/translation_controller.h"

#include "ui/language_manager.h"

#include <QApplication>
#include <QLibraryInfo>
#include <QLocale>

TranslationController::TranslationController(QApplication &application)
    : m_application(application)
{
}

bool TranslationController::applyConfiguredLanguage(const QString &configuredLanguage)
{
    const QString normalized = LanguageManager::normalizeConfiguredLanguage(configuredLanguage);
    QString effective = LanguageManager::effectiveLanguage(normalized);

    if (normalized == m_configuredLanguage && effective == m_effectiveLanguage) {
        QLocale::setDefault(LanguageManager::localeForLanguage(effective));
        return false;
    }

    removeInstalledTranslators();

    if (!installAppTranslator(effective))
        effective = QStringLiteral("en_US");  // catalogue missing: fall back to the source language

    m_configuredLanguage = normalized;
    m_effectiveLanguage = effective;
    QLocale::setDefault(LanguageManager::localeForLanguage(m_effectiveLanguage));

    installQtTranslator(m_effectiveLanguage);
    return true;
}

void TranslationController::removeInstalledTranslators()
{
    if (m_appTranslatorInstalled) {
        m_application.removeTranslator(&m_appTranslator);
        m_appTranslatorInstalled = false;
    }
    if (m_qtTranslatorInstalled) {
        m_application.removeTranslator(&m_qtTranslator);
        m_qtTranslatorInstalled = false;
    }
}

bool TranslationController::installAppTranslator(const QString &effectiveLanguage)
{
    // qt_add_translations() embeds the compiled catalogues under :/i18n, named after
    // the .ts basenames listed in CMakeLists.txt.
    const QString path = QStringLiteral(":/i18n/VBDriveWizard_%1.qm").arg(effectiveLanguage);
    if (!m_appTranslator.load(path))
        return effectiveLanguage == QLatin1String("en_US");  // English needs no catalogue
    m_application.installTranslator(&m_appTranslator);
    m_appTranslatorInstalled = true;
    return true;
}

void TranslationController::installQtTranslator(const QString &effectiveLanguage)
{
    if (effectiveLanguage == QLatin1String("en_US"))
        return;  // Qt's own strings are already English

    const QLocale locale = LanguageManager::localeForLanguage(effectiveLanguage);
    if (m_qtTranslator.load(locale, QStringLiteral("qtbase"), QStringLiteral("_"),
                            QLibraryInfo::path(QLibraryInfo::TranslationsPath))) {
        m_application.installTranslator(&m_qtTranslator);
        m_qtTranslatorInstalled = true;
    }
}
