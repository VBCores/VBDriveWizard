#ifndef VBDW_UI_CONFIG_MANAGER_H
#define VBDW_UI_CONFIG_MANAGER_H

#include "app_types.h"

#include <QString>

/// Application settings stored as a flat YAML file, following the ConfigManager
/// pattern from RWIP_GUI: struct-level defaults, a load that never fails hard, and a
/// sanitising pass that replaces any out-of-range value with its default.
class ConfigManager
{
public:
    enum class LoadStatus
    {
        Loaded,
        NotFoundDefaultsUsed,
        ParseFailedDefaultsUsed
    };

    static AppConfig defaultConfig();

    static AppConfig loadConfig(const QString &path,
                                QString *message = nullptr,
                                LoadStatus *status = nullptr);

    static bool saveConfig(const QString &path, const AppConfig &config,
                           QString *error = nullptr);

    static QString loadStatusMessage(LoadStatus status);

    /// Path of the user's config, seeded from the bundled one on first run.
    /// Honours the VBDRIVEWIZARD_CONFIG environment variable.
    static QString resolveConfigFilePath();

private:
    static void sanitize(AppConfig *config);
};

#endif // VBDW_UI_CONFIG_MANAGER_H
