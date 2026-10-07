#ifndef FIRMWARE_FIRMWARE_VERSION_H
#define FIRMWARE_FIRMWARE_VERSION_H

#include <QRegularExpression>
#include <QString>

#include <optional>
#include <tuple>

/// A VBDrive firmware version as `firmware_rev` and the release tags spell it: a
/// semantic version with an optional `v` prefix and an optional suffix ("4.2.0",
/// "v4.1.0", "0.3.4-hotfix"). Only major.minor.patch takes part in a comparison,
/// as in the numeric revision the drive reports through GetInfo.
struct FirmwareVersion
{
    int major = 0;
    int minor = 0;
    int patch = 0;

    static std::optional<FirmwareVersion> parse(const QString &text)
    {
        static const QRegularExpression pattern(
                QStringLiteral("^\\s*[vV]?(\\d+)\\.(\\d+)\\.(\\d+)"));
        const QRegularExpressionMatch match = pattern.match(text);
        if (!match.hasMatch())
            return std::nullopt;
        return FirmwareVersion{match.captured(1).toInt(), match.captured(2).toInt(),
                               match.captured(3).toInt()};
    }

    friend bool operator<(const FirmwareVersion &a, const FirmwareVersion &b)
    {
        return std::tie(a.major, a.minor, a.patch) < std::tie(b.major, b.minor, b.patch);
    }
};

#endif // FIRMWARE_FIRMWARE_VERSION_H
