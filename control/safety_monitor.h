#ifndef CONTROL_SAFETY_MONITOR_H
#define CONTROL_SAFETY_MONITOR_H

#include "app_types.h"
#include "core/register_value.h"

#include <QObject>
#include <QSet>
#include <QString>
#include <QStringList>

/// Watches the status registers of every drive on the link and reports the first
/// over-temperature or fault of each.
///
/// A drive here is enabled for as long as it is connected and holds its last command
/// after Stop, so it is watched all the time, not only while a trajectory runs. The
/// monitor only reports; stopping the drive is up to MainWindow. A drive that has
/// tripped stays quiet until it is rearmed by the next Start, so one event is
/// reported once.
class SafetyMonitor : public QObject
{
    Q_OBJECT

public:
    using QObject::QObject;

    void setLimits(const SafetySettings &limits) { m_limits = limits; }

    /// Registers the monitor needs to see read, for every drive.
    static const QStringList &watchedRegisters();

    /// Feeds one register reading of `nodeId`; anything not watched is ignored.
    void check(quint8 nodeId, const QString &name, const RegisterValue &value);

    bool isTripped(quint8 nodeId) const { return m_tripped.contains(nodeId); }
    void rearm(quint8 nodeId) { m_tripped.remove(nodeId); }
    /// Forgets every trip; the drives are gone with the link.
    void clear() { m_tripped.clear(); }

    /// Why a drive with these last-known readings must not be started, or an empty
    /// string. Readings that are not known yet do not block the start: the running
    /// monitor catches them as soon as they arrive.
    static QString preStartProblem(const RegisterValue &isFault, const RegisterValue &tempStator,
                                   const RegisterValue &tempMcu, const SafetySettings &limits);

signals:
    void tripped(quint8 nodeId, const QString &reason);

private:
    SafetySettings m_limits;
    QSet<quint8> m_tripped;
};

#endif // CONTROL_SAFETY_MONITOR_H
