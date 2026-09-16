#ifndef CORE_DEVICE_MANAGER_H
#define CORE_DEVICE_MANAGER_H

#include "core/device_model.h"

#include <QList>
#include <QObject>

/// Owns every drive the application currently knows about and tracks which one the
/// UI is pointed at.
///
/// Selection only steers reads and configuration commands. Running trajectories are
/// keyed by node id in ControlManager and are deliberately unaffected by it, so
/// several drives can be exercised at once.
class DeviceManager : public QObject
{
    Q_OBJECT

public:
    /// What the list is ordered by - the two columns DeviceList offers, so a click
    /// on a column header maps straight onto it.
    enum class SortKey
    {
        Model,
        CanId
    };

    explicit DeviceManager(QObject *parent = nullptr);

    /// Returns the existing drive for `nodeId`, creating it if this is the first time
    /// it has been seen. The first drive added becomes the selected one.
    DeviceModel *ensureDevice(quint8 nodeId);
    DeviceModel *device(quint8 nodeId) const;
    bool contains(quint8 nodeId) const { return device(nodeId) != nullptr; }

    void removeDevice(quint8 nodeId);
    void clear();

    /// Drives in the current sort order.
    QList<DeviceModel *> devices() const { return m_devices; }
    int count() const { return m_devices.size(); }
    bool isEmpty() const { return m_devices.isEmpty(); }

    DeviceModel *selected() const { return m_selected; }
    void select(DeviceModel *device);
    void selectNode(quint8 nodeId);

    SortKey sortKey() const { return m_sortKey; }
    Qt::SortOrder sortOrder() const { return m_sortOrder; }
    /// Re-orders the list and reports it through listChanged(). Both halves of the
    /// order live here rather than in the view, because rebuildDeviceList() walks
    /// devices() and the widget itself does no sorting.
    void setSort(SortKey key, Qt::SortOrder order);

    /// True when any drive - not only the selected one - has pending edits.
    bool anyUnsavedChanges() const;

signals:
    void deviceAdded(DeviceModel *device);
    /// Emitted after the drive has been removed; `device` is already destroyed.
    void deviceRemoved(quint8 nodeId);
    void selectionChanged(DeviceModel *device);
    /// Order or labels changed and the list widget should be rebuilt.
    void listChanged();

private:
    void resort();

    QList<DeviceModel *> m_devices;
    DeviceModel *m_selected = nullptr;
    SortKey m_sortKey = SortKey::CanId;
    Qt::SortOrder m_sortOrder = Qt::AscendingOrder;
};

#endif // CORE_DEVICE_MANAGER_H
