#ifndef TRANSPORT_CAN_INTERFACE_LIST_H
#define TRANSPORT_CAN_INTERFACE_LIST_H

#include <QString>
#include <QVector>

/// One SocketCAN interface as reported by the kernel.
struct CanInterfaceInfo
{
    QString name;
    bool up = false;
    /// libcxxcanard always opens the socket in CAN FD mode, so a classic-CAN
    /// interface cannot be used at all. MTU 72 (CANFD_MTU) means FD is enabled.
    bool canFd = false;
    int mtu = 0;

    bool usable() const { return up && canFd; }
    /// Why the interface cannot be used, or an empty string when it can.
    QString problem() const;
};

/// Enumerates SocketCAN interfaces from /sys/class/net.
///
/// This exists because LinuxCAN's constructor cannot report a usable error for a
/// missing or classic-CAN interface; the selection is validated here first.
namespace CanInterfaceList {

QVector<CanInterfaceInfo> available();
CanInterfaceInfo describe(const QString &name);

} // namespace CanInterfaceList

#endif // TRANSPORT_CAN_INTERFACE_LIST_H
