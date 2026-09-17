#ifndef VBDW_UI_THEME_MANAGER_H
#define VBDW_UI_THEME_MANAGER_H

#include "app_types.h"

#include <QColor>
#include <QIcon>
#include <QPixmap>
#include <QString>

QT_BEGIN_NAMESPACE
class QApplication;
class QWidget;
QT_END_NAMESPACE

class QCustomPlot;

/// Dark/light theming for the whole application, the plot and the Restore icons.
/// Both themes are one set of stylesheet blocks filled from a colour table, so they
/// style the same widgets the same way and differ only in the colours.
class ThemeManager
{
public:
    static bool isDark(const QString &theme);

    static void applyApplicationTheme(QApplication &app, const UiSettings &settings);
    static void applyWidgetTheme(QWidget *widget, const UiSettings &settings);
    static void applyPlotTheme(QCustomPlot *plot, const QString &theme, int fontSize);

    /// A bundled white glyph (`refresh_white`, `pause_white`, ...) tinted with the
    /// theme's text colour, for the icon-only buttons.
    static QIcon icon(const QString &name, const QString &theme, int size = 18);

    static QColor foregroundColor(const QString &theme);
    static QColor backgroundColor(const QString &theme);
    static QColor gridColor(const QString &theme);
    /// Plot chrome: the axis lines and the text on them are separate roles, so the
    /// axes can recede into the card while the labels stay readable.
    static QColor axisColor(const QString &theme);
    static QColor axisLabelColor(const QString &theme);
    /// Series colours for the plot: measured value, then set-point.
    static QColor measuredColor(const QString &theme);
    static QColor setpointColor(const QString &theme);
    static QColor secondaryColor(const QString &theme);

    static QColor restoreIconColor(const QString &theme);
    static QColor restoreIconHoverColor(const QString &theme);

    /// The Voltbro logo scaled to `width` and tinted for the theme. One piece of
    /// artwork serves both themes, so the mark looks the same in each.
    static QPixmap logo(const QString &theme, int width);
};

#endif // VBDW_UI_THEME_MANAGER_H
