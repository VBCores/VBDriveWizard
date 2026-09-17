#include "core/register_yaml.h"

#include "core/register_catalog.h"

#include <QCoreApplication>
#include <QDir>
#include <QFileInfo>
#include <QSaveFile>
#include <QTextStream>

#include <yaml-cpp/yaml.h>


namespace {

QString scalarOf(const YAML::Node &node)
{
    return QString::fromStdString(node.Scalar());
}

} // namespace

bool RegisterYaml::load(const QString &path, RegisterMap *out, QString *error,
                        QStringList *warnings)
{
    if (!out)
        return false;
    out->clear();

    const QFileInfo info(path);
    if (!info.exists()) {
        if (error)
            *error = QCoreApplication::translate("RegisterYaml", "File does not exist: %1")
                             .arg(QDir::toNativeSeparators(path));
        return false;
    }

    YAML::Node root;
    try {
        root = YAML::LoadFile(path.toStdString());
    } catch (const YAML::Exception &e) {
        if (error)
            *error = QCoreApplication::translate("RegisterYaml", "Cannot parse %1: %2")
                             .arg(QDir::toNativeSeparators(path), QString::fromStdString(e.what()));
        return false;
    }

    if (!root.IsMap()) {
        if (error)
            *error = QCoreApplication::translate(
                             "RegisterYaml", "%1 is not a map of register names to values.")
                             .arg(QDir::toNativeSeparators(path));
        return false;
    }

    for (auto it = root.begin(); it != root.end(); ++it) {
        const QString name = QString::fromStdString(it->first.Scalar());
        const RegisterInfo *reg = RegisterCatalog::find(name);
        if (!reg) {
            if (warnings)
                *warnings << QCoreApplication::translate("RegisterYaml", "unknown register '%1'")
                                     .arg(name);
            continue;
        }
        if (!it->second.IsScalar()) {
            if (warnings)
                *warnings << QCoreApplication::translate("RegisterYaml",
                                                         "'%1' does not hold a single value")
                                     .arg(name);
            continue;
        }
        RegisterValue value;
        if (!RegisterCodec::parse(*reg, scalarOf(it->second), &value)) {
            if (warnings)
                *warnings << QCoreApplication::translate("RegisterYaml",
                                                         "'%1' has a value of the wrong type")
                                     .arg(name);
            continue;
        }
        out->insert(name, value);
    }

    if (out->isEmpty()) {
        if (error)
            *error = QCoreApplication::translate("RegisterYaml",
                                                 "%1 contains no recognised registers.")
                             .arg(QDir::toNativeSeparators(path));
        return false;
    }
    return true;
}

bool RegisterYaml::save(const QString &path, const RegisterMap &values, QString *error)
{
    QSaveFile file(path);
    if (!file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        if (error)
            *error = QCoreApplication::translate("RegisterYaml", "Cannot write %1: %2")
                             .arg(QDir::toNativeSeparators(path), file.errorString());
        return false;
    }

    QTextStream out(&file);
    out.setLocale(QLocale::c());
    out << "# VBDrive register profile written by VBDriveWizard.\n"
        << "# Values are in the actuator's native units (radians, rad/s, N*m, A).\n"
        << "# 'nan' means the limit is not set.\n\n";

    // Written in catalog order so profiles diff cleanly against each other.
    for (const QString &name : RegisterCatalog::profileNames()) {
        const auto it = values.constFind(name);
        if (it == values.constEnd())
            continue;
        QString text = it->toDisplayString();
        if (text.isEmpty())
            text = QStringLiteral("nan");
        if (it->type() == RegisterType::String)
            text = QStringLiteral("\"%1\"").arg(text);
        out << name << ": " << text << '\n';
    }

    if (!file.commit()) {
        if (error)
            *error = QCoreApplication::translate("RegisterYaml", "Cannot write %1: %2")
                             .arg(QDir::toNativeSeparators(path), file.errorString());
        return false;
    }
    return true;
}

QString RegisterYaml::defaultsDirectory()
{
    const QStringList candidates = {
        QCoreApplication::applicationDirPath() + QStringLiteral("/registers"),
#ifdef VBDRIVEWIZARD_SOURCE_DIR
        QStringLiteral(VBDRIVEWIZARD_SOURCE_DIR) + QStringLiteral("/registers"),
#endif
        QCoreApplication::applicationDirPath()
                + QStringLiteral("/../share/VBDriveWizard/registers"),
    };
    for (const QString &dir : candidates) {
        if (QFileInfo::exists(dir))
            return QDir(dir).absolutePath();
    }
    return QCoreApplication::applicationDirPath();
}

QString RegisterYaml::defaultsPathForModel(const QString &modelKey)
{
    return QDir(defaultsDirectory())
            .filePath(QStringLiteral("vbdrive_%1.yaml").arg(modelKey.toLower()));
}
