#include "ui/theme_manager.h"

#include "third_party/qcustomplot/qcustomplot.h"

#include <QApplication>
#include <QFont>
#include <QIcon>
#include <QPainter>
#include <QPalette>
#include <QPixmap>
#include <QStyle>
#include <QWidget>

#include <algorithm>
#include <utility>
#include <vector>

namespace {

/// The colour table a theme fills in. Every stylesheet block below is written once
/// against these names (as `@name`), so the two themes differ only in the values
/// here and never in which widgets get styled.
struct Tokens
{
    // Surfaces, from the page up: the window is the page, a card sits on it, and a
    // base is the inset a field, list or plot sits in. On dark the base is the
    // darkest of the three, on light the card and the base are both white.
    QString window;
    QString card;
    QString base;
    QString baseDisabled;
    QString header;             // column headers of the DEVICES tree
    QString hover;              // rows, tabs and header sections under the pointer
    QString border;             // card frames, tab pane, table lines
    QString inputBorder;        // fields and secondary buttons: a step above border

    QString text;
    QString textSecondary;      // captions, card titles, inactive tabs, column headers
    QString textMuted;          // units
    QString textDisabled;

    // One accent for both themes. `accentMark` is the same hue tuned for thin marks
    // on the base surface (slider track, focus ring, radio dot): on dark the button
    // blue is too deep to read as a 1 px line.
    QString accent;
    QString accentHover;
    QString accentHoverBorder;
    QString accentPressed;
    QString accentMark;
    QString onAccent;

    // Secondary buttons, the default. An enabled one is a filled pill with a
    // border a step above the fields'; a disabled one keeps only the border, in
    // the card-frame colour, so the two differ in shape and not just in shade.
    QString button;
    QString buttonBorder;
    QString buttonHover;
    QString buttonPressed;
    QString buttonDisabled;
    QString buttonDisabledBorder;
    QString buttonDisabledText;

    QString danger;
    QString dangerHover;
    QString dangerPressed;
    QString onDanger;

    QString sliderKnob;
    QString icons;              // spin/combo arrow set that matches the text colour
    QString logo;               // tint of the single-colour Voltbro mark

    // Plot chrome and series.
    QString plotGrid;
    QString measured;
    QString setpoint;
    QString secondary;
};

const Tokens &darkTokens()
{
    static const Tokens t = {
        /* window */ QStringLiteral("#1E2125"),
        /* card */ QStringLiteral("#25282D"),
        /* base */ QStringLiteral("#1A1C20"),
        /* baseDisabled */ QStringLiteral("#22252A"),
        /* header */ QStringLiteral("#2A2E34"),
        /* hover */ QStringLiteral("#2E3238"),
        /* border */ QStringLiteral("#3B3F45"),
        /* inputBorder */ QStringLiteral("#4A4F58"),

        /* text */ QStringLiteral("#E6E6E6"),
        /* textSecondary */ QStringLiteral("#A3ACB8"),
        /* textMuted */ QStringLiteral("#8B95A1"),
        /* textDisabled */ QStringLiteral("#8A929C"),

        /* accent */ QStringLiteral("#2F6FDB"),
        /* accentHover */ QStringLiteral("#3574D4"),
        /* accentHoverBorder */ QStringLiteral("#6C9BEC"),
        /* accentPressed */ QStringLiteral("#2559B8"),
        /* accentMark */ QStringLiteral("#4A8AE8"),
        /* onAccent */ QStringLiteral("#FFFFFF"),

        /* button */ QStringLiteral("#3A3F47"),
        /* buttonBorder */ QStringLiteral("#5A606A"),
        /* buttonHover */ QStringLiteral("#464C55"),
        /* buttonPressed */ QStringLiteral("#31353C"),
        /* buttonDisabled */ QStringLiteral("transparent"),
        /* buttonDisabledBorder */ QStringLiteral("#3B3F45"),
        /* buttonDisabledText */ QStringLiteral("#6F7680"),

        /* danger */ QStringLiteral("#A8232A"),
        /* dangerHover */ QStringLiteral("#C4383F"),
        /* dangerPressed */ QStringLiteral("#8A1B21"),
        /* onDanger */ QStringLiteral("#FFF1F1"),

        /* sliderKnob */ QStringLiteral("#E6E6E6"),
        /* icons */ QStringLiteral("dark"),
        /* logo */ QStringLiteral("#E6E6E6"),

        /* plotGrid */ QStringLiteral("#33373E"),
        /* measured */ QStringLiteral("#4FC3F7"),
        /* setpoint */ QStringLiteral("#FFB74D"),
        /* secondary */ QStringLiteral("#9CCC65"),
    };
    return t;
}

const Tokens &lightTokens()
{
    static const Tokens t = {
        /* window */ QStringLiteral("#F1F5F9"),
        /* card */ QStringLiteral("#FFFFFF"),
        /* base */ QStringLiteral("#FFFFFF"),
        /* baseDisabled */ QStringLiteral("#F8FAFC"),
        /* header */ QStringLiteral("#F8FAFC"),
        /* hover */ QStringLiteral("#E7EDF4"),
        /* border */ QStringLiteral("#E2E8F0"),
        /* inputBorder */ QStringLiteral("#CBD5E1"),

        /* text */ QStringLiteral("#0F172A"),
        /* textSecondary */ QStringLiteral("#64748B"),
        /* textMuted */ QStringLiteral("#8290A2"),
        /* textDisabled */ QStringLiteral("#94A3B8"),

        /* accent */ QStringLiteral("#005FB8"),
        /* accentHover */ QStringLiteral("#004C92"),
        /* accentHoverBorder */ QStringLiteral("#004C92"),
        /* accentPressed */ QStringLiteral("#003465"),
        /* accentMark */ QStringLiteral("#005FB8"),
        /* onAccent */ QStringLiteral("#FFFFFF"),

        /* button */ QStringLiteral("#F8FAFC"),
        /* buttonBorder */ QStringLiteral("#B4C0CE"),
        /* buttonHover */ QStringLiteral("#EEF2F7"),
        /* buttonPressed */ QStringLiteral("#E2E8F0"),
        /* buttonDisabled */ QStringLiteral("transparent"),
        /* buttonDisabledBorder */ QStringLiteral("#E2E8F0"),
        /* buttonDisabledText */ QStringLiteral("#A5B1C0"),

        /* danger */ QStringLiteral("#C0392B"),
        /* dangerHover */ QStringLiteral("#A93226"),
        /* dangerPressed */ QStringLiteral("#96271C"),
        /* onDanger */ QStringLiteral("#FFFFFF"),

        /* sliderKnob */ QStringLiteral("#FFFFFF"),
        /* icons */ QStringLiteral("light"),
        /* logo */ QStringLiteral("#2B2A29"),   // the artwork's own colour

        /* plotGrid */ QStringLiteral("#E2E8F0"),
        /* measured */ QStringLiteral("#286FC4"),
        /* setpoint */ QStringLiteral("#5EC26D"),
        /* secondary */ QStringLiteral("#2E7D32"),
    };
    return t;
}

const Tokens &tokens(const QString &theme)
{
    return ThemeManager::isDark(theme) ? darkTokens() : lightTokens();
}

/// Substitutes every `@name` in a stylesheet block with the theme's value. Longer
/// names go first so `@accent` never eats the head of `@accentHover`.
QString fill(QString qss, const Tokens &t)
{
    std::vector<std::pair<QString, const QString *>> names = {
        { QStringLiteral("window"), &t.window },
        { QStringLiteral("card"), &t.card },
        { QStringLiteral("baseDisabled"), &t.baseDisabled },
        { QStringLiteral("base"), &t.base },
        { QStringLiteral("header"), &t.header },
        { QStringLiteral("hover"), &t.hover },
        { QStringLiteral("border"), &t.border },
        { QStringLiteral("inputBorder"), &t.inputBorder },
        { QStringLiteral("textSecondary"), &t.textSecondary },
        { QStringLiteral("textMuted"), &t.textMuted },
        { QStringLiteral("textDisabled"), &t.textDisabled },
        { QStringLiteral("text"), &t.text },
        { QStringLiteral("accentHoverBorder"), &t.accentHoverBorder },
        { QStringLiteral("accentHover"), &t.accentHover },
        { QStringLiteral("accentPressed"), &t.accentPressed },
        { QStringLiteral("accentMark"), &t.accentMark },
        { QStringLiteral("accent"), &t.accent },
        { QStringLiteral("onAccent"), &t.onAccent },
        { QStringLiteral("buttonBorder"), &t.buttonBorder },
        { QStringLiteral("buttonHover"), &t.buttonHover },
        { QStringLiteral("buttonPressed"), &t.buttonPressed },
        { QStringLiteral("buttonDisabledBorder"), &t.buttonDisabledBorder },
        { QStringLiteral("buttonDisabledText"), &t.buttonDisabledText },
        { QStringLiteral("buttonDisabled"), &t.buttonDisabled },
        { QStringLiteral("button"), &t.button },
        { QStringLiteral("dangerHover"), &t.dangerHover },
        { QStringLiteral("dangerPressed"), &t.dangerPressed },
        { QStringLiteral("danger"), &t.danger },
        { QStringLiteral("onDanger"), &t.onDanger },
        { QStringLiteral("sliderKnob"), &t.sliderKnob },
        { QStringLiteral("icons"), &t.icons },
    };
    std::stable_sort(names.begin(), names.end(), [](const auto &a, const auto &b) {
        return a.first.size() > b.first.size();
    });
    for (const auto &[name, value] : names)
        qss.replace(QLatin1Char('@') + name, *value);
    return qss;
}

/// Buttons in three weights. The default is the quiet secondary button; the one
/// action a panel is for (Connect, Write, Start, OK) is tagged `variant=primary`
/// by the window that owns it, and STOP is the only danger button. The disabled
/// rules come last so a disabled button of any weight falls back to the same
/// outline-only look: with most of the window disabled until a drive is
/// connected, a filled disabled button is too easy to mistake for a live one.
QString buttonStyle()
{
    return QStringLiteral(
            "QPushButton { border: 1px solid @buttonBorder; border-radius: 6px;"
            " padding: 5px 12px; background-color: @button; color: @text; }"
            "QPushButton:hover { background-color: @buttonHover; }"
            "QPushButton:pressed { background-color: @buttonPressed; }"
            "QPushButton[variant=\"primary\"] { background-color: @accent;"
            " border-color: @accent; color: @onAccent; }"
            "QPushButton[variant=\"primary\"]:hover { background-color: @accentHover;"
            " border-color: @accentHoverBorder; }"
            "QPushButton[variant=\"primary\"]:pressed { background-color: @accentPressed;"
            " border-color: @accentPressed; }"
            "QPushButton#EmergStopPushButton { background-color: @danger;"
            " border-color: @dangerHover; color: @onDanger; font-weight: 700; }"
            "QPushButton#EmergStopPushButton:hover { background-color: @dangerHover; }"
            "QPushButton#EmergStopPushButton:pressed { background-color: @dangerPressed; }"
            "QPushButton:disabled, QPushButton[variant=\"primary\"]:disabled {"
            " background-color: @buttonDisabled; border-color: @buttonDisabledBorder;"
            " color: @buttonDisabledText; }");
}

/// Up/down buttons for the spin boxes. Giving QSpinBox a padding or border-radius
/// hands its whole rendering to the stylesheet engine, which then draws the arrows
/// only from an explicit ::up-arrow / ::down-arrow image; without one the buttons
/// come out as empty frames.
QString spinBoxStyle()
{
    return QStringLiteral(
            "QSpinBox::up-button, QDoubleSpinBox::up-button { subcontrol-origin: border;"
            " subcontrol-position: top right; width: 18px; border: none;"
            " border-top-right-radius: 5px; }"
            "QSpinBox::down-button, QDoubleSpinBox::down-button { subcontrol-origin: border;"
            " subcontrol-position: bottom right; width: 18px; border: none;"
            " border-bottom-right-radius: 5px; }"
            "QSpinBox::up-button:hover, QDoubleSpinBox::up-button:hover,"
            " QSpinBox::down-button:hover, QDoubleSpinBox::down-button:hover"
            " { background-color: @hover; }"
            "QSpinBox::up-arrow, QDoubleSpinBox::up-arrow"
            " { image: url(:/icons/spin_up_@icons.svg); width: 8px; height: 5px; }"
            "QSpinBox::down-arrow, QDoubleSpinBox::down-arrow"
            " { image: url(:/icons/spin_down_@icons.svg); width: 8px; height: 5px; }"
            "QSpinBox::up-arrow:disabled, QDoubleSpinBox::up-arrow:disabled"
            " { image: url(:/icons/spin_up_@icons_disabled.svg); }"
            "QSpinBox::down-arrow:disabled, QDoubleSpinBox::down-arrow:disabled"
            " { image: url(:/icons/spin_down_@icons_disabled.svg); }");
}

/// Check-box indicator in the accent colour. As with the spin boxes, as soon as the
/// indicator is styled at all the style engine stops drawing it, so the tick has to
/// come from an explicit image.
QString checkBoxStyle()
{
    return QStringLiteral(
            "QCheckBox::indicator { width: 14px; height: 14px; border: 1px solid @inputBorder;"
            " border-radius: 3px; background-color: @base; }"
            "QCheckBox::indicator:hover { border-color: @accentMark; }"
            "QCheckBox::indicator:checked { background-color: @accent; border-color: @accent;"
            " image: url(:/icons/check_white.svg); }"
            "QCheckBox::indicator:checked:hover { background-color: @accentHover;"
            " border-color: @accentHover; }"
            "QCheckBox::indicator:disabled { background-color: @baseDisabled;"
            " border-color: @border; }"
            "QCheckBox::indicator:checked:disabled { background-color: @inputBorder;"
            " border-color: @inputBorder; }");
}

/// Radio indicator in the accent colour, built like the check box above: the dot is
/// an image because a styled indicator is no longer drawn by the style engine, and a
/// border thick enough to be the dot would change the indicator's size.
QString radioStyle()
{
    return QStringLiteral(
            "QRadioButton::indicator { width: 14px; height: 14px; border: 1px solid @inputBorder;"
            " border-radius: 8px; background-color: @base; }"
            "QRadioButton::indicator:hover { border-color: @accentMark; }"
            "QRadioButton::indicator:checked { border-color: @accentMark;"
            " image: url(:/icons/radio_dot_@icons.svg); }"
            "QRadioButton::indicator:checked:hover { border-color: @accentHover; }"
            "QRadioButton::indicator:disabled { background-color: @baseDisabled;"
            " border-color: @border; }"
            "QRadioButton::indicator:checked:disabled { border-color: @border;"
            " image: url(:/icons/radio_dot_@icons_disabled.svg); }");
}

/// Sliders: the travelled part of the groove carries the accent, the handle is a
/// knob ringed in it. The negative handle margin is what centres the knob on a
/// 4 px groove, and the knob is only as large as the row can hold: the rows of the
/// Step Targets panel are just tall enough for 14 px, and anything larger is clipped
/// at the bottom. min-height keeps that much room even where the layout is tight.
QString sliderStyle()
{
    return QStringLiteral(
            "QSlider:horizontal { min-height: 18px; }"
            "QSlider::groove:horizontal { height: 4px; border-radius: 2px;"
            " background-color: @border; }"
            "QSlider::sub-page:horizontal { height: 4px; border-radius: 2px;"
            " background-color: @accentMark; }"
            "QSlider::handle:horizontal { width: 10px; height: 10px; margin: -5px 0;"
            " border: 2px solid @accentMark; border-radius: 7px; background-color: @sliderKnob; }"
            "QSlider::handle:horizontal:hover { border-color: @accentHover; }"
            "QSlider::groove:horizontal:disabled { background-color: @baseDisabled; }"
            "QSlider::sub-page:horizontal:disabled { background-color: @inputBorder; }"
            "QSlider::handle:horizontal:disabled { border-color: @inputBorder;"
            " background-color: @baseDisabled; }");
}

/// Panels as cards: one framed card per top-level panel, and no frame at all on
/// the panels nested inside one - a border inside a border inside a border is what
/// made the CONTROL and CONFIGURATION columns look busy. The nested titles carry the
/// grouping on their own.
///
/// The padding here is the whole inset of a card: the layouts inside a QGroupBox
/// carry no margins of their own, so this is the only gap between the frame and the
/// first row. A nested box has no frame to inset from, only a title to clear, and
/// the title is drawn in the margin band above the box - so that band has to be as
/// tall as the title (roughly font size + 11 px) or the first row is drawn under it.
/// The nested title also sits at `left: 0`: any offset there is taken out of the
/// title's width, and a narrow column ("Control Type") clips the last letters.
QString cardStyle()
{
    return QStringLiteral(
            "QGroupBox { border: 1px solid @border; border-radius: 10px;"
            " background-color: @card; margin-top: 16px; padding: 8px;"
            " font-weight: 600; }"
            "QGroupBox::title { subcontrol-origin: margin; subcontrol-position: top left;"
            " left: 10px; padding: 0 4px; color: @textSecondary; }"
            "QGroupBox QGroupBox { border: none; background-color: transparent;"
            " margin-top: 22px; padding: 0; }"
            // Qt does not merge two rules for the same subcontrol the way CSS
            // cascades, so the nested title repeats the colour it wants.
            "QGroupBox QGroupBox::title { left: 0px; padding: 0 4px 0 0; color: @textSecondary; }");
}

/// Input fields: one height for every control on a row, a visible focus ring (Fusion
/// draws none once the field is styled) and the same border as the cards.
/// Styling a combo box at all takes its arrow away from the style engine, so the
/// drop-down is spelled out here like the spin-box buttons above.
QString inputStyle()
{
    return QStringLiteral(
            "QLineEdit, QComboBox, QSpinBox, QDoubleSpinBox { border: 1px solid @inputBorder;"
            " border-radius: 6px; padding: 3px 6px; min-height: 22px;"
            " background-color: @base; color: @text; selection-background-color: @accent;"
            " selection-color: @onAccent; }"
            "QLineEdit:focus, QComboBox:focus, QSpinBox:focus, QDoubleSpinBox:focus"
            " { border-color: @accentMark; }"
            "QLineEdit:disabled, QComboBox:disabled, QSpinBox:disabled,"
            " QDoubleSpinBox:disabled { background-color: @baseDisabled; color: @textDisabled;"
            " border-color: @border; }"
            "QComboBox::drop-down { subcontrol-origin: padding; subcontrol-position: center right;"
            " width: 20px; border: none; }"
            "QComboBox::down-arrow { image: url(:/icons/spin_down_@icons.svg);"
            " width: 8px; height: 5px; }"
            "QComboBox::down-arrow:disabled { image: url(:/icons/spin_down_@icons_disabled.svg); }"
            "QComboBox QAbstractItemView { border: 1px solid @border; border-radius: 6px;"
            " background-color: @card; color: @text; selection-background-color: @accent;"
            " selection-color: @onAccent; outline: none; }");
}

/// Lists and the two-column DEVICES tree. Fusion draws a header as a raised button,
/// which on a flat card reads as a row of toolbar buttons rather than as column
/// titles.
QString itemViewStyle()
{
    return QStringLiteral(
            "QListWidget, QTreeView { border: 1px solid @border; border-radius: 6px;"
            " background-color: @base; outline: none; }"
            "QListWidget::item { padding: 4px 6px; border-radius: 4px; }"
            "QListWidget::item:selected { background-color: @accent; color: @onAccent; }"
            // A tree row is several cells wide, so its cells keep square
            // corners: rounding each one draws a seam down the selected row.
            "QTreeView::item { padding: 4px 6px; border: none; }"
            "QTreeView::item:hover { background-color: @hover; }"
            "QTreeView::item:selected { background-color: @accent; color: @onAccent; }"
            "QHeaderView { background-color: transparent; }"
            // The right padding is the lane the sort arrow sits in; without it
            // the arrow would be drawn over a right-aligned column title.
            "QHeaderView::section { background-color: @header; color: @textSecondary;"
            " font-weight: 600; padding: 4px 18px 4px 6px; border: none;"
            " border-bottom: 1px solid @border; }"
            "QHeaderView::section:hover { background-color: @hover; color: @text; }"
            // The frame is rounded, so the outer corners of the header follow it.
            "QHeaderView::section:first { border-top-left-radius: 5px; }"
            "QHeaderView::section:last { border-top-right-radius: 5px; }"
            // Styling a section at all takes its sort arrow away from the style
            // engine; the spin-box triangles are the same mark at the same size.
            "QHeaderView::up-arrow, QHeaderView::down-arrow {"
            " subcontrol-origin: padding; subcontrol-position: center right;"
            " right: 6px; width: 8px; height: 5px; }"
            "QHeaderView::up-arrow { image: url(:/icons/spin_up_@icons.svg); }"
            "QHeaderView::down-arrow { image: url(:/icons/spin_down_@icons.svg); }");
}

/// Tabs that read as tabs: the inactive ones sit recessed on the window tint, the
/// selected one is a sheet in the card colour, flush with the panel below it. The
/// shape carries the selection on its own, so there is no coloured cap - an accent
/// bar up there pulls the eye away from the panel it belongs to.
QString tabStyle()
{
    return QStringLiteral(
            "QTabWidget::pane { border: none; border-top: 1px solid @border;"
            " background-color: transparent; top: -1px; }"
            "QTabBar { qproperty-drawBase: 0; background-color: transparent; }"
            "QTabBar::tab { background-color: @window; color: @textSecondary;"
            " border: 1px solid @border; border-bottom: none;"
            " border-top-left-radius: 7px; border-top-right-radius: 7px;"
            " padding: 5px 14px; margin-right: 2px; }"
            "QTabBar::tab:hover:!selected { background-color: @hover; color: @text; }"
            "QTabBar::tab:selected { background-color: @card; color: @text;"
            " border-color: @border; }"
            "QTabBar::tab:disabled { color: @textDisabled; }");
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
/// tags with a `role` property. The reading is the point of the panel, so it is the
/// value that carries the weight and the caption that recedes.
QString statusStyle()
{
    return QStringLiteral(
            "QStatusBar { background-color: transparent; border-top: 1px solid @border;"
            " color: @textSecondary; }"
            "QStatusBar::item { border: none; }"
            "QToolTip { background-color: @card; color: @text; border: 1px solid @inputBorder;"
            " padding: 3px; }"
            "QLabel[role=\"caption\"] { color: @textSecondary; }"
            "QLabel[role=\"value\"] { color: @text; font-weight: 600; }"
            "QLabel[role=\"unit\"] { color: @textMuted; }");
}

QColor color(const QString &hex)
{
    return QColor(hex);
}

/// The palette behind the stylesheet: what Fusion still draws itself (scroll bars,
/// menus, message boxes, the frame of an unstyled widget) takes its colours from
/// here, so it is built from the same tokens.
QPalette paletteFor(const Tokens &t)
{
    const QColor window = color(t.window);
    const QColor button = color(t.button);
    const QColor text = color(t.text);
    const QColor light = color(t.card).lighter(115);
    const QColor mid = color(t.inputBorder);
    const QColor dark = color(t.border).darker(120);

    QPalette palette(text, button, light, dark, mid, text, Qt::red, color(t.base), window);
    palette.setColor(QPalette::Midlight, mid.lighter(110));
    palette.setColor(QPalette::Shadow, dark.darker(130));
    palette.setColor(QPalette::AlternateBase, color(t.hover));
    palette.setColor(QPalette::ToolTipBase, color(t.card));
    palette.setColor(QPalette::ToolTipText, text);
    palette.setColor(QPalette::ButtonText, text);
    palette.setColor(QPalette::Highlight, color(t.accent));
    palette.setColor(QPalette::HighlightedText, color(t.onAccent));
    palette.setColor(QPalette::Link, color(t.accentMark));
    palette.setColor(QPalette::PlaceholderText, color(t.textMuted));

    const QColor disabled = color(t.textDisabled);
    palette.setColor(QPalette::Disabled, QPalette::Text, disabled);
    palette.setColor(QPalette::Disabled, QPalette::WindowText, disabled);
    palette.setColor(QPalette::Disabled, QPalette::ButtonText, disabled);
    palette.setColor(QPalette::Disabled, QPalette::Base, color(t.baseDisabled));
    palette.setColor(QPalette::Disabled, QPalette::Highlight, mid);
    return palette;
}

QPixmap tinted(const QString &path, const QColor &colour, int size)
{
    QPixmap out = QIcon(path).pixmap(QSize(size, size));
    if (out.isNull())
        return out;
    QPainter painter(&out);
    painter.setCompositionMode(QPainter::CompositionMode_SourceIn);
    painter.fillRect(out.rect(), colour);
    return out;
}

} // namespace

bool ThemeManager::isDark(const QString &theme)
{
    return theme.compare(QLatin1String("dark"), Qt::CaseInsensitive) == 0;
}

void ThemeManager::applyApplicationTheme(QApplication &app, const UiSettings &settings)
{
    app.setStyle(QStringLiteral("Fusion"));

    const Tokens &t = tokens(settings.theme);
    const QString styleSheet =
            QStringLiteral("QWidget { font-size: %1pt; }"
                           "QPushButton#EmergStopPushButton { font-size: %2pt; }")
                    .arg(settings.font_size)
                    .arg(settings.font_size + 6)
            + buttonStyle() + cardStyle() + inputStyle() + spinBoxStyle() + checkBoxStyle()
            + radioStyle() + sliderStyle() + tabStyle() + itemViewStyle() + scrollAreaStyle()
            + statusStyle();

    app.setPalette(paletteFor(t));
    app.setStyleSheet(fill(styleSheet, t));
}

void ThemeManager::applyWidgetTheme(QWidget *widget, const UiSettings &settings)
{
    if (!widget)
        return;
    QFont font = widget->font();
    font.setPointSize(settings.font_size);
    widget->setFont(font);
}

QIcon ThemeManager::icon(const QString &name, const QString &theme, int size)
{
    // The bundled glyphs are white artwork drawn for a filled button; on a quiet
    // button they take the text colour of the theme, and its disabled tint when the
    // button is off.
    const Tokens &t = tokens(theme);
    const QString path = QStringLiteral(":/icons/%1.svg").arg(name);
    QIcon out;
    out.addPixmap(tinted(path, color(t.text), size), QIcon::Normal);
    out.addPixmap(tinted(path, color(t.buttonDisabledText), size), QIcon::Disabled);
    return out;
}

QColor ThemeManager::foregroundColor(const QString &theme)
{
    return color(tokens(theme).text);
}

QColor ThemeManager::backgroundColor(const QString &theme)
{
    // The plot is a base surface inset in its card, like a field or the DEVICES
    // list, so on dark it reads as its own panel rather than a hole in the page.
    return color(tokens(theme).base);
}

QColor ThemeManager::gridColor(const QString &theme)
{
    return color(tokens(theme).plotGrid);
}

QColor ThemeManager::axisColor(const QString &theme)
{
    return color(tokens(theme).inputBorder);
}

QColor ThemeManager::axisLabelColor(const QString &theme)
{
    return color(tokens(theme).textSecondary);
}

QColor ThemeManager::measuredColor(const QString &theme)
{
    return color(tokens(theme).measured);
}

QColor ThemeManager::setpointColor(const QString &theme)
{
    return color(tokens(theme).setpoint);
}

QColor ThemeManager::secondaryColor(const QString &theme)
{
    return color(tokens(theme).secondary);
}

QColor ThemeManager::restoreIconColor(const QString &theme)
{
    return color(tokens(theme).textMuted);
}

QColor ThemeManager::restoreIconHoverColor(const QString &theme)
{
    return color(tokens(theme).accentMark);
}

QPixmap ThemeManager::logo(const QString &theme, int width)
{
    // The artwork is a single-colour mark (the wordmark is cut out of its box and
    // shows the surface behind), so it is scaled first and then flood-tinted:
    // scaling a tinted copy would blur the tint into the transparent letters.
    QPixmap out = QPixmap(QStringLiteral(":/icons/voltbro_logo.png"))
                          .scaledToWidth(width, Qt::SmoothTransformation);
    if (out.isNull())
        return out;
    QPainter painter(&out);
    painter.setCompositionMode(QPainter::CompositionMode_SourceIn);
    painter.fillRect(out.rect(), color(tokens(theme).logo));
    return out;
}

void ThemeManager::applyPlotTheme(QCustomPlot *plot, const QString &theme, int fontSize)
{
    if (!plot)
        return;

    const Tokens &t = tokens(theme);
    const QColor background = backgroundColor(theme);
    const QColor foreground = foregroundColor(theme);
    const QColor grid = gridColor(theme);
    const QColor axisLine = axisColor(theme);
    const QColor axisText = axisLabelColor(theme);
    // The zero line sits one step above the grid, not at full axis contrast, so it
    // reads as a reference and not as a bar across the chart.
    const QColor zeroLine = isDark(theme) ? grid.lighter(150) : axisLine;

    plot->setBackground(background);

    if (plot->legend) {
        QColor legendBack = color(t.card);
        legendBack.setAlpha(220);
        plot->legend->setBrush(QBrush(legendBack));
        plot->legend->setBorderPen(QPen(color(t.border)));
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
