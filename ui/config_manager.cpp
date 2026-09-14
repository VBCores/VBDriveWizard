#include "ui/config_manager.h"

#include "ui/language_manager.h"

#include <QCoreApplication>
#include <QDir>
#include <QFileInfo>
#include <QSaveFile>
#include <QStandardPaths>
#include <QTextStream>

#include <yaml-cpp/yaml.h>

#include <cmath>

namespace {

constexpr auto kConfigFileName = "config.yaml";

int readInt(const YAML::Node &root, const char *key, int fallback)
{
    if (!root[key])
        return fallback;
    try {
        return root[key].as<int>();
    } catch (const YAML::Exception &) {
        return fallback;
    }
}

double readDouble(const YAML::Node &root, const char *key, double fallback)
{
    if (!root[key])
        return fallback;
    try {
        return root[key].as<double>();
    } catch (const YAML::Exception &) {
        return fallback;
    }
}

bool readBool(const YAML::Node &root, const char *key, bool fallback)
{
    if (!root[key])
        return fallback;
    try {
        return root[key].as<bool>();
    } catch (const YAML::Exception &) {
        return fallback;
    }
}

QString readString(const YAML::Node &root, const char *key, const QString &fallback)
{
    if (!root[key])
        return fallback;
    try {
        return QString::fromStdString(root[key].as<std::string>());
    } catch (const YAML::Exception &) {
        return fallback;
    }
}

/// Bundled config shipped with the build, used to seed the user's copy.
QString bundledConfigPath()
{
    const QStringList candidates = {
        QCoreApplication::applicationDirPath() + QStringLiteral("/") + kConfigFileName,
#ifdef VBDRIVEWIZARD_SOURCE_DIR
        QStringLiteral(VBDRIVEWIZARD_SOURCE_DIR) + QStringLiteral("/") + kConfigFileName,
#endif
    };
    QString newest;
    QDateTime newestTime;
    for (const QString &path : candidates) {
        const QFileInfo info(path);
        if (!info.exists())
            continue;
        if (newest.isEmpty() || info.lastModified() > newestTime) {
            newest = info.absoluteFilePath();
            newestTime = info.lastModified();
        }
    }
    return newest;
}

} // namespace

AppConfig ConfigManager::defaultConfig()
{
    return AppConfig{};
}

void ConfigManager::sanitize(AppConfig *config)
{
    const AppConfig defaults = defaultConfig();
    UiSettings &ui = config->ui;

    ui.language = LanguageManager::normalizeConfiguredLanguage(ui.language);
    if (ui.theme.compare(QLatin1String("dark"), Qt::CaseInsensitive) != 0
        && ui.theme.compare(QLatin1String("light"), Qt::CaseInsensitive) != 0) {
        ui.theme = defaults.ui.theme;
    }
    ui.theme = ui.theme.toLower();

    if (ui.font_size < 6 || ui.font_size > 48)
        ui.font_size = defaults.ui.font_size;
    if (ui.plot_font_size < 6 || ui.plot_font_size > 48)
        ui.plot_font_size = defaults.ui.plot_font_size;
    if (ui.plot_line_width < 1 || ui.plot_line_width > 10)
        ui.plot_line_width = defaults.ui.plot_line_width;
    if (!std::isfinite(ui.plot_time_window_s) || ui.plot_time_window_s <= 0.0
        || ui.plot_time_window_s > 3600.0) {
        ui.plot_time_window_s = defaults.ui.plot_time_window_s;
    }
    if (ui.plot_draw_rate_hz < 1 || ui.plot_draw_rate_hz > 144)
        ui.plot_draw_rate_hz = defaults.ui.plot_draw_rate_hz;
    // Cyphal node ids are 7 bit, and 0 is reserved here for "Serial, no node id".
    if (ui.local_node_id < 1 || ui.local_node_id > 127)
        ui.local_node_id = defaults.ui.local_node_id;
    if (ui.serial_baud < 1200 || ui.serial_baud > 4000000)
        ui.serial_baud = defaults.ui.serial_baud;
    if (ui.openocd_interface.trimmed().isEmpty())
        ui.openocd_interface = defaults.ui.openocd_interface;
    if (ui.openocd_target.trimmed().isEmpty())
        ui.openocd_target = defaults.ui.openocd_target;

    WindowSettings &window = config->window;
    if (window.width < 640 || window.width > 16384)
        window.width = defaults.window.width;
    if (window.height < 480 || window.height > 16384)
        window.height = defaults.window.height;
}

AppConfig ConfigManager::loadConfig(const QString &path, QString *message, LoadStatus *status)
{
    AppConfig config = defaultConfig();
    LoadStatus result = LoadStatus::Loaded;

    if (!QFileInfo::exists(path)) {
        result = LoadStatus::NotFoundDefaultsUsed;
    } else {
        try {
            const YAML::Node root = YAML::LoadFile(path.toStdString());
            if (!root.IsMap()) {
                result = LoadStatus::ParseFailedDefaultsUsed;
            } else {
                UiSettings &ui = config.ui;
                ui.language = readString(root, "language", ui.language);
                ui.theme = readString(root, "theme", ui.theme);
                ui.font_size = readInt(root, "font_size", ui.font_size);
                ui.plot_font_size = readInt(root, "plot_font_size", ui.plot_font_size);
                ui.plot_line_width = readInt(root, "plot_line_width", ui.plot_line_width);
                ui.plot_time_window_s =
                        readDouble(root, "plot_time_window_s", ui.plot_time_window_s);
                ui.plot_draw_rate_hz = readInt(root, "plot_draw_rate_hz", ui.plot_draw_rate_hz);
                ui.local_node_id = readInt(root, "local_node_id", ui.local_node_id);
                ui.serial_baud = readInt(root, "serial_baud", ui.serial_baud);
                ui.openocd_interface =
                        readString(root, "openocd_interface", ui.openocd_interface);
                ui.openocd_target = readString(root, "openocd_target", ui.openocd_target);

                WindowSettings &window = config.window;
                window.x = readInt(root, "window_x", window.x);
                window.y = readInt(root, "window_y", window.y);
                window.width = readInt(root, "window_width", window.width);
                window.height = readInt(root, "window_height", window.height);
                window.maximized = readBool(root, "window_maximized", window.maximized);
            }
        } catch (const YAML::Exception &) {
            config = defaultConfig();
            result = LoadStatus::ParseFailedDefaultsUsed;
        }
    }

    sanitize(&config);
    if (status)
        *status = result;
    if (message)
        *message = loadStatusMessage(result);
    return config;
}

bool ConfigManager::saveConfig(const QString &path, const AppConfig &config, QString *error)
{
    QDir().mkpath(QFileInfo(path).absolutePath());

    QSaveFile file(path);
    if (!file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        if (error)
            *error = QCoreApplication::translate("ConfigManager", "Cannot write %1: %2")
                             .arg(QDir::toNativeSeparators(path), file.errorString());
        return false;
    }

    QTextStream out(&file);
    out.setLocale(QLocale::c());
    out.setRealNumberNotation(QTextStream::FixedNotation);
    out.setRealNumberPrecision(6);

    const UiSettings &ui = config.ui;
    const WindowSettings &window = config.window;

    out << "# VBDriveWizard application settings.\n"
        << "language: " << ui.language << '\n'
        << "theme: " << ui.theme << '\n'
        << "font_size: " << ui.font_size << '\n'
        << "plot_font_size: " << ui.plot_font_size << '\n'
        << "plot_line_width: " << ui.plot_line_width << '\n'
        << "plot_time_window_s: " << ui.plot_time_window_s << '\n'
        << "plot_draw_rate_hz: " << ui.plot_draw_rate_hz << '\n'
        << "\n# Cyphal node id this application announces on the CAN bus.\n"
        << "local_node_id: " << ui.local_node_id << '\n'
        << "serial_baud: " << ui.serial_baud << '\n'
        << "\n# OpenOCD configuration used for firmware flashing (ST-Link / STM32G4).\n"
        << "openocd_interface: " << ui.openocd_interface << '\n'
        << "openocd_target: " << ui.openocd_target << '\n'
        << "\nwindow_x: " << window.x << '\n'
        << "window_y: " << window.y << '\n'
        << "window_width: " << window.width << '\n'
        << "window_height: " << window.height << '\n'
        << "window_maximized: " << (window.maximized ? "true" : "false") << '\n';

    if (!file.commit()) {
        if (error)
            *error = QCoreApplication::translate("ConfigManager", "Cannot write %1: %2")
                             .arg(QDir::toNativeSeparators(path), file.errorString());
        return false;
    }
    return true;
}

QString ConfigManager::loadStatusMessage(LoadStatus status)
{
    switch (status) {
    case LoadStatus::Loaded:
        return QCoreApplication::translate("ConfigManager", "Settings loaded.");
    case LoadStatus::NotFoundDefaultsUsed:
        return QCoreApplication::translate("ConfigManager",
                                           "No settings file found; defaults are in use.");
    case LoadStatus::ParseFailedDefaultsUsed:
        return QCoreApplication::translate("ConfigManager",
                                           "Settings file could not be read; defaults are in use.");
    }
    return QString();
}

QString ConfigManager::resolveConfigFilePath()
{
    const QString override = qEnvironmentVariable("VBDRIVEWIZARD_CONFIG");
    if (!override.isEmpty())
        return override;

    QString dir = QStandardPaths::writableLocation(QStandardPaths::AppConfigLocation);
    if (dir.isEmpty())
        dir = QCoreApplication::applicationDirPath();
    const QString userPath = QDir(dir).filePath(QString::fromLatin1(kConfigFileName));

    if (QFileInfo::exists(userPath))
        return userPath;

    // First run: seed the user's copy from the bundled one so the file is discoverable.
    const QString bundled = bundledConfigPath();
    if (!bundled.isEmpty()) {
        QDir().mkpath(dir);
        if (QFile::copy(bundled, userPath))
            return userPath;
        return bundled;
    }
    return userPath;
}
