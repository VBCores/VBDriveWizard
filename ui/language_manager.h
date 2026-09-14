#ifndef UI_LANGUAGE_MANAGER_H
#define UI_LANGUAGE_MANAGER_H

#include <QLocale>
#include <QString>

/// Maps between the LanguageComboBox indices, the codes stored in config.yaml and
/// the Qt locales / translation catalogues.
///
/// Combo order comes from mainwindow.ui: 0 English, 1 Русский, 2 中文.
class LanguageManager
{
public:
    /// Accepts aliases ("english", "ru", "zh-cn", ...) and returns one of
    /// "system", "en_US", "ru_RU", "zh_CN". Anything unrecognised becomes "system".
    static QString normalizeConfiguredLanguage(QString language);

    /// Resolves "system" against the host locale; otherwise returns the code as-is.
    static QString effectiveLanguage(const QString &configuredLanguage,
                                     const QLocale &systemLocale = QLocale::system());

    static QLocale localeForLanguage(const QString &effectiveLanguage);

    static QString languageForComboIndex(int index);
    static int comboIndexForLanguage(const QString &effectiveLanguage);
};

#endif // UI_LANGUAGE_MANAGER_H
