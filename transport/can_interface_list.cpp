#include "transport/can_interface_list.h"

#include <QCoreApplication>
#include <QDir>
#include <QFile>

namespace {

/// ARPHRD_CAN from <linux/if_arp.h>: identifies a CAN link layer.
constexpr int kArphrdCan = 280;
/// CANFD_MTU from <linux/can.h>.
constexpr int kCanFdMtu = 72;
/// IFF_UP from <net/if.h>.
constexpr unsigned kIffUp = 0x1;

QString readSys(const QString &interfaceName, const QString &attribute)
{
    QFile file(QStringLiteral("/sys/class/net/%1/%2").arg(interfaceName, attribute));
    if (!file.open(QIODevice::ReadOnly | QIODevice::Text))
        return QString();
    return QString::fromLatin1(file.readAll()).trimmed();
}

} // namespace

QString CanInterfaceInfo::problem() const
{
    if (name.isEmpty())
        return QCoreApplication::translate("CanInterfaceList", "No CAN interface selected.");
    if (!up) {
        return QCoreApplication::translate(
                       "CanInterfaceList",
                       "Interface %1 is down. Bring it up, for example:\n"
                       "  sudo ip link set %1 up type can bitrate 500000 dbitrate 2000000 fd on")
                .arg(name);
    }
    if (!canFd) {
        return QCoreApplication::translate(
                       "CanInterfaceList",
                       "Interface %1 is not running in CAN FD mode (MTU %2, expected %3).\n"
                       "VBDrive uses Cyphal over CAN FD, so an FD-capable adapter is required.")
                .arg(name)
                .arg(mtu)
                .arg(kCanFdMtu);
    }
    return QString();
}

CanInterfaceInfo CanInterfaceList::describe(const QString &name)
{
    CanInterfaceInfo info;
    info.name = name;
    if (name.isEmpty())
        return info;

    bool ok = false;
    const unsigned flags = readSys(name, QStringLiteral("flags")).toUInt(&ok, 16);
    info.up = ok && (flags & kIffUp);

    info.mtu = readSys(name, QStringLiteral("mtu")).toInt();
    info.canFd = info.mtu >= kCanFdMtu;
    return info;
}

QVector<CanInterfaceInfo> CanInterfaceList::available()
{
    QVector<CanInterfaceInfo> result;
    const QDir netDir(QStringLiteral("/sys/class/net"));
    const QStringList names = netDir.entryList(QDir::Dirs | QDir::NoDotAndDotDot | QDir::System);

    for (const QString &name : names) {
        bool ok = false;
        const int type = readSys(name, QStringLiteral("type")).toInt(&ok);
        if (!ok || type != kArphrdCan)
            continue;  // not a CAN link
        result.append(describe(name));
    }
    return result;
}
