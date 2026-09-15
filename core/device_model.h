#ifndef CORE_DEVICE_MODEL_H
#define CORE_DEVICE_MODEL_H

#include "app_types.h"
#include "core/register_yaml.h"

#include <QObject>
#include <QString>

/// Everything the application knows about one drive.
///
/// Three register maps are kept side by side, because the Restore behaviour in the
/// spec depends on telling them apart:
///
///  * `deviceValues` - what the drive last reported;
///  * `snapshot`     - the DeviceParamList, frozen when this drive was connected or
///                     selected, and deliberately *not* refreshed by Read;
///  * `editState`    - what the UI currently shows. A Restore icon appears wherever
///                     editState differs from snapshot, and survives both Write and a
///                     temporary loss of the drive. Write, on the other hand, sends
///                     wherever editState differs from deviceValues.
class DeviceModel : public QObject
{
    Q_OBJECT

public:
    /// `nodeId` is the Cyphal node id; it is 0 for a Serial connection, which can only
    /// ever address a single drive.
    explicit DeviceModel(quint8 nodeId, QObject *parent = nullptr);

    quint8 nodeId() const { return m_nodeId; }

    /// Raw `vbdrive_model` register, e.g. "M4310".
    QString modelName() const;
    /// Model with the gear ratio appended, e.g. "M4310R36" - what DeviceList shows.
    QString displayName() const;

    // --- values reported by the drive ---
    const RegisterMap &deviceValues() const { return m_deviceValues; }
    RegisterValue deviceValue(const QString &name) const { return m_deviceValues.value(name); }
    bool hasDeviceValue(const QString &name) const { return m_deviceValues.contains(name); }
    void setDeviceValue(const QString &name, const RegisterValue &value);

    // --- DeviceParamList snapshot ---
    /// Freezes the current device values as the Restore reference and resets the edit
    /// state to match. Called on first connect and on every selection of this drive.
    void captureSnapshot();
    bool hasSnapshot() const { return m_hasSnapshot; }
    RegisterValue snapshotValue(const QString &name) const { return m_snapshot.value(name); }
    bool hasSnapshotValue(const QString &name) const { return m_snapshot.contains(name); }

    // --- edit state shown in the UI ---
    const RegisterMap &editState() const { return m_editState; }
    RegisterValue editValue(const QString &name) const { return m_editState.value(name); }
    bool hasEditValue(const QString &name) const { return m_editState.contains(name); }
    void setEditValue(const QString &name, const RegisterValue &value);
    /// Replaces the whole edit state, e.g. after loading a YAML profile.
    void mergeEditState(const RegisterMap &values);

    /// True when `name` was edited away from the snapshot, i.e. its Restore icon shows.
    bool isModified(const QString &name) const;
    /// Names of every register whose edit state diverges from the snapshot.
    QStringList modifiedNames() const;

    /// True when the editor holds something other than what the drive last reported,
    /// i.e. Write has to send it. This deliberately compares against the device
    /// values and not the snapshot: after a Write the snapshot is stale, so a field
    /// edited (or loaded from a profile) back to its snapshot value still differs
    /// from the drive and must go out even though its Restore icon is hidden.
    bool needsWrite(const QString &name) const;
    /// Names of every register that needsWrite().
    QStringList pendingWriteNames() const;
    bool hasUnsavedChanges() const;

    /// Reverts one register to its snapshot value. No-op without a snapshot entry.
    void restore(const QString &name);
    /// Reverts every modified register - used when the user drops a lost drive.
    void restoreAll();

    // --- live state ---
    TelemetrySample telemetry() const { return m_telemetry; }
    void setTelemetry(const TelemetrySample &sample);

    DeviceStatus status() const { return m_status; }
    void setStatus(const DeviceStatus &status);

    /// False while the drive's heartbeat is missing but the user has asked to wait
    /// for it to come back.
    bool isOnline() const { return m_online; }
    void setOnline(bool online);

signals:
    void deviceValueChanged(const QString &name);
    void editValueChanged(const QString &name);
    void identityChanged();
    void telemetryChanged();
    void statusChanged();
    void onlineChanged(bool online);

private:
    quint8 m_nodeId;
    RegisterMap m_deviceValues;
    RegisterMap m_snapshot;
    RegisterMap m_editState;
    bool m_hasSnapshot = false;
    bool m_online = true;
    TelemetrySample m_telemetry;
    DeviceStatus m_status;
};

#endif // CORE_DEVICE_MODEL_H
