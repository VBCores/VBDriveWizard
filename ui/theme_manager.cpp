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

/// Check-box indicator in the accent colour. As with the spin boxes, as soon as the
/// indicator is styled at all the style engine stops drawing it, so the tick has to
/// come from an explicit image.
QString checkBoxStyle()
{
    return QStringLiteral(
            "QCheckBox::indicator { width: 14px; height: 14px; border: 1px solid #9AA7B4;"
            " border-radius: 3px; background-color: #FFFFFF; }"
            "QCheckBox::indicator:hover { border-color: #005FB8; }"
            "QCheckBox::indicator:checked { background-color: #005FB8; border-color: #005FB8;"
            " image: url(:/icons/check_white.svg); }"
            "QCheckBox::indicator:checked:hover { background-color: #004C92;"
            " border-color: #004C92; }"
            "QCheckBox::indicator:disabled { background-color: #E6EAEF; border-color: #C3CBD4; }"
            "QCheckBox::indicator:checked:disabled { background-color: #9AA7B4;"
            " border-color: #9AA7B4; }");
}

/// Radio indicator in the accent colour, built like the check box above: the dot is
/// an image because a styled indicator is no longer drawn by the style engine, and a
/// border thick enough to be the dot would change the indicator's size.
QString radioStyle()
{
    return QStringLiteral(
            "QRadioButton::indicator { width: 14px; height: 14px; border: 1px solid #9AA7B4;"
            " border-radius: 8px; background-color: #FFFFFF; }"
            "QRadioButton::indicator:hover { border-color: #005FB8; }"
            "QRadioButton::indicator:checked { border-color: #005FB8;"
            " image: url(:/icons/radio_dot.svg); }"
            "QRadioButton::indicator:checked:hover { border-color: #004C92; }"
            "QRadioButton::indicator:disabled { background-color: #E6EAEF;"
            " border-color: #C3CBD4; }"
            "QRadioButton::indicator:checked:disabled { border-color: #C3CBD4;"
            " image: url(:/icons/radio_dot_disabled.svg); }");
}

/// Sliders: the travelled part of the groove carries the accent, the handle is a
/// white knob ringed in it. The negative handle margin is what centres the knob on a
/// 4 px groove, and the knob is only as large as the row can hold: the rows of the
/// Step Targets panel are just tall enough for 14 px, and anything larger is clipped
/// at the bottom. min-height keeps that much room even where the layout is tight.
QString sliderStyle()
{
    return QStringLiteral(
            "QSlider:horizontal { min-height: 18px; }"
            "QSlider::groove:horizontal { height: 4px; border-radius: 2px;"
            " background-color: #E2E8F0; }"
            "QSlider::sub-page:horizontal { height: 4px; border-radius: 2px;"
            " background-color: #005FB8; }"
            "QSlider::handle:horizontal { width: 10px; height: 10px; margin: -5px 0;"
            " border: 2px solid #005FB8; border-radius: 7px; background-color: #FFFFFF; }"
            "QSlider::handle:horizontal:hover { border-color: #004C92; }"
            "QSlider::groove:horizontal:disabled { background-color: #EDF1F5; }"
            "QSlider::sub-page:horizontal:disabled { background-color: #CBD5E1; }"
            "QSlider::handle:horizontal:disabled { border-color: #CBD5E1;"
            " background-color: #F8FAFC; }");
}

/// Panels as cards: one framed white card per top-level panel, and no frame at all on
/// the panels nested inside one - a border inside a border inside a border is what
/// made the CONTROL and CONFIGURATION columns look busy. The nested titles carry the
/// grouping on their own.
QString cardStyle()
{
    return QStringLiteral(
            "QGroupBox { border: 1px solid #E2E8F0; border-radius: 10px;"
            " background-color: #FFFFFF; margin-top: 16px; padding: 8px 6px 6px 6px;"
            " font-weight: 600; }"
            "QGroupBox::title { subcontrol-origin: margin; subcontrol-position: top left;"
            " left: 10px; padding: 0 4px; color: #64748B; }"
            "QGroupBox QGroupBox { border: none; background-color: transparent;"
            " margin-top: 12px; padding: 2px 0 0 0; }"
            // Qt does not merge two rules for the same subcontrol the way CSS
            // cascades, so the nested title repeats the colour it wants.
            "QGroupBox QGroupBox::title { left: 0px; padding: 0 4px 0 0; color: #64748B; }");
}

/// Input fields: one height for every control on a row, a visible focus ring (Fusion
/// draws none once the field is styled) and the same slate border as the cards.
/// Styling a combo box at all takes its arrow away from the style engine, so the
/// drop-down is spelled out here like the spin-box buttons above.
QString inputStyle()
{
    return QStringLiteral(
            "QLineEdit, QComboBox, QSpinBox, QDoubleSpinBox { border: 1px solid #CBD5E1;"
            " border-radius: 6px; padding: 3px 6px; min-height: 22px;"
            " background-color: #FFFFFF; selection-background-color: #005FB8;"
            " selection-color: #FFFFFF; }"
            "QLineEdit:focus, QComboBox:focus, QSpinBox:focus, QDoubleSpinBox:focus"
            " { border-color: #005FB8; }"
            "QLineEdit:disabled, QComboBox:disabled, QSpinBox:disabled,"
            " QDoubleSpinBox:disabled { background-color: #F8FAFC; color: #94A3B8;"
            " border-color: #E2E8F0; }"
            "QComboBox::drop-down { subcontrol-origin: padding; subcontrol-position: center right;"
            " width: 20px; border: none; }"
            "QComboBox::down-arrow { image: url(:/icons/spin_down_light.svg);"
            " width: 8px; height: 5px; }"
            "QComboBox::down-arrow:disabled { image: url(:/icons/spin_down_light_disabled.svg); }"
            "QComboBox QAbstractItemView { border: 1px solid #E2E8F0; border-radius: 6px;"
            " background-color: #FFFFFF; selection-background-color: #005FB8;"
            " selection-color: #FFFFFF; outline: none; }");
}

/// Lists and the two-column DEVICES tree. Both themes get this one: the dark
/// stylesheet leaves item views to Fusion otherwise, and Fusion draws a header as a
/// raised button, which on a flat card reads as a row of toolbar buttons rather than
/// as column titles.
QString itemViewStyle(const QString &theme)
{
    const bool dark = ThemeManager::isDark(theme);
    const QString border = dark ? QStringLiteral("#51565F") : QStringLiteral("#E2E8F0");
    const QString base = dark ? QStringLiteral("#1C1E22") : QStringLiteral("#FFFFFF");
    const QString headerBack = dark ? QStringLiteral("#2E3238") : QStringLiteral("#F8FAFC");
    const QString headerText = dark ? QStringLiteral("#9AA3AE") : QStringLiteral("#64748B");
    const QString headerHover = dark ? QStringLiteral("#3B3F45") : QStringLiteral("#E7EDF4");
    const QString headerHoverText = dark ? QStringLiteral("#ECECEC") : QStringLiteral("#0F172A");
    const QString rowHover = dark ? QStringLiteral("#2A2E34") : QStringLiteral("#F1F5F9");
    const QString selection = dark ? QStringLiteral("#4682B4") : QStringLiteral("#005FB8");
    const QString arrow = dark ? QStringLiteral("dark") : QStringLiteral("light");

    return QStringLiteral(
                   "QListWidget, QTreeView { border: 1px solid %1; border-radius: 6px;"
                   " background-color: %2; outline: none; }"
                   "QListWidget::item { padding: 4px 6px; border-radius: 4px; }"
                   "QListWidget::item:selected { background-color: %8; color: #FFFFFF; }"
                   // A tree row is several cells wide, so its cells keep square
                   // corners: rounding each one draws a seam down the selected row.
                   "QTreeView::item { padding: 4px 6px; border: none; }"
                   "QTreeView::item:hover { background-color: %7; }"
                   "QTreeView::item:selected { background-color: %8; color: #FFFFFF; }"
                   "QHeaderView { background-color: transparent; }"
                   // The right padding is the lane the sort arrow sits in; without it
                   // the arrow would be drawn over a right-aligned column title.
                   "QHeaderView::section { background-color: %3; color: %4;"
                   " font-weight: 600; padding: 4px 18px 4px 6px; border: none;"
                   " border-bottom: 1px solid %1; }"
                   "QHeaderView::section:hover { background-color: %5; color: %6; }"
                   // The frame is rounded, so the outer corners of the header follow it.
                   "QHeaderView::section:first { border-top-left-radius: 5px; }"
                   "QHeaderView::section:last { border-top-right-radius: 5px; }"
                   // Styling a section at all takes its sort arrow away from the style
                   // engine; the spin-box triangles are the same mark at the same size.
                   "QHeaderView::up-arrow, QHeaderView::down-arrow {"
                   " subcontrol-origin: padding; subcontrol-position: center right;"
                   " right: 6px; width: 8px; height: 5px; }"
                   "QHeaderView::up-arrow { image: url(:/icons/spin_up_%9.svg); }"
                   "QHeaderView::down-arrow { image: url(:/icons/spin_down_%9.svg); }")
            .arg(border, base, headerBack, headerText, headerHover, headerHoverText,
                 rowHover, selection, arrow);
}

/// Tabs that read as tabs: the inactive ones sit recessed on the window tint, the
/// selected one is a white sheet flush with the panel below it. The shape carries the
/// selection on its own, so there is no coloured cap - an accent bar up there pulls
/// the eye away from the panel it belongs to.
QString tabStyle()
{
    return QStringLiteral(
            "QTabWidget::pane { border: none; border-top: 1px solid #E2E8F0;"
            " background-color: transparent; top: -1px; }"
            "QTabBar { qproperty-drawBase: 0; background-color: transparent; }"
            "QTabBar::tab { background-color: #F1F5F9; color: #64748B;"
            " border: 1px solid #E2E8F0; border-bottom: none;"
            " border-top-left-radius: 7px; border-top-right-radius: 7px;"
            " padding: 5px 14px; margin-right: 2px; }"
            "QTabBar::tab:hover:!selected { background-color: #E7EDF4; color: #0F172A; }"
            "QTabBar::tab:selected { background-color: #FFFFFF; color: #0F172A;"
            " border-color: #E2E8F0; }"
            "QTabBar::tab:disabled { color: #CBD5E1; }");
}

/// Scroll areas are plumbing for panels that outgrow their column, not a surface of
/// their own: no frame, and the page behind them shows through. The viewport is a
/// separate widget that fills itself with the window colour, so clearing the scroll
/// area alone would leave the tint; the rule names it rather than matching every
/// descendant, which would take the scroll bars away from the style engine too.
QString scrollAreaStyle()
{
    return QStringLiteral(
            "QScrollArea { border: none; background-color: transparent; }"
            "QScrollArea > QWidget#qt_scrollarea_viewport { background-color: transparent; }"
            "QScrollArea > QWidget#qt_scrollarea_viewport > QWidget {"
            " background-color: transparent; }");
}

/// The status bar and the three label roles of the STATUS panel, which MainWindow
/// tags with a `role` property. Both themes get this one: the reading is the point of
/// the panel, so it is the value that carries the weight and the caption that recedes.
QString statusStyle(const QString &theme)
{
    const bool dark = ThemeManager::isDark(theme);
    const QString separator = dark ? QStringLiteral("#3B3F45") : QStringLiteral("#E2E8F0");
    const QString caption = dark ? QStringLiteral("#9AA3AE") : QStringLiteral("#64748B");
    const QString value = dark ? QStringLiteral("#ECECEC") : QStringLiteral("#0F172A");
    const QString unit = dark ? QStringLiteral("#7A828C") : QStringLiteral("#94A3B8");
    return QStringLiteral(
                   "QStatusBar { background-color: transparent; border-top: 1px solid %1;"
                   " color: %2; }"
                   "QStatusBar::item { border: none; }"
                   "QLabel[role=\"caption\"] { color: %2; }"
                   "QLabel[role=\"value\"] { color: %3; font-weight: 600; }"
                   "QLabel[role=\"unit\"] { color: %4; }")
            .arg(separator, caption, value, unit);
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
        // The Fusion light palette, spelled out rather than taken from
        // style()->standardPalette(): on Linux that follows the desktop colour
        // scheme and comes back dark under a dark GNOME/KDE setting, so the light
        // theme would not look the same on every platform. The window is a cool
        // slate tint; panels and input fields stay white on top of it.
        const QColor window(0xF1, 0xF5, 0xF9);
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

        // styleSheet = QStringLiteral(
        //         "QWidget { font-size: %1pt; }"
        //         "QPushButton { border: 1px solid #2D9A4A; border-radius: 6px;"
        //         " padding: 5px 10px; background-color: #3ba758; color: #F5FFF7; }"
        //         "QPushButton:hover { background-color: #54c472; }"
        //         "QPushButton:pressed { background-color: #25763A; }"
        //         "QPushButton:disabled { color: #969696; background-color: #757b83;"
        //         " border-color: #4D535C; }"
        //         "QLineEdit, QComboBox, QSpinBox, QDoubleSpinBox { border-radius: 4px;"
        //         " padding: 3px; }"
        //         "QGroupBox { border: 1px solid #BCBCBC; border-radius: 8px;"
        //         " margin-top: 10px; font-weight: 600; }"
        //         "QGroupBox::title { subcontrol-origin: margin; left: 8px; padding: 0 3px; }"
        //         "QPushButton#EmergStopPushButton { background-color: #C0392B;"
        //         " border-color: #E05146; color: #FFFFFF; font-weight: 700;"
        //         " font-size: %2pt; }"
        //         "QPushButton#EmergStopPushButton:hover { background-color: #E05146; }"
        //         "QPushButton#EmergStopPushButton:pressed { background-color: #96271C; }")
        //                      .arg(settings.font_size)
        //                      .arg(settings.font_size + 6);
        styleSheet = QStringLiteral(
                "QWidget { font-size: %1pt;}"
                "QPushButton { border: 1px solid #005fb8; border-radius: 6px;"
                " padding: 5px 10px; background-color: #005fb8; color: #F5FFF7; }"
                "QPushButton:hover { background-color: #003465; }"
                "QPushButton:pressed { background-color: #004c92; }"
                "QPushButton:disabled { background-color: #E2E8F0; border-color: #E2E8F0; color: #94A3B8; }"
                "QPushButton#EmergStopPushButton { background-color: #C0392B;"
                " border-color: #E05146; color: #FFFFFF; font-weight: 700;"
                " font-size: %2pt; }"
                "QPushButton#EmergStopPushButton:hover { background-color: rgb(159, 56, 48); }"
                "QPushButton#EmergStopPushButton:pressed { background-color: #96271C; }")
                             .arg(settings.font_size)
                             .arg(settings.font_size + 6)
                     + checkBoxStyle() + radioStyle() + sliderStyle() + cardStyle()
                     + inputStyle() + tabStyle();
    }

    app.setPalette(palette);
    app.setStyleSheet(styleSheet + spinBoxStyle(settings.theme) + statusStyle(settings.theme)
                      + itemViewStyle(settings.theme) + scrollAreaStyle());
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
    return isDark(theme) ? QColor(78, 82, 90) : QColor(0xE2, 0xE8, 0xF0);
}

QColor ThemeManager::axisColor(const QString &theme)
{
    return isDark(theme) ? foregroundColor(theme) : QColor(0xCB, 0xD5, 0xE1);
}

QColor ThemeManager::axisLabelColor(const QString &theme)
{
    return isDark(theme) ? foregroundColor(theme) : QColor(0x64, 0x74, 0x8B);
}

QColor ThemeManager::measuredColor(const QString &theme)
{
    return isDark(theme) ? QColor(0x4f, 0xc3, 0xf7) : QColor(0x28, 0x6f, 0xc4);
}

QColor ThemeManager::setpointColor(const QString &theme)
{
    return isDark(theme) ? QColor(0xff, 0xb7, 0x4d) : QColor(0x5e, 0xc2, 0x6d);
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
    const QColor axisLine = axisColor(theme);
    const QColor axisText = axisLabelColor(theme);
    // The zero line sits one step above the grid, not at full axis contrast - on dark
    // the axis colour is the foreground and would draw a bright bar across the chart.
    const QColor zeroLine = isDark(theme) ? grid.lighter(140) : axisLine;

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
            axis->setBasePen(QPen(axisLine));
            axis->setTickPen(QPen(axisLine));
            axis->setSubTickPen(QPen(axisLine));
            axis->setTickLabelColor(axisText);
            axis->setLabelColor(axisText);
            axis->setTickLabelFont(axisFont);
            axis->setLabelFont(axisFont);
            if (!axis->grid())
                continue;
            axis->grid()->setPen(QPen(grid, 1, Qt::DotLine));
            axis->grid()->setZeroLinePen(QPen(zeroLine, 1, Qt::SolidLine));
        }
    }
}
