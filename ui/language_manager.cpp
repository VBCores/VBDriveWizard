#include "ui/language_manager.h"

namespace {
const QString kSystem = QStringLiteral("system");
const QString kEnglish = QStringLiteral("en_US");
const QString kRussian = QStringLiteral("ru_RU");
const QString kChinese = QStringLiteral("zh_CN");
} // namespace

QString LanguageManager::normalizeConfiguredLanguage(QString language)
{
    const QString key = language.trimmed().toLower().replace(QLatin1Char('-'), QLatin1Char('_'));

    if (key == QLatin1String("en") || key == QLatin1String("en_us")
        || key == QLatin1String("english"))
        return kEnglish;
    if (key == QLatin1String("ru") || key == QLatin1String("ru_ru")
        || key == QLatin1String("russian"))
        return kRussian;
    if (key == QLatin1String("zh") || key == QLatin1String("zh_cn")
        || key == QLatin1String("chinese") || key == QLatin1String("simplified chinese"))
        return kChinese;
    return kSystem;
}

QString LanguageManager::effectiveLanguage(const QString &configuredLanguage,
                                           const QLocale &systemLocale)
{
    const QString normalized = normalizeConfiguredLanguage(configuredLanguage);
    if (normalized != kSystem)
        return normalized;

    const QString host = systemLocale.bcp47Name().toLower();
    if (host.startsWith(QLatin1String("ru")))
        return kRussian;
    if (host.startsWith(QLatin1String("zh")))
        return kChinese;
    return kEnglish;
}

QLocale LanguageManager::localeForLanguage(const QString &effectiveLanguage)
{
    if (effectiveLanguage == kRussian)
        return QLocale(QLocale::Russian, QLocale::Russia);
    if (effectiveLanguage == kChinese)
        return QLocale(QLocale::Chinese, QLocale::China);
    return QLocale(QLocale::English, QLocale::UnitedStates);
}

QString LanguageManager::languageForComboIndex(int index)
{
    switch (index) {
    case 1:
        return kRussian;
    case 2:
        return kChinese;
    default:
        return kEnglish;
    }
}

int LanguageManager::comboIndexForLanguage(const QString &effectiveLanguage)
{
    if (effectiveLanguage == kRussian)
        return 1;
    if (effectiveLanguage == kChinese)
        return 2;
    return 0;
}
