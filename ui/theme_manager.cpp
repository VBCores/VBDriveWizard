#include "ui/theme_manager.h"

#include "third_party/qcustomplot/qcustomplot.h"

#include <QApplication>
#include <QFont>
#include <QPalette>
#include <QStyle>
#include <QWidget>

namespace {

/// Up/down buttons for the spin boxes. Giving QSpinBox a padding or border-radius
/// hands its whole rendering to the stylesheet engine, which then draws the arrows
/// only from an explicit ::up-arrow / ::down-arrow image; without one the buttons
/// come out as empty frames.
QString spinBoxStyle(const QString &theme)
{
    const QString suffix = ThemeManager::isDark(theme) ? QStringLiteral("dark")
                                                       : QStringLiteral("light");
    const QString hover = ThemeManager::isDark(theme) ? QStringLiteral("rgba(255, 255, 255, 0.10)")
                                                      : QStringLiteral("rgba(0, 0, 0, 0.08)");
    return QStringLiteral(
                   "QSpinBox::up-button, QDoubleSpinBox::up-button { subcontrol-origin: border;"
                   " subcontrol-position: top right; width: 18px; border: none;"
                   " border-top-right-radius: 4px; }"
                   "QSpinBox::down-button, QDoubleSpinBox::down-button { subcontrol-origin: border;"
                   " subcontrol-position: bottom right; width: 18px; border: none;"
                   " border-bottom-right-radius: 4px; }"
                   "QSpinBox::up-button:hover, QDoubleSpinBox::up-button:hover,"
                   " QSpinBox::down-button:hover, QDoubleSpinBox::down-button:hover"
                   " { background-color: %2; }"
                   "QSpinBox::up-arrow, QDoubleSpinBox::up-arrow"
                   " { image: url(:/icons/spin_up_%1.svg); width: 8px; height: 5px; }"
                   "QSpinBox::down-arrow, QDoubleSpinBox::down-arrow"
                   " { image: url(:/icons/spin_down_%1.svg); width: 8px; height: 5px; }"
                   "QSpinBox::up-arrow:disabled, QDoubleSpinBox::up-arrow:disabled"
                   " { image: url(:/icons/spin_up_%1_disabled.svg); }"
                   "QSpinBox::down-arrow:disabled, QDoubleSpinBox::down-arrow:disabled"
                   " { image: url(:/icons/spin_down_%1_disabled.svg); }")
            .arg(suffix, hover);
}

} // namespace

bool ThemeManager::isDark(const QString &theme)
{
    return theme.compare(QLatin1String("dark"), Qt::CaseInsensitive) == 0;
}

void ThemeManager::applyApplicationTheme(QApplication &app, const UiSettings &settings)
{
    app.setStyle(QStringLiteral("Fusion"));

    QPalette palette;
    QString styleSheet;

    if (isDark(settings.theme)) {
        palette.setColor(QPalette::Window, QColor(37, 40, 45));
        palette.setColor(QPalette::WindowText, QColor(230, 230, 230));
        palette.setColor(QPalette::Base, QColor(28, 30, 34));
        palette.setColor(QPalette::AlternateBase, QColor(46, 50, 56));
        palette.setColor(QPalette::ToolTipBase, QColor(46, 50, 56));
        palette.setColor(QPalette::ToolTipText, QColor(230, 230, 230));
        palette.setColor(QPalette::Text, QColor(230, 230, 230));
        palette.setColor(QPalette::Button, QColor(48, 52, 58));
        palette.setColor(QPalette::ButtonText, QColor(230, 230, 230));
        palette.setColor(QPalette::BrightText, Qt::red);
        palette.setColor(QPalette::Highlight, QColor(70, 130, 180));
        palette.setColor(QPalette::HighlightedText, QColor(255, 255, 255));
        palette.setColor(QPalette::Disabled, QPalette::Text, QColor(130, 130, 130));
        palette.setColor(QPalette::Disabled, QPalette::ButtonText, QColor(130, 130, 130));
        palette.setColor(QPalette::Disabled, QPalette::WindowText, QColor(130, 130, 130));

        styleSheet = QStringLiteral(
                "QWidget { font-size: %1pt; }"
                "QPushButton { border: 1px solid #2D9A4A; border-radius: 6px;"
                " padding: 5px 10px; background-color: #2B8A44; color: #F5FFF7; }"
                "QPushButton:hover { background-color: #42b460; }"
                "QPushButton:pressed { background-color: #25763A; }"
                "QPushButton:disabled { color: #969696; background-color: #3B3F45;"
                " border-color: #4D535C; }"
                "QLineEdit, QComboBox, QSpinBox, QDoubleSpinBox { border-radius: 4px;"
                " padding: 3px; }"
                "QGroupBox { border: 1px solid #51565F; border-radius: 8px;"
                " margin-top: 10px; font-weight: 600; }"
                "QGroupBox::title { subcontrol-origin: margin; left: 8px; padding: 0 3px; }"
                "QPushButton#EmergStopPushButton { background-color: #A8232A;"
                " border-color: #C4383F; color: #FFF1F1; font-weight: 700;"
                " font-size: %2pt; }"
                "QPushButton#EmergStopPushButton:hover { background-color: #C4383F; }"
                "QPushButton#EmergStopPushButton:pressed { background-color: #8A1B21; }")
                             .arg(settings.font_size)
                             .arg(settings.font_size + 6);
    } else {
        // The classic Fusion light palette, spelled out rather than taken from
        // style()->standardPalette(): on Linux that follows the desktop colour
        // scheme and comes back dark under a dark GNOME/KDE setting, so the light
        // theme would not look the same on every platform.
        const QColor window(239, 239, 239);
        const QColor light = window.lighter(150);
        const QColor mid = window.darker(130);
        const QColor dark = window.darker(150);
        const QColor shadow = dark.darker(135);
        const QColor disabledText(190, 190, 190);
        const QColor highlight(48, 140, 198);

        palette = QPalette(Qt::black, window, light, dark, mid, Qt::black, Qt::white);
        palette.setColor(QPalette::Midlight, mid.lighter(110));
        palette.setColor(QPalette::Button, window);
        palette.setColor(QPalette::Shadow, shadow);
        palette.setColor(QPalette::ToolTipBase, QColor(255, 255, 220));
        palette.setColor(QPalette::ToolTipText, Qt::black);
        palette.setColor(QPalette::BrightText, Qt::red);
        palette.setColor(QPalette::Highlight, highlight);
        palette.setColor(QPalette::HighlightedText, Qt::white);
        palette.setColor(QPalette::Link, highlight);
        QColor placeholder = Qt::black;
        placeholder.setAlpha(128);
        palette.setColor(QPalette::PlaceholderText, placeholder);
        palette.setColor(QPalette::Disabled, QPalette::Text, disabledText);
        palette.setColor(QPalette::Disabled, QPalette::WindowText, disabledText);
        palette.setColor(QPalette::Disabled, QPalette::ButtonText, disabledText);
        palette.setColor(QPalette::Disabled, QPalette::Base, window);
        palette.setColor(QPalette::Disabled, QPalette::Dark, QColor(209, 209, 209).darker(110));
        palette.setColor(QPalette::Disabled, QPalette::Shadow, shadow.lighter(150));
        palette.setColor(QPalette::Disabled, QPalette::Highlight, QColor(145, 145, 145));

        styleSheet = QStringLiteral(
                "QWidget { font-size: %1pt; }"
                "QPushButton { border: 1px solid #2D9A4A; border-radius: 6px;"
                " padding: 5px 10px; background-color: #3ba758; color: #F5FFF7; }"
                "QPushButton:hover { background-color: #54c472; }"
                "QPushButton:pressed { background-color: #25763A; }"
                "QPushButton:disabled { color: #969696; background-color: #757b83;"
                " border-color: #4D535C; }"
                "QLineEdit, QComboBox, QSpinBox, QDoubleSpinBox { border-radius: 4px;"
                " padding: 3px; }"
                "QGroupBox { border: 1px solid #BCBCBC; border-radius: 8px;"
                " margin-top: 10px; font-weight: 600; }"
                "QGroupBox::title { subcontrol-origin: margin; left: 8px; padding: 0 3px; }"
                "QPushButton#EmergStopPushButton { background-color: #C0392B;"
                " border-color: #E05146; color: #FFFFFF; font-weight: 700;"
                " font-size: %2pt; }"
                "QPushButton#EmergStopPushButton:hover { background-color: #E05146; }"
                "QPushButton#EmergStopPushButton:pressed { background-color: #96271C; }")
                             .arg(settings.font_size)
                             .arg(settings.font_size + 6);
    }

    app.setPalette(palette);
    app.setStyleSheet(styleSheet + spinBoxStyle(settings.theme));
}

void ThemeManager::applyWidgetTheme(QWidget *widget, const UiSettings &settings)
{
    if (!widget)
        return;
    QFont font = widget->font();
    font.setPointSize(settings.font_size);
    widget->setFont(font);
}

QColor ThemeManager::foregroundColor(const QString &theme)
{
    return isDark(theme) ? QColor(225, 225, 225) : QColor(30, 30, 30);
}

QColor ThemeManager::backgroundColor(const QString &theme)
{
    return isDark(theme) ? QColor(34, 36, 40) : QColor(255, 255, 255);
}

QColor ThemeManager::gridColor(const QString &theme)
{
    return isDark(theme) ? QColor(78, 82, 90) : QColor(220, 220, 220);
}

QColor ThemeManager::measuredColor(const QString &theme)
{
    return isDark(theme) ? QColor(0x4f, 0xc3, 0xf7) : QColor(0x15, 0x65, 0xc0);
}

QColor ThemeManager::setpointColor(const QString &theme)
{
    return isDark(theme) ? QColor(0xff, 0xb7, 0x4d) : QColor(0xe6, 0x7e, 0x22);
}

QColor ThemeManager::secondaryColor(const QString &theme)
{
    return isDark(theme) ? QColor(0x9c, 0xcc, 0x65) : QColor(0x2e, 0x7d, 0x32);
}

QColor ThemeManager::restoreIconColor(const QString &theme)
{
    return isDark(theme) ? QColor(0x7a, 0x82, 0x8c) : QColor(0x8a, 0x90, 0x98);
}

QColor ThemeManager::restoreIconHoverColor(const QString &theme)
{
    return isDark(theme) ? QColor(0x66, 0xd9, 0x84) : QColor(0x2b, 0x8a, 0x44);
}

QString ThemeManager::logoPath(const QString &theme)
{
    return isDark(theme) ? QStringLiteral(":/icons/voltbro_logo_white.png")
                         : QStringLiteral(":/icons/voltbro_logo_dark.png");
}

void ThemeManager::applyPlotTheme(QCustomPlot *plot, const QString &theme, int fontSize)
{
    if (!plot)
        return;

    const QColor background = backgroundColor(theme);
    const QColor foreground = foregroundColor(theme);
    const QColor grid = gridColor(theme);

    plot->setBackground(background);

    if (plot->legend) {
        plot->legend->setBrush(QBrush(isDark(theme) ? QColor(46, 50, 56, 220)
                                                    : QColor(255, 255, 255, 220)));
        plot->legend->setBorderPen(QPen(grid));
        plot->legend->setTextColor(foreground);
        QFont legendFont = plot->legend->font();
        legendFont.setPointSize(fontSize);
        plot->legend->setFont(legendFont);
    }

    QFont axisFont = plot->font();
    axisFont.setPointSize(fontSize);

    for (int r = 0; r < plot->axisRectCount(); ++r) {
        const QList<QCPAxis *> axes = plot->axisRect(r)->axes();
        for (QCPAxis *axis : axes) {
            axis->setBasePen(QPen(foreground));
            axis->setTickPen(QPen(foreground));
            axis->setSubTickPen(QPen(foreground));
            axis->setTickLabelColor(foreground);
            axis->setLabelColor(foreground);
            axis->setTickLabelFont(axisFont);
            axis->setLabelFont(axisFont);
            if (axis->grid())
                axis->grid()->setPen(QPen(grid, 1, Qt::DashLine));
        }
    }
}
