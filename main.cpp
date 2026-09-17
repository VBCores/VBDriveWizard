#include "mainwindow.h"

#include "app_types.h"
#include "control/trajectory.h"
#include "core/register_value.h"
#include "ui/config_manager.h"
#include "ui/translation_controller.h"

#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    // Set before anything reads QStandardPaths::AppConfigLocation.
    app.setApplicationName(QStringLiteral("VBDriveWizard"));
    app.setOrganizationName(QStringLiteral("Voltbro"));
    app.setApplicationVersion(QStringLiteral("0.0.1"));
    // Matches VBDriveWizard.desktop: on Wayland (and GNOME's dock on X11) the taskbar
    // icon comes from that entry, so the app id has to be set for it to be found.
    app.setDesktopFileName(QStringLiteral("VBDriveWizard"));
    app.setWindowIcon(QIcon(QStringLiteral(":/icons/icon.png")));

    // These cross thread boundaries through queued connections.
    qRegisterMetaType<TelemetrySample>("TelemetrySample");
    qRegisterMetaType<TelemetryBatch>("TelemetryBatch");
    qRegisterMetaType<DeviceStatus>("DeviceStatus");
    qRegisterMetaType<RegisterValue>("RegisterValue");
    qRegisterMetaType<TrajectoryOutput>("TrajectoryOutput");
    qRegisterMetaType<TrajectoryParams>("TrajectoryParams");

    // The language is applied before MainWindow is built so setupUi() already
    // produces translated strings.
    const AppConfig initialConfig =
            ConfigManager::loadConfig(ConfigManager::resolveConfigFilePath());
    TranslationController translationController(app);
    translationController.applyConfiguredLanguage(initialConfig.ui.language);

    MainWindow window(&translationController);
    window.show();
    return app.exec();
}
