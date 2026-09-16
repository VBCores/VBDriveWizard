#include "core/device_model.h"

#include "core/register_catalog.h"

DeviceModel::DeviceModel(quint8 nodeId, QObject *parent)
    : QObject(parent)
    , m_nodeId(nodeId)
{
}

QString DeviceModel::modelName() const
{
    const RegisterValue model = m_deviceValues.value(QString::fromLatin1(registers::kModel));
    return model.isEmpty() ? QString() : model.toString();
}

QString DeviceModel::displayName() const
{
    const QString model = modelName();
    if (model.isEmpty())
        return tr("Unknown drive");

    // vbdrive_model is just "M4310"; the R-suffix the user recognises is the gear ratio.
    const RegisterValue gear = m_deviceValues.value(QString::fromLatin1(registers::kGear));
    if (gear.isEmpty())
        return model;
    return QStringLiteral("%1R%2").arg(model).arg(gear.toUInt32());
}

int DeviceModel::canId() const
{
    const RegisterValue id = m_deviceValues.value(QString::fromLatin1(registers::kNodeId));
    if (id.isEmpty())
        return -1;
    return static_cast<int>(id.toUInt32());
}

void DeviceModel::setDeviceValue(const QString &name, const RegisterValue &value)
{
    if (m_deviceValues.value(name) == value && m_deviceValues.contains(name))
        return;
    m_deviceValues.insert(name, value);
    emit deviceValueChanged(name);
    if (name == QLatin1String(registers::kModel) || name == QLatin1String(registers::kGear)
        || name == QLatin1String(registers::kNodeId))
        emit identityChanged();
}

void DeviceModel::captureSnapshot()
{
    m_snapshot = m_deviceValues;
    m_editState = m_deviceValues;
    m_hasSnapshot = true;
}

void DeviceModel::setEditValue(const QString &name, const RegisterValue &value)
{
    if (m_editState.contains(name) && m_editState.value(name) == value)
        return;
    m_editState.insert(name, value);
    emit editValueChanged(name);
}

void DeviceModel::mergeEditState(const RegisterMap &values)
{
    for (auto it = values.constBegin(); it != values.constEnd(); ++it)
        setEditValue(it.key(), it.value());
}

bool DeviceModel::isModified(const QString &name) const
{
    if (!m_hasSnapshot)
        return false;
    const auto edited = m_editState.constFind(name);
    if (edited == m_editState.constEnd())
        return false;
    const auto reference = m_snapshot.constFind(name);
    if (reference == m_snapshot.constEnd())
        return true;  // no reference to compare against: treat as an edit
    return *edited != *reference;
}

QStringList DeviceModel::modifiedNames() const
{
    QStringList names;
    if (!m_hasSnapshot)
        return names;
    for (auto it = m_editState.constBegin(); it != m_editState.constEnd(); ++it) {
        if (isModified(it.key()))
            names << it.key();
    }
    return names;
}

bool DeviceModel::needsWrite(const QString &name) const
{
    const auto edited = m_editState.constFind(name);
    if (edited == m_editState.constEnd())
        return false;
    const auto reported = m_deviceValues.constFind(name);
    if (reported == m_deviceValues.constEnd())
        return true;  // the drive never reported it: let it decide
    return *edited != *reported;
}

QStringList DeviceModel::pendingWriteNames() const
{
    QStringList names;
    for (auto it = m_editState.constBegin(); it != m_editState.constEnd(); ++it) {
        if (needsWrite(it.key()))
            names << it.key();
    }
    return names;
}

bool DeviceModel::hasUnsavedChanges() const
{
    for (auto it = m_editState.constBegin(); it != m_editState.constEnd(); ++it) {
        if (needsWrite(it.key()))
            return true;
    }
    return false;
}

void DeviceModel::restore(const QString &name)
{
    const auto reference = m_snapshot.constFind(name);
    if (reference == m_snapshot.constEnd())
        return;
    setEditValue(name, *reference);
}

void DeviceModel::restoreAll()
{
    const QStringList names = modifiedNames();
    for (const QString &name : names)
        restore(name);
}

void DeviceModel::setTelemetry(const TelemetrySample &sample)
{
    m_telemetry = sample;
    emit telemetryChanged();
}

void DeviceModel::setStatus(const DeviceStatus &status)
{
    m_status = status;
    emit statusChanged();
}

void DeviceModel::setOnline(bool online)
{
    if (m_online == online)
        return;
    m_online = online;
    emit onlineChanged(online);
}
