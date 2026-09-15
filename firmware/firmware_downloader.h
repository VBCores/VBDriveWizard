#ifndef FIRMWARE_FIRMWARE_DOWNLOADER_H
#define FIRMWARE_FIRMWARE_DOWNLOADER_H

#include <QObject>
#include <QString>

QT_BEGIN_NAMESPACE
class QNetworkAccessManager;
class QNetworkReply;
QT_END_NAMESPACE

/// Fetches the newest firmware image from the VBDrive GitHub releases.
///
/// Two steps: ask the releases API for the latest tag, then download its
/// `VBDrive_full.hex` asset into firmwares/. That image is the combined
/// VBBoot + application build, so it can be flashed as-is.
class FirmwareDownloader : public QObject
{
    Q_OBJECT

public:
    static constexpr auto kLatestReleaseUrl =
            "https://api.github.com/repos/VBCores/VBDrive/releases/latest";
    static constexpr auto kAssetName = "VBDrive_full.hex";

    explicit FirmwareDownloader(QObject *parent = nullptr);

    /// Downloads into `targetDirectory`. Only one download runs at a time.
    void downloadLatest(const QString &targetDirectory);
    void abort();
    bool isBusy() const { return m_reply != nullptr; }

    /// Directory firmware images are kept in, created if missing.
    static QString firmwareDirectory();

signals:
    void progress(int percent, const QString &stage);
    /// `filePath` is the downloaded image; `version` is the release tag.
    void finished(const QString &filePath, const QString &version);
    void failed(const QString &error);

private:
    void requestReleaseMetadata();
    void startAssetDownload(const QUrl &url);
    void onMetadataFinished();
    void onAssetFinished();

    QNetworkAccessManager *m_network;
    QNetworkReply *m_reply = nullptr;
    QString m_targetDirectory;
    QString m_version;
};

#endif // FIRMWARE_FIRMWARE_DOWNLOADER_H
