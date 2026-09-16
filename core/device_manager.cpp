#include "core/device_manager.h"

#include <algorithm>

DeviceManager::DeviceManager(QObject *parent)
    : QObject(parent)
{
}

DeviceModel *DeviceManager::device(quint8 nodeId) const
{
    for (DeviceModel *device : m_devices) {
        if (device->nodeId() == nodeId)
            return device;
    }
    return nullptr;
}

DeviceModel *DeviceManager::ensureDevice(quint8 nodeId)
{
    if (DeviceModel *existing = device(nodeId))
        return existing;

    auto *created = new DeviceModel(nodeId, this);
    // The label depends on registers that arrive after discovery, so a late model or
    // gear read has to be able to re-sort and re-label the list.
    connect(created, &DeviceModel::identityChanged, this, [this] {
        resort();
        emit listChanged();
    });
    m_devices.append(created);
    resort();

    emit deviceAdded(created);
    emit listChanged();

    if (!m_selected)
        select(created);  // the first drive discovered becomes the active one
    return created;
}

void DeviceManager::removeDevice(quint8 nodeId)
{
    DeviceModel *victim = device(nodeId);
    if (!victim)
        return;

    m_devices.removeOne(victim);
    const bool wasSelected = (m_selected == victim);
    if (wasSelected)
        m_selected = nullptr;

    victim->deleteLater();
    emit deviceRemoved(nodeId);
    emit listChanged();

    if (wasSelected)
        select(m_devices.isEmpty() ? nullptr : m_devices.first());
}

void DeviceManager::clear()
{
    const QList<DeviceModel *> victims = m_devices;
    m_devices.clear();
    m_selected = nullptr;
    for (DeviceModel *device : victims) {
        const quint8 nodeId = device->nodeId();
        device->deleteLater();
        emit deviceRemoved(nodeId);
    }
    emit listChanged();
    emit selectionChanged(nullptr);
}

void DeviceManager::select(DeviceModel *device)
{
    if (m_selected == device)
        return;
    m_selected = device;
    emit selectionChanged(device);
}

void DeviceManager::selectNode(quint8 nodeId)
{
    select(device(nodeId));
}

void DeviceManager::setSort(SortKey key, Qt::SortOrder order)
{
    if (m_sortKey == key && m_sortOrder == order)
        return;
    m_sortKey = key;
    m_sortOrder = order;
    resort();
    emit listChanged();
}

void DeviceManager::resort()
{
    std::sort(m_devices.begin(), m_devices.end(),
              [this](const DeviceModel *a, const DeviceModel *b) {
                  int cmp = 0;
                  if (m_sortKey == SortKey::Model) {
                      cmp = a->displayName().compare(b->displayName(), Qt::CaseInsensitive);
                  } else {
                      // The column shows what the drive reports, so that is what it
                      // sorts by; a drive whose node_id has not arrived yet (-1) sits
                      // at the ascending end until its first read lands.
                      cmp = a->canId() - b->canId();
                  }
                  // Two drives can share a model and, for a moment after a node id
                  // write, an id; the transport address they were discovered at is
                  // unique and keeps the order from flickering between rebuilds.
                  if (cmp == 0)
                      cmp = int(a->nodeId()) - int(b->nodeId());
                  return m_sortOrder == Qt::AscendingOrder ? cmp < 0 : cmp > 0;
              });
}

bool DeviceManager::anyUnsavedChanges() const
{
    for (const DeviceModel *device : m_devices) {
        if (device->hasUnsavedChanges())
            return true;
    }
    return false;
}
