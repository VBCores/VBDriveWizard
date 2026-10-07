#ifndef FIRMWARE_VBBOOT_FLASHER_H
#define FIRMWARE_VBBOOT_FLASHER_H

#include <QByteArray>
#include <QObject>
#include <QString>

#include <atomic>
#include <thread>

/// Flashes the application over CAN FD through the VBBoot bootloader.
///
/// The caller sends the drive into VBBoot (register `bootloader = 1`); this class only
/// speaks VBBoot's own protocol, which is raw CAN, not Cyphal: START with the image
/// size and CRC32 (acknowledged once the application area is erased), a stream of
/// unacknowledged DATA frames, and DONE, after which VBBoot checks the CRC and starts
/// the new image. The frames go out on a raw SocketCAN socket of its own, on the
/// interface the Cyphal stack uses, from a worker thread; the signals arrive queued.
class VbbootFlasher : public QObject
{
    Q_OBJECT

public:
    /// VBBoot listens on this id when the drive's EEPROM holds no valid node_id.
    static constexpr quint32 kDefaultCanId = 0x444;

    explicit VbbootFlasher(QObject *parent = nullptr);
    ~VbbootFlasher() override;

    /// `canId` is the id VBBoot takes commands on: the drive's node_id, or kDefaultCanId.
    void flash(const QString &hexPath, const QString &interfaceName, quint32 canId);
    /// Aborts the transfer. Past START the application is already erased, so the
    /// drive is left in VBBoot until it is flashed again.
    void cancel();
    bool isRunning() const { return m_running; }

signals:
    void progress(int percent, const QString &stage);
    /// VBBoot answered START: the drive has left its application and sends no
    /// heartbeats until a complete image has been written.
    void bootloaderReached();
    /// Protocol milestones, for the log view.
    void output(const QString &line);
    void finished(bool success, const QString &message);

private:
    enum class Ack;
    class BootSocket;

    /// The application part of an Intel HEX file (the window VBBoot writes), padded
    /// to whole DATA frames. Empty, with `error` filled, when there is none.
    static QByteArray loadImage(const QString &hexPath, QString *error);

    void run(const QByteArray &image, const QByteArray &interfaceName, quint32 canId);
    bool transfer(const QByteArray &image, const QByteArray &interfaceName, quint32 canId,
                  bool *inBootloader, QString *error);
    /// BootSocket::receive() in short slices, so that cancel() is noticed.
    Ack waitAck(BootSocket &socket, int timeoutMs);
    QString ackError(Ack ack, const QString &step, int socketError) const;

    std::thread m_thread;
    std::atomic_bool m_running{false};
    std::atomic_bool m_cancel{false};
};

#endif // FIRMWARE_VBBOOT_FLASHER_H
