#ifndef FIRMWARE_FIRMWARE_FLASHER_H
#define FIRMWARE_FIRMWARE_FLASHER_H

#include <QObject>
#include <QString>

QT_BEGIN_NAMESPACE
class QProcess;
QT_END_NAMESPACE

/// Flashes a .hex image with OpenOCD over SWD.
///
/// VBDrive is an STM32G431VB programmed with an ST-Link, so the defaults are
/// `interface/stlink.cfg` + `target/stm32g4x.cfg`; both are overridable in Preferences.
/// OpenOCD reports no percentage, so progress is derived from the stage markers it
/// prints ("** Programming Started **" and friends).
class FirmwareFlasher : public QObject
{
    Q_OBJECT

public:
    explicit FirmwareFlasher(QObject *parent = nullptr);
    ~FirmwareFlasher() override;

    void flash(const QString &hexFilePath, const QString &interfaceConfig,
               const QString &targetConfig);
    void cancel();
    bool isRunning() const;

    /// False when openocd is not installed, which is worth saying before starting.
    static bool isOpenocdAvailable();

signals:
    void progress(int percent, const QString &stage);
    /// Every line OpenOCD prints, for the log view and the error dialog.
    void output(const QString &line);
    void finished(bool success, const QString &message);

private:
    void handleOutput(const QString &text);

    QProcess *m_process = nullptr;
    QString m_pendingLine;
    QString m_collectedOutput;
    int m_percent = 0;
    bool m_sawVerifyOk = false;
};

#endif // FIRMWARE_FIRMWARE_FLASHER_H
