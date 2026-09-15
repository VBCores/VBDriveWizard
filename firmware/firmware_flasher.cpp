#include "firmware/firmware_flasher.h"

#include <QFileInfo>
#include <QProcess>
#include <QStandardPaths>

namespace {

/// OpenOCD prints no percentage, so the stage markers below are mapped onto one.
struct Stage
{
    const char *marker;
    int percent;
};

const Stage kStages[] = {
    {"Info : clock speed", 10},
    {"Info : SWD DPIDR", 20},
    {"Info : [", 25},             // target examination
    {"** Programming Started **", 35},
    {"** Programming Finished **", 70},
    {"** Verify Started **", 80},
    {"** Verified OK **", 95},
    {"** Resetting Target **", 100},
};

} // namespace

FirmwareFlasher::FirmwareFlasher(QObject *parent)
    : QObject(parent)
{
}

FirmwareFlasher::~FirmwareFlasher()
{
    cancel();
}

bool FirmwareFlasher::isOpenocdAvailable()
{
    return !QStandardPaths::findExecutable(QStringLiteral("openocd")).isEmpty();
}

bool FirmwareFlasher::isRunning() const
{
    return m_process && m_process->state() != QProcess::NotRunning;
}

void FirmwareFlasher::flash(const QString &hexFilePath, const QString &interfaceConfig,
                            const QString &targetConfig)
{
    if (isRunning()) {
        emit finished(false, tr("A flashing operation is already running."));
        return;
    }
    if (!QFileInfo::exists(hexFilePath)) {
        emit finished(false, tr("Firmware file not found: %1").arg(hexFilePath));
        return;
    }
    if (!isOpenocdAvailable()) {
        emit finished(false,
                      tr("openocd was not found. Install it, for example:\n"
                         "  sudo apt install openocd"));
        return;
    }

    m_percent = 0;
    m_pendingLine.clear();
    m_collectedOutput.clear();
    m_sawVerifyOk = false;

    delete m_process;
    m_process = new QProcess(this);
    m_process->setProcessChannelMode(QProcess::MergedChannels);

    connect(m_process, &QProcess::readyReadStandardOutput, this, [this] {
        handleOutput(QString::fromLocal8Bit(m_process->readAllStandardOutput()));
    });
    connect(m_process, &QProcess::errorOccurred, this, [this](QProcess::ProcessError error) {
        if (error == QProcess::FailedToStart)
            emit finished(false, tr("openocd could not be started."));
    });
    connect(m_process, &QProcess::finished, this,
            [this](int exitCode, QProcess::ExitStatus status) {
                handleOutput(QStringLiteral("\n"));  // flush any partial line
                const bool ok = (status == QProcess::NormalExit && exitCode == 0)
                        || m_sawVerifyOk;
                if (ok) {
                    emit progress(100, tr("Done."));
                    emit finished(true, tr("Firmware written and verified."));
                } else {
                    emit progress(0, QString());
                    emit finished(false,
                                  tr("openocd exited with code %1.\n\n%2")
                                          .arg(exitCode)
                                          .arg(m_collectedOutput.right(4000)));
                }
            });

    // `program <file> verify reset exit` writes, verifies, resets and quits. The hex
    // carries absolute addresses (VBBoot at 0x08000000, the application at 0x08003000),
    // so no offset is needed.
    const QStringList arguments = {
        QStringLiteral("-f"), interfaceConfig,
        QStringLiteral("-f"), targetConfig,
        QStringLiteral("-c"),
        QStringLiteral("program \"%1\" verify reset exit").arg(hexFilePath),
    };

    emit progress(5, tr("Starting openocd..."));
    emit output(QStringLiteral("openocd %1").arg(arguments.join(QLatin1Char(' '))));
    m_process->start(QStringLiteral("openocd"), arguments);
}

void FirmwareFlasher::handleOutput(const QString &text)
{
    m_pendingLine += text;
    m_collectedOutput += text;

    int newline;
    while ((newline = m_pendingLine.indexOf(QLatin1Char('\n'))) >= 0) {
        const QString line = m_pendingLine.left(newline).trimmed();
        m_pendingLine.remove(0, newline + 1);
        if (line.isEmpty())
            continue;

        emit output(line);

        if (line.contains(QLatin1String("** Verified OK **")))
            m_sawVerifyOk = true;

        for (const Stage &stage : kStages) {
            if (line.contains(QLatin1String(stage.marker)) && stage.percent > m_percent) {
                m_percent = stage.percent;
                emit progress(m_percent, line);
                break;
            }
        }
    }
}

void FirmwareFlasher::cancel()
{
    if (!isRunning())
        return;
    m_process->terminate();
    if (!m_process->waitForFinished(2000))
        m_process->kill();
}
