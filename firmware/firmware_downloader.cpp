#include "firmware/firmware_downloader.h"

#include "firmware/firmware_version.h"

#include <QCoreApplication>
#include <QDir>
#include <QFileInfo>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonObject>
#include <QLocale>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QNetworkRequest>
#include <QSaveFile>
#include <QStandardPaths>
#include <QUrl>

namespace {

QNetworkRequest githubRequest(const QUrl &url)
{
    QNetworkRequest request{url};
    request.setRawHeader("User-Agent", "VBDriveWizard");
    request.setAttribute(QNetworkRequest::RedirectPolicyAttribute,
                         QNetworkRequest::NoLessSafeRedirectPolicy);
    request.setTransferTimeout(FirmwareDownloader::kRequestTimeoutMs);
    return request;
}

QNetworkRequest apiRequest(const QUrl &url)
{
    QNetworkRequest request = githubRequest(url);
    request.setRawHeader("Accept", "application/vnd.github+json");
    return request;
}

/// The transfer timeout surfaces as a cancelled request, which says nothing useful.
QString replyError(const QNetworkReply *reply)
{
    if (reply->error() == QNetworkReply::OperationCanceledError
        || reply->error() == QNetworkReply::TimeoutError) {
        return FirmwareDownloader::tr("no answer within %1 s")
                .arg(FirmwareDownloader::kRequestTimeoutMs / 1000);
    }
    return reply->errorString();
}

/// `VBDrive_full.hex` when the release has it; the early releases only carry the
/// standalone application image, `VBDrive.hex`, so any other .hex is the fallback.
QUrl flashableAsset(const QJsonObject &release)
{
    QUrl fallback;
    const QJsonArray assets = release.value(QStringLiteral("assets")).toArray();
    for (const QJsonValue &value : assets) {
        const QJsonObject asset = value.toObject();
        const QString name = asset.value(QStringLiteral("name")).toString();
        const QUrl url(asset.value(QStringLiteral("browser_download_url")).toString());
        if (name == QLatin1String(FirmwareDownloader::kAssetName))
            return url;
        if (fallback.isEmpty() && name.endsWith(QLatin1String(".hex"), Qt::CaseInsensitive))
            fallback = url;
    }
    return fallback;
}

/// The releases of a releases API listing, drafts left out, in the listing's order.
QList<FirmwareRelease> parseReleases(const QJsonArray &array)
{
    QList<FirmwareRelease> releases;
    for (const QJsonValue &value : array) {
        const QJsonObject object = value.toObject();
        FirmwareRelease release;
        release.version = object.value(QStringLiteral("tag_name")).toString();
        if (release.version.isEmpty() || object.value(QStringLiteral("draft")).toBool())
            continue;
        release.name = object.value(QStringLiteral("name")).toString();
        release.assetUrl = flashableAsset(object);
        release.beta = object.value(QStringLiteral("prerelease")).toBool()
                || release.version.contains(QLatin1String("beta"), Qt::CaseInsensitive)
                || release.name.contains(QLatin1String("beta"), Qt::CaseInsensitive);
        releases.append(release);
    }
    return releases;
}

} // namespace

FirmwareDownloader::FirmwareDownloader(QObject *parent)
    : QObject(parent)
    , m_network(new QNetworkAccessManager(this))
{
}

QString FirmwareDownloader::firmwareDirectory()
{
    const QStringList candidates = {
#ifdef VBDRIVEWIZARD_SOURCE_DIR
        QStringLiteral(VBDRIVEWIZARD_SOURCE_DIR) + QStringLiteral("/firmwares"),
#endif
        QCoreApplication::applicationDirPath() + QStringLiteral("/firmwares"),
    };
    for (const QString &path : candidates) {
        if (QFileInfo::exists(path))
            return QDir(path).absolutePath();
    }
    // Installed builds live under /usr/bin, which is not writable by the user.
    QString dir = QStandardPaths::writableLocation(QStandardPaths::AppDataLocation);
    if (dir.isEmpty())
        dir = QCoreApplication::applicationDirPath();
    dir += QStringLiteral("/firmwares");
    QDir().mkpath(dir);
    return QDir(dir).absolutePath();
}

void FirmwareDownloader::checkLatest()
{
    if (m_metadataReply)
        return;

    m_metadataReply = m_network->get(apiRequest(QUrl(QString::fromLatin1(kReleasesUrl))));
    connect(m_metadataReply, &QNetworkReply::finished, this,
            &FirmwareDownloader::onMetadataFinished);
}

void FirmwareDownloader::onMetadataFinished()
{
    QNetworkReply *reply = m_metadataReply;
    m_metadataReply = nullptr;
    if (!reply)
        return;
    reply->deleteLater();

    if (reply->error() != QNetworkReply::NoError) {
        emit checkFailed(tr("Could not reach the VBDrive releases: %1").arg(replyError(reply)));
        return;
    }

    // Not GitHub's own "latest": the betas are not marked as pre-releases, so it
    // names a beta as soon as one is published. By version, not by listing order:
    // a hotfix to an older line may be published after a newer release.
    const QList<FirmwareRelease> releases =
            parseReleases(QJsonDocument::fromJson(reply->readAll()).array());
    const FirmwareRelease *latest = nullptr;
    std::optional<FirmwareVersion> latestVersion;
    for (const FirmwareRelease &release : releases) {
        const auto version = FirmwareVersion::parse(release.version);
        if (release.beta || !version || (latestVersion && !(*latestVersion < *version)))
            continue;
        latest = &release;
        latestVersion = version;
    }
    if (!latest) {
        emit checkFailed(tr("The VBDrive releases name no stable version."));
        return;
    }

    emit latestReleaseFound(latest->version, latest->assetUrl);
}

void FirmwareDownloader::listReleases()
{
    if (m_listReply)
        return;

    m_listReply = m_network->get(apiRequest(QUrl(QString::fromLatin1(kReleasesUrl))));
    connect(m_listReply, &QNetworkReply::finished, this, &FirmwareDownloader::onListFinished);
}

void FirmwareDownloader::onListFinished()
{
    QNetworkReply *reply = m_listReply;
    m_listReply = nullptr;
    if (!reply)
        return;
    reply->deleteLater();

    if (reply->error() != QNetworkReply::NoError) {
        emit listFailed(tr("Could not reach the VBDrive releases: %1").arg(replyError(reply)));
        return;
    }

    const QJsonDocument document = QJsonDocument::fromJson(reply->readAll());
    if (!document.isArray()) {
        emit listFailed(tr("The VBDrive releases answered with something other than a list."));
        return;
    }

    // The API lists them newest first, which is the order they are offered in.
    emit releasesListed(parseReleases(document.array()));
}

void FirmwareDownloader::download(const QUrl &assetUrl, const QString &version,
                                  const QString &targetDirectory)
{
    if (m_reply) {
        emit failed(tr("A firmware download is already running."));
        return;
    }
    if (!assetUrl.isValid()) {
        emit failed(tr("Release %1 does not contain %2.")
                            .arg(version.isEmpty() ? tr("(unknown)") : version,
                                 QString::fromLatin1(kAssetName)));
        return;
    }
    m_version = version;
    m_assetName = QFileInfo(assetUrl.fileName()).completeBaseName();
    m_targetDirectory = targetDirectory.isEmpty() ? firmwareDirectory() : targetDirectory;
    QDir().mkpath(m_targetDirectory);

    emit progress(15, tr("Downloading %1...").arg(m_version));

    m_reply = m_network->get(githubRequest(assetUrl));
    connect(m_reply, &QNetworkReply::downloadProgress, this,
            [this](qint64 received, qint64 total) {
                const QLocale locale;
                if (total > 0) {
                    // 15..95 % covers the transfer; the rest is metadata and saving.
                    const int share = static_cast<int>(100.0 * received / total);
                    const int percent = 15 + static_cast<int>(80.0 * received / total);
                    emit progress(qBound(15, percent, 95),
                                  tr("Downloading %1: %2 of %3 (%4%)")
                                          .arg(m_version, locale.formattedDataSize(received),
                                               locale.formattedDataSize(total))
                                          .arg(share));
                } else {
                    // GitHub's asset redirect does not always carry a length.
                    emit progress(15, tr("Downloading %1: %2 received")
                                              .arg(m_version, locale.formattedDataSize(received)));
                }
            });
    connect(m_reply, &QNetworkReply::finished, this, &FirmwareDownloader::onAssetFinished);
}

void FirmwareDownloader::onAssetFinished()
{
    QNetworkReply *reply = m_reply;
    m_reply = nullptr;
    if (!reply)
        return;
    reply->deleteLater();

    if (reply->error() != QNetworkReply::NoError) {
        emit failed(tr("Firmware download failed: %1").arg(replyError(reply)));
        return;
    }

    const QString fileName = m_version.isEmpty()
            ? QStringLiteral("%1.hex").arg(m_assetName)
            : QStringLiteral("%1_%2.hex").arg(m_assetName, m_version);
    const QString path = QDir(m_targetDirectory).filePath(fileName);

    QSaveFile file(path);
    if (!file.open(QIODevice::WriteOnly)) {
        emit failed(tr("Could not write %1: %2").arg(path, file.errorString()));
        return;
    }
    file.write(reply->readAll());
    if (!file.commit()) {
        emit failed(tr("Could not write %1: %2").arg(path, file.errorString()));
        return;
    }

    emit progress(100, tr("Download complete."));
    emit finished(path, m_version);
}

void FirmwareDownloader::abort()
{
    for (QNetworkReply **slot : {&m_metadataReply, &m_listReply, &m_reply}) {
        QNetworkReply *reply = *slot;
        if (!reply)
            continue;
        *slot = nullptr;
        reply->abort();
        reply->deleteLater();
    }
}
