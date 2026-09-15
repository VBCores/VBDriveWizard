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
    app.setApplicationVersion(QStringLiteral("1.0"));
    app.setWindowIcon(QIcon(QStringLiteral(":/icons/voltbro_logo_dark.png")));

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
