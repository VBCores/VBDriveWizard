#include "firmware/firmware_downloader.h"

#include <QCoreApplication>
#include <QDir>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonObject>
#include <QLocale>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QNetworkRequest>
#include <QSaveFile>
#include <QUrl>

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
    const QString fallback = candidates.isEmpty()
            ? QCoreApplication::applicationDirPath()
            : candidates.first();
    QDir().mkpath(fallback);
    return QDir(fallback).absolutePath();
}

void FirmwareDownloader::downloadLatest(const QString &targetDirectory)
{
    if (m_reply) {
        emit failed(tr("A firmware download is already running."));
        return;
    }
    m_targetDirectory = targetDirectory.isEmpty() ? firmwareDirectory() : targetDirectory;
    QDir().mkpath(m_targetDirectory);
    requestReleaseMetadata();
}

void FirmwareDownloader::requestReleaseMetadata()
{
    emit progress(5, tr("Looking up the latest release..."));

    QNetworkRequest request{QUrl(QString::fromLatin1(kLatestReleaseUrl))};
    request.setRawHeader("Accept", "application/vnd.github+json");
    request.setRawHeader("User-Agent", "VBDriveWizard");
    request.setAttribute(QNetworkRequest::RedirectPolicyAttribute,
                         QNetworkRequest::NoLessSafeRedirectPolicy);

    m_reply = m_network->get(request);
    connect(m_reply, &QNetworkReply::finished, this, &FirmwareDownloader::onMetadataFinished);
}

void FirmwareDownloader::onMetadataFinished()
{
    QNetworkReply *reply = m_reply;
    m_reply = nullptr;
    if (!reply)
        return;
    reply->deleteLater();

    if (reply->error() != QNetworkReply::NoError) {
        emit failed(tr("Could not reach the VBDrive releases: %1").arg(reply->errorString()));
        return;
    }

    const QJsonObject release = QJsonDocument::fromJson(reply->readAll()).object();
    m_version = release.value(QStringLiteral("tag_name")).toString();

    QUrl assetUrl;
    const QJsonArray assets = release.value(QStringLiteral("assets")).toArray();
    for (const QJsonValue &value : assets) {
        const QJsonObject asset = value.toObject();
        if (asset.value(QStringLiteral("name")).toString()
            == QLatin1String(kAssetName)) {
            assetUrl = QUrl(asset.value(QStringLiteral("browser_download_url")).toString());
            break;
        }
    }

    if (!assetUrl.isValid()) {
        emit failed(tr("Release %1 does not contain %2.")
                            .arg(m_version.isEmpty() ? tr("(unknown)") : m_version,
                                 QString::fromLatin1(kAssetName)));
        return;
    }
    startAssetDownload(assetUrl);
}

void FirmwareDownloader::startAssetDownload(const QUrl &url)
{
    emit progress(15, tr("Downloading %1...").arg(m_version));

    QNetworkRequest request{url};
    request.setRawHeader("User-Agent", "VBDriveWizard");
    request.setAttribute(QNetworkRequest::RedirectPolicyAttribute,
                         QNetworkRequest::NoLessSafeRedirectPolicy);

    m_reply = m_network->get(request);
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
        emit failed(tr("Firmware download failed: %1").arg(reply->errorString()));
        return;
    }

    const QString fileName = m_version.isEmpty()
            ? QString::fromLatin1(kAssetName)
            : QStringLiteral("VBDrive_full_%1.hex").arg(m_version);
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
    if (!m_reply)
        return;
    QNetworkReply *reply = m_reply;
    m_reply = nullptr;
    reply->abort();
    reply->deleteLater();
}
