#include "firmware/vbboot_flasher.h"

#include <QDeadlineTimer>
#include <QFile>
#include <QFileInfo>

#include <algorithm>
#include <cerrno>
#include <chrono>
#include <cstring>

#include <linux/can.h>
#include <linux/can/error.h>
#include <linux/can/raw.h>
#include <net/if.h>
#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>

namespace {

// Flash layout of the STM32G431 behind VBBoot.
constexpr quint32 kAppStart = 0x08003000;
constexpr quint32 kAppEnd = 0x08020000;
constexpr quint32 kRamStart = 0x20000000;
constexpr quint32 kRamEnd = 0x20008000;

constexpr char kCmdStart = 0x01;
constexpr char kCmdDone = 0x03;
constexpr char kCmdDataStream = 0x04;
constexpr quint8 kStatusDone = 0xD0;
constexpr quint8 kStatusError = 0xE0;
constexpr quint32 kAckIdFlag = 0x400;

/// Firmware bytes per DATA frame: with the command byte that is 48, a valid CAN FD length.
constexpr int kChunkSize = 47;
/// Pause after every DATA frame, so VBBoot's receive FIFO keeps up with the flash writes.
constexpr auto kFrameGap = std::chrono::milliseconds(3);

/// START is repeated for this long: the drive is still resetting into VBBoot.
constexpr int kStartWindowMs = 10000;
constexpr int kStartAckMs = 500;
/// The second START frame is answered once the application area is erased.
constexpr int kEraseAckMs = 5000;
constexpr int kDoneAckMs = 1500;
/// A frame the bus has not taken in this long means nothing is listening (or bus-off).
constexpr int kTxStallMs = 1000;
constexpr int kCancelSliceMs = 100;

quint32 readLe32(const QByteArray &data, int offset)
{
    quint32 value = 0;
    for (int i = 3; i >= 0; --i)
        value = (value << 8) | quint8(data[offset + i]);
    return value;
}

void appendLe(QByteArray &data, quint32 value, int bytes)
{
    for (int i = 0; i < bytes; ++i)
        data.append(char((value >> (8 * i)) & 0xFF));
}

/// CRC-32 as zlib computes it, which is what VBBoot checks the image against.
quint32 crc32(const QByteArray &data)
{
    quint32 crc = 0xFFFFFFFF;
    for (const char byte : data) {
        crc ^= quint8(byte);
        for (int bit = 0; bit < 8; ++bit)
            crc = (crc >> 1) ^ (0xEDB88320 & (0U - (crc & 1U)));
    }
    return crc ^ 0xFFFFFFFF;
}

QString hex(quint32 value, int digits = 0)
{
    return QStringLiteral("0x%1").arg(QString::number(value, 16).toUpper(), digits,
                                      QLatin1Char('0'));
}

} // namespace

enum class VbbootFlasher::Ack
{
    Done,
    Error,
    Timeout,
    BusOff,
    SocketError,
    Cancelled
};

/// The raw CAN FD socket VBBoot is spoken to on. Only VBBoot's answers and bus-off
/// reports are let through.
class VbbootFlasher::BootSocket
{
public:
    BootSocket() = default;
    BootSocket(const BootSocket &) = delete;
    BootSocket &operator=(const BootSocket &) = delete;
    ~BootSocket()
    {
        if (m_fd >= 0)
            ::close(m_fd);
    }

    /// 0, or the errno of the step that failed.
    int open(const QByteArray &interfaceName, quint32 ackId)
    {
        m_ackId = ackId;
        m_fd = ::socket(PF_CAN, SOCK_RAW | SOCK_NONBLOCK | SOCK_CLOEXEC, CAN_RAW);
        if (m_fd < 0)
            return errno;

        const int enable = 1;
        const can_filter filter{ackId | CAN_EFF_FLAG, CAN_EFF_FLAG | CAN_RTR_FLAG | CAN_EFF_MASK};
        const can_err_mask_t errors = CAN_ERR_BUSOFF;
        if (::setsockopt(m_fd, SOL_CAN_RAW, CAN_RAW_FD_FRAMES, &enable, sizeof enable) < 0
            || ::setsockopt(m_fd, SOL_CAN_RAW, CAN_RAW_FILTER, &filter, sizeof filter) < 0
            || ::setsockopt(m_fd, SOL_CAN_RAW, CAN_RAW_ERR_FILTER, &errors, sizeof errors) < 0)
            return errno;

        const unsigned index = ::if_nametoindex(interfaceName.constData());
        if (index == 0)
            return errno;
        sockaddr_can address{};
        address.can_family = AF_CAN;
        address.can_ifindex = int(index);
        if (::bind(m_fd, reinterpret_cast<const sockaddr *>(&address), sizeof address) < 0)
            return errno;
        return 0;
    }

    /// 0, or the errno of the failed write; ETIMEDOUT when the bus would not take
    /// the frame (a full TX queue that never drains: no listener, or bus-off).
    int send(quint32 canId, const QByteArray &payload)
    {
        // Extended id and no bit-rate switch, the same as the Cyphal stack sends.
        canfd_frame frame{};
        frame.can_id = canId | CAN_EFF_FLAG;
        frame.len = quint8(payload.size());
        frame.flags = CANFD_FDF;
        std::memcpy(frame.data, payload.constData(), size_t(payload.size()));

        const QDeadlineTimer deadline(kTxStallMs);
        for (;;) {
            if (::write(m_fd, &frame, sizeof frame) == ssize_t(sizeof frame))
                return 0;
            if (errno != ENOBUFS && errno != EAGAIN && errno != EINTR)
                return errno;
            if (deadline.hasExpired())
                return ETIMEDOUT;
            // ENOBUFS does not reliably raise POLLOUT, so this doubles as a short sleep.
            pollfd pfd{m_fd, POLLOUT, 0};
            ::poll(&pfd, 1, 5);
        }
    }

    /// VBBoot's answer, waiting up to `timeoutMs` for it; 0 only looks at what is
    /// already there.
    Ack receive(int timeoutMs)
    {
        const QDeadlineTimer deadline(timeoutMs);
        for (;;) {
            canfd_frame frame{};
            const ssize_t length = ::read(m_fd, &frame, sizeof frame);
            if (length == ssize_t(CAN_MTU) || length == ssize_t(CANFD_MTU)) {
                if (frame.can_id & CAN_ERR_FLAG) {
                    if (frame.can_id & CAN_ERR_BUSOFF)
                        return Ack::BusOff;
                    continue;
                }
                if ((frame.can_id & CAN_EFF_MASK) != m_ackId || frame.len < 1)
                    continue;
                if (frame.data[0] == kStatusDone)
                    return Ack::Done;
                if (frame.data[0] == kStatusError)
                    return Ack::Error;
                continue;
            }
            if (length < 0 && errno != EAGAIN && errno != EINTR) {
                m_error = errno;
                return Ack::SocketError;
            }
            const qint64 remaining = deadline.remainingTime();
            if (remaining <= 0)
                return Ack::Timeout;
            pollfd pfd{m_fd, POLLIN, 0};
            ::poll(&pfd, 1, int(remaining));
        }
    }

    int error() const { return m_error; }

private:
    int m_fd = -1;
    quint32 m_ackId = 0;
    int m_error = 0;
};

VbbootFlasher::VbbootFlasher(QObject *parent)
    : QObject(parent)
{
}

VbbootFlasher::~VbbootFlasher()
{
    cancel();
    if (m_thread.joinable())
        m_thread.join();
}

void VbbootFlasher::flash(const QString &hexPath, const QString &interfaceName, quint32 canId)
{
    if (m_running) {
        emit finished(false, tr("A flashing operation is already running."));
        return;
    }
    QString error;
    const QByteArray image = loadImage(hexPath, &error);
    if (image.isEmpty()) {
        emit finished(false, error);
        return;
    }

    if (m_thread.joinable())
        m_thread.join();  // the previous transfer has already reported back
    m_cancel = false;
    m_running = true;
    m_thread = std::thread(&VbbootFlasher::run, this, image, interfaceName.toLocal8Bit(), canId);
}

void VbbootFlasher::cancel()
{
    m_cancel = true;
}

QByteArray VbbootFlasher::loadImage(const QString &hexPath, QString *error)
{
    QFile file(hexPath);
    if (!file.open(QIODevice::ReadOnly)) {
        *error = tr("Could not open %1: %2").arg(hexPath, file.errorString());
        return {};
    }

    // Only the application window is kept, so the full image (VBBoot + application)
    // the releases ship works as well as an application-only one.
    QByteArray image(int(kAppEnd - kAppStart), char(0xFF));
    int used = 0;  // one past the highest byte written
    quint32 base = 0;
    for (int lineNumber = 1; !file.atEnd(); ++lineNumber) {
        const QByteArray line = file.readLine().trimmed();
        if (line.isEmpty())
            continue;
        const QByteArray record = QByteArray::fromHex(line.mid(1));
        if (!line.startsWith(':') || record.size() < 5
            || record.size() != 5 + quint8(record[0]) || line.size() != 1 + 2 * record.size()) {
            *error = tr("%1, line %2: not an Intel HEX record.")
                             .arg(QFileInfo(hexPath).fileName())
                             .arg(lineNumber);
            return {};
        }
        quint8 sum = 0;
        for (const char byte : record)
            sum += quint8(byte);
        if (sum != 0) {
            *error = tr("%1, line %2: checksum mismatch.")
                             .arg(QFileInfo(hexPath).fileName())
                             .arg(lineNumber);
            return {};
        }

        const int count = quint8(record[0]);
        const quint32 offset = (quint32(quint8(record[1])) << 8) | quint8(record[2]);
        const quint8 type = quint8(record[3]);
        const char *data = record.constData() + 4;
        if (type == 0x00) {
            for (int i = 0; i < count; ++i) {
                const quint32 address = base + offset + quint32(i);
                if (address >= kAppStart && address < kAppEnd) {
                    image[int(address - kAppStart)] = data[i];
                    used = std::max(used, int(address - kAppStart) + 1);
                }
            }
        } else if (type == 0x01) {
            break;
        } else if (type == 0x02 && count == 2) {
            base = ((quint32(quint8(data[0])) << 8) | quint8(data[1])) << 4;
        } else if (type == 0x04 && count == 2) {
            base = ((quint32(quint8(data[0])) << 8) | quint8(data[1])) << 16;
        }
    }

    // The vector table VBBoot checks before it starts the application.
    const quint32 stack = used >= 8 ? readLe32(image, 0) : 0;
    const quint32 reset = used >= 8 ? readLe32(image, 4) : 0;
    if (stack <= kRamStart || stack > kRamEnd || (stack & 7) != 0 || reset < kAppStart
        || reset >= kAppEnd || (reset & 1) == 0) {
        *error = tr("%1 holds no VBDrive application at %2.")
                         .arg(QFileInfo(hexPath).fileName(), hex(kAppStart, 8));
        return {};
    }

    // Whole DATA frames only; the padding is erased flash anyway.
    image.truncate(used);
    image.append((kChunkSize - used % kChunkSize) % kChunkSize, char(0xFF));
    if (image.size() > int(kAppEnd - kAppStart)) {
        *error = tr("The application in %1 does not fit into the flash.")
                         .arg(QFileInfo(hexPath).fileName());
        return {};
    }
    return image;
}

void VbbootFlasher::run(const QByteArray &image, const QByteArray &interfaceName, quint32 canId)
{
    bool inBootloader = false;
    QString error;
    const bool ok = transfer(image, interfaceName, canId, &inBootloader, &error);
    if (!ok && inBootloader) {
        error += QLatin1String("\n\n")
                + tr("The actuator stays in the bootloader, and its old firmware may already "
                     "be erased. Keep it selected and press Flash again.");
    }
    m_running = false;
    if (ok)
        emit finished(true, tr("Firmware written and verified."));
    else
        emit finished(false, error);
}

bool VbbootFlasher::transfer(const QByteArray &image, const QByteArray &interfaceName,
                             quint32 canId, bool *inBootloader, QString *error)
{
    const quint32 ackId = (canId | kAckIdFlag) & CAN_EFF_MASK;
    const quint32 crc = crc32(image);
    const auto size = quint32(image.size());

    BootSocket socket;
    if (const int code = socket.open(interfaceName, ackId)) {
        *error = tr("Could not open %1 for flashing: %2")
                         .arg(QString::fromLocal8Bit(interfaceName), qt_error_string(code));
        return false;
    }
    emit output(QStringLiteral("VBBoot: command id %1, ack id %2, image %3 bytes, CRC32 %4")
                        .arg(hex(canId), hex(ackId))
                        .arg(size)
                        .arg(hex(crc)));

    // START, part 0: size and the low half of the CRC. Repeated until VBBoot is up.
    emit progress(5, tr("Waiting for the bootloader..."));
    QByteArray start;
    start.append(kCmdStart).append(char(0));
    appendLe(start, size, 4);
    appendLe(start, crc & 0xFFFF, 2);
    const QDeadlineTimer window(kStartWindowMs);
    for (;;) {
        if (const int code = socket.send(canId, start)) {
            *error = ackError(Ack::SocketError, QStringLiteral("START"), code);
            return false;
        }
        const Ack ack = waitAck(socket, kStartAckMs);
        if (ack == Ack::Done) {
            *inBootloader = true;
            emit bootloaderReached();
            break;
        }
        if (ack == Ack::Timeout && !window.hasExpired())
            continue;
        if (ack == Ack::Timeout) {
            *error = tr("The bootloader did not answer on CAN id %1. Check the CAN "
                        "connection, and that the actuator's firmware supports VBBoot.")
                             .arg(hex(canId));
            return false;
        }
        *error = ackError(ack, QStringLiteral("START"), socket.error());
        return false;
    }

    // START, part 1: the high half of the CRC; VBBoot answers once it has erased.
    emit output(QStringLiteral("VBBoot: erasing"));
    emit progress(8, tr("Erasing the old firmware..."));
    QByteArray startHigh;
    startHigh.append(kCmdStart).append(char(1));
    appendLe(startHigh, crc >> 16, 2);
    // A repeated part 0 may have been answered twice; that answer is not this one's.
    for (Ack stale = socket.receive(0); stale == Ack::Done || stale == Ack::Error;
         stale = socket.receive(0)) {
    }
    if (const int code = socket.send(canId, startHigh)) {
        *error = ackError(Ack::SocketError, QStringLiteral("START"), code);
        return false;
    }
    if (const Ack ack = waitAck(socket, kEraseAckMs); ack != Ack::Done) {
        *error = ackError(ack, QStringLiteral("START"), socket.error());
        return false;
    }

    // DATA, streamed without acknowledgements; VBBoot only speaks up to refuse one.
    emit output(QStringLiteral("VBBoot: writing"));
    int percent = -1;
    for (int offset = 0; offset < image.size(); offset += kChunkSize) {
        if (m_cancel) {
            *error = tr("Flashing cancelled.");
            return false;
        }
        const QByteArray frame = QByteArray(1, kCmdDataStream) + image.mid(offset, kChunkSize);
        if (const int code = socket.send(canId, frame)) {
            *error = ackError(Ack::SocketError, QStringLiteral("DATA"), code);
            return false;
        }
        if (const Ack ack = socket.receive(0); ack != Ack::Timeout) {
            *error = ack == Ack::Error
                    ? tr("The bootloader refused the data at offset %1.").arg(offset)
                    : ackError(ack, QStringLiteral("DATA"), socket.error());
            return false;
        }
        std::this_thread::sleep_for(kFrameGap);

        const int sent = std::min(offset + kChunkSize, int(image.size()));
        const int now = 10 + int(85LL * sent / image.size());
        if (now != percent) {
            percent = now;
            emit progress(percent, tr("Writing the firmware: %1 of %2 bytes...")
                                           .arg(sent)
                                           .arg(image.size()));
        }
    }

    // DONE: VBBoot checks size and CRC, answers and starts the new application.
    emit output(QStringLiteral("VBBoot: verifying"));
    if (const int code = socket.send(canId, QByteArray(1, kCmdDone))) {
        *error = ackError(Ack::SocketError, QStringLiteral("DONE"), code);
        return false;
    }
    const Ack ack = waitAck(socket, kDoneAckMs);
    if (ack == Ack::Error) {
        *error = tr("The bootloader rejected the written image: its size or CRC32 does not "
                    "match. Some frames were probably lost on the bus.");
        return false;
    }
    if (ack != Ack::Done) {
        *error = ackError(ack, QStringLiteral("DONE"), socket.error());
        return false;
    }
    emit output(QStringLiteral("VBBoot: done"));
    emit progress(100, tr("Done."));
    return true;
}

VbbootFlasher::Ack VbbootFlasher::waitAck(BootSocket &socket, int timeoutMs)
{
    const QDeadlineTimer deadline(timeoutMs);
    for (;;) {
        if (m_cancel)
            return Ack::Cancelled;
        const Ack ack = socket.receive(int(std::min<qint64>(deadline.remainingTime(),
                                                            kCancelSliceMs)));
        if (ack != Ack::Timeout || deadline.hasExpired())
            return ack;
    }
}

QString VbbootFlasher::ackError(Ack ack, const QString &step, int socketError) const
{
    switch (ack) {
    case Ack::Error:
        return tr("The bootloader refused %1.").arg(step);
    case Ack::Timeout:
        return tr("The bootloader did not answer %1 in time: the CAN connection was "
                  "probably lost.")
                .arg(step);
    case Ack::BusOff:
        return tr("The CAN interface went bus-off during %1. Check the wiring and the "
                  "termination.")
                .arg(step);
    case Ack::SocketError:
        if (socketError == ETIMEDOUT)
            return tr("The CAN bus is not taking frames (%1): nothing acknowledges them. "
                      "Check the CAN connection.")
                    .arg(step);
        return tr("CAN error during %1: %2").arg(step, qt_error_string(socketError));
    case Ack::Cancelled:
        return tr("Flashing cancelled.");
    case Ack::Done:
        break;
    }
    return {};
}
