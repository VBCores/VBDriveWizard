#ifndef UI_THEME_MANAGER_H
#define UI_THEME_MANAGER_H

#include "app_types.h"

#include <QColor>
#include <QString>

QT_BEGIN_NAMESPACE
class QApplication;
class QWidget;
QT_END_NAMESPACE

class QCustomPlot;

/// Dark/light theming for the whole application, the plot and the Restore icons.
/// Palette and stylesheet follow RWIP_GUI, which the spec names as the reference.
class ThemeManager
{
public:
    static bool isDark(const QString &theme);

    static void applyApplicationTheme(QApplication &app, const UiSettings &settings);
    static void applyWidgetTheme(QWidget *widget, const UiSettings &settings);
    static void applyPlotTheme(QCustomPlot *plot, const QString &theme, int fontSize);

    static QColor foregroundColor(const QString &theme);
    static QColor backgroundColor(const QString &theme);
    static QColor gridColor(const QString &theme);
    /// Series colours for the plot: measured value, then set-point.
    static QColor measuredColor(const QString &theme);
    static QColor setpointColor(const QString &theme);
    static QColor secondaryColor(const QString &theme);

    static QColor restoreIconColor(const QString &theme);
    static QColor restoreIconHoverColor(const QString &theme);

    /// Logo asset matching the theme (white artwork on dark, dark artwork on light).
    static QString logoPath(const QString &theme);
};

#endif // UI_THEME_MANAGER_H
