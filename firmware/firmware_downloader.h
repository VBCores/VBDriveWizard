#ifndef FIRMWARE_FIRMWARE_DOWNLOADER_H
#define FIRMWARE_FIRMWARE_DOWNLOADER_H

#include <QList>
#include <QObject>
#include <QString>

#include <QUrl>

QT_BEGIN_NAMESPACE
class QNetworkAccessManager;
class QNetworkReply;
QT_END_NAMESPACE

/// One release on the VBDrive GitHub releases page.
struct FirmwareRelease
{
    QString version;  ///< the tag, e.g. "4.2.0" or "0.3.4-hotfix"
    QString name;     ///< the release title, e.g. "Beta 2.4"
    QUrl assetUrl;    ///< the flashable image; invalid when the release carries none
    /// Marked as a pre-release, or "beta" in its tag or title.
    bool beta = false;
};

/// Fetches firmware images from the VBDrive GitHub releases.
///
/// checkLatest() finds the newest stable (non-beta) release, which is what the firmware
/// label compares the drive's version against; listReleases() fetches every release
/// for the user to pick from. download() then fetches the chosen release's image into
/// firmwares/: `VBDrive_full.hex`, the combined VBBoot + application build, or for the
/// early releases that predate it, their standalone `.hex`. Either is flashed as-is.
///
/// Every request is abandoned after kRequestTimeoutMs without a byte from the server,
/// so an unreachable GitHub ends in a failure signal instead of a hang.
class FirmwareDownloader : public QObject
{
    Q_OBJECT

public:
    /// One page of 100 covers every release so far.
    static constexpr auto kReleasesUrl =
            "https://api.github.com/repos/VBCores/VBDrive/releases?per_page=100";
    static constexpr auto kAssetName = "VBDrive_full.hex";
    static constexpr int kRequestTimeoutMs = 10000;

    explicit FirmwareDownloader(QObject *parent = nullptr);

    /// Looks up the newest stable release. A lookup already in flight is not repeated:
    /// its answer serves every caller.
    void checkLatest();
    /// Fetches all releases, newest first. A listing already in flight is not repeated.
    void listReleases();
    bool isListing() const { return m_listReply != nullptr; }
    /// Downloads `assetUrl` (a FirmwareRelease's) into `targetDirectory`. Only one
    /// download runs at a time.
    void download(const QUrl &assetUrl, const QString &version, const QString &targetDirectory);
    void abort();
    bool isBusy() const { return m_reply != nullptr; }

    /// Directory firmware images are kept in, created if missing.
    static QString firmwareDirectory();

signals:
    /// `assetUrl` is invalid when the release carries no flashable image.
    void latestReleaseFound(const QString &version, const QUrl &assetUrl);
    void checkFailed(const QString &error);

    void releasesListed(const QList<FirmwareRelease> &releases);
    void listFailed(const QString &error);

    void progress(int percent, const QString &stage);
    /// `filePath` is the downloaded image; `version` is the release tag.
    void finished(const QString &filePath, const QString &version);
    void failed(const QString &error);

private:
    void onMetadataFinished();
    void onListFinished();
    void onAssetFinished();

    QNetworkAccessManager *m_network;
    QNetworkReply *m_metadataReply = nullptr;
    QNetworkReply *m_listReply = nullptr;
    QNetworkReply *m_reply = nullptr;  ///< the asset download
    QString m_targetDirectory;
    QString m_version;
    QString m_assetName;  ///< base of the saved file's name, e.g. "VBDrive_full"
};

#endif // FIRMWARE_FIRMWARE_DOWNLOADER_H
