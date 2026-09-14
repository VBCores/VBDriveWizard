#ifndef CORE_REGISTER_YAML_H
#define CORE_REGISTER_YAML_H

#include "core/register_value.h"

#include <QHash>
#include <QString>

using RegisterMap = QHash<QString, RegisterValue>;

/// Reads and writes the flat `name: value` register profiles in registers/*.yaml.
///
/// Values are typed from RegisterCatalog rather than from what YAML infers, so a
/// profile that stores `1` for a real32 register still loads as a real32.
namespace RegisterYaml {

/// Unknown register names in the file are reported through `warnings` and skipped,
/// so a profile written by a newer firmware still loads what it can.
bool load(const QString &path, RegisterMap *out, QString *error, QStringList *warnings = nullptr);

bool save(const QString &path, const RegisterMap &values, QString *error);

/// Directory the bundled default profiles live in: the install data dir if present,
/// otherwise the source tree (so the app works when run from the build directory).
QString defaultsDirectory();

/// Absolute path of the bundled profile for a model, e.g. "m4310r36".
QString defaultsPathForModel(const QString &modelKey);

} // namespace RegisterYaml

#endif // CORE_REGISTER_YAML_H
