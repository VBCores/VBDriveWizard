#include "ui/plot_controller.h"

#include "core/units.h"
#include "third_party/qcustomplot/qcustomplot.h"
#include "ui/plot_crosshair.h"
#include "ui/plot_icon_button.h"
#include "ui/theme_manager.h"

#include <QActionGroup>
#include <QMenu>
#include <QMouseEvent>
#include <QPlainTextEdit>
#include <QSaveFile>
#include <QStackedLayout>
#include <QTextStream>

#include <algorithm>
#include <cmath>
#include <functional>

namespace {
constexpr double kYAxisMargin = 1.2;
constexpr int kMaxLogLines = 2000;
/// A delivery delay this far from the last block's is not a late sample: the drive's
/// clock has restarted or wrapped, and the delay envelope starts afresh.
constexpr qint64 kTelemetryResyncUs = 1'000'000;
/// The drive's clock is mapped onto the host's one stretch of this length at a time.
/// A block holds several delivery bursts, so its least delayed sample is close to the
/// true transport delay, and the drift within one stays well under a millisecond.
constexpr qint64 kAnchorBlockUs = 100'000;
/// Blocks of the delay envelope kept: the one being filled and the finished ones that
/// samples still waiting in m_unpaired can fall between.
constexpr int kMaxAnchors = 4;
/// How much set-point history is kept for interpolation. Only the span between the
/// oldest unresolved telemetry sample and now is really needed - one batch interval -
/// so a second is generous and keeps the buffer small.
constexpr double kSetpointHistoryS = 1.0;
/// How long a telemetry sample waits for the set-point report of its instant. Reports
/// come every 10 ms, so only a set-point stream that has stopped runs into this; the
/// sample is then drawn against the last report instead of being held back.
constexpr double kSetpointWaitS = 0.2;

/// Vertical gap between two panels; the border that can be dragged lies in its middle.
constexpr int kPanelGap = 16;
/// How far from the middle of the gap a press still grabs the border.
constexpr double kBorderGrabPx = 5.0;
/// The least height of a panel's axis rect while a border is dragged.
constexpr int kMinRectHeight = 40;
/// QCustomPlot's least margins of an axis rect, and the bottom one of a panel with
/// another under it, whose time axis has no labels: the border hugs its axis line.
constexpr QMargins kRectMargins(15, 15, 15, 15);
constexpr int kStackedBottomMargin = 5;

/// The title opens the panel's menu; the icon beside the legend maximises the panel.
const QString kMenuMark = QStringLiteral(" ▾");
const QString kMaximizeGlyph = QStringLiteral("panel_maximize_white");
const QString kRestoreGlyph = QStringLiteral("panel_restore_white");

/// The quantities a panel can show, in menu order.
constexpr PlotSignal kSelectableSignals[] = {PlotSignal::Position,    PlotSignal::Velocity,
                                             PlotSignal::Torque,      PlotSignal::Temperature,
                                             PlotSignal::Current,     PlotSignal::Encoder};

/// Draws the borders between the panels into the gaps the layout leaves for them.
class PanelBorders : public QCPLayerable
{
public:
    using LinesFn = std::function<QVector<QLineF>()>;

    PanelBorders(QCustomPlot *plot, LinesFn lines)
        : QCPLayerable(plot, QStringLiteral("background"))
        , m_lines(std::move(lines))
    {
    }

    void setColors(const QColor &normal, const QColor &active)
    {
        m_normal = normal;
        m_active = active;
    }
    /// The border drawn in the active colour, or -1.
    void setActive(int index) { m_activeIndex = index; }
    int active() const { return m_activeIndex; }

protected:
    void applyDefaultAntialiasingHint(QCPPainter *painter) const override
    {
        painter->setAntialiasing(false);
    }

    void draw(QCPPainter *painter) override
    {
        // Asked for at draw time: the gaps are only known once the layout is updated.
        const QVector<QLineF> lines = m_lines();
        for (int k = 0; k < lines.size(); ++k) {
            painter->setPen(QPen(k == m_activeIndex ? m_active : m_normal, 1));
            painter->drawLine(QLineF(lines[k].x1(), qRound(lines[k].y1()), lines[k].x2(),
                                     qRound(lines[k].y2())));
        }
    }

private:
    LinesFn m_lines;
    QColor m_normal;
    QColor m_active;
    int m_activeIndex = -1;
};
} // namespace

PlotController::PlotController(QObject *parent)
    : QObject(parent)
{
    for (auto &channel : m_channels)
        channel.reset(new QCPGraphDataContainer);
    m_noData.reset(new QCPGraphDataContainer);
    m_panels[0].signal = PlotSignal::Position;
    m_panels[1].signal = PlotSignal::Velocity;
    m_panels[2].signal = PlotSignal::Torque;
    connect(&m_drawTimer, &QTimer::timeout, this, &PlotController::onDrawTimer);
}

void PlotController::setupPlot(QWidget *hostWidget)
{
    if (!hostWidget || m_initialized)
        return;

    m_stack = new QStackedLayout(hostWidget);
    m_stack->setContentsMargins(0, 0, 0, 0);

    m_plot = new QCustomPlot(hostWidget);
    // Standard QCustomPlot recipe for dense live data.
    m_plot->setNoAntialiasingOnDrag(true);
    m_plot->setNotAntialiasedElements(QCP::aeAll);
    m_plot->setAntialiasedElements(QCP::aeNone);
    m_plot->setPlottingHints(QCP::phFastPolylines | QCP::phCacheLabels);
    m_plot->setSelectionRectMode(QCP::srmNone);
    m_plot->setAutoAddPlottableToLegend(false);
    // The cursor changes over the borders and the titles.
    m_plot->setMouseTracking(true);
    m_plot->installEventFilter(this);

    // The panels replace the default axis rect and its legend.
    m_plot->plotLayout()->clear();
    m_plot->plotLayout()->setRowSpacing(kPanelGap);
    m_marginGroup = new QCPMarginGroup(m_plot);

    m_measure = new PlotMeasurementTool(m_plot, this);
    connect(m_measure, &PlotMeasurementTool::measurementChanged, this,
            &PlotController::measurementChanged);
    m_measure->setEnabled(!m_liveMode);
    m_crosshair = new PlotCrosshairTool(m_plot, this);

    for (int i = 0; i < kPanelCount; ++i)
        createPanel(i);
    m_borders = new PanelBorders(m_plot, [this] { return borderLines(); });

    connect(m_plot, &QCustomPlot::legendClick, this,
            [this](QCPLegend *, QCPAbstractLegendItem *item, QMouseEvent *event) {
                auto *plottableItem = qobject_cast<QCPPlottableLegendItem *>(item);
                if (!plottableItem || event->button() != Qt::LeftButton)
                    return;
                QCPAbstractPlottable *trace = plottableItem->plottable();
                trace->setVisible(!trace->visible());
                styleHeaders(m_theme);
                m_plot->replot(QCustomPlot::rpQueuedReplot);
            });
    connect(m_plot, &QCustomPlot::axisDoubleClick, this,
            [this](QCPAxis *axis, QCPAxis::SelectablePart, QMouseEvent *) {
                for (Panel &panel : m_panels) {
                    if (panel.rect != axis->axisRect() || axis->axisType() != QCPAxis::atLeft)
                        continue;
                    autoscaleY(panel, panel.rect->axis(QCPAxis::atBottom)->range());
                    m_plot->replot(QCustomPlot::rpQueuedReplot);
                }
            });
    // Kept from the window too, which would offer its tool bar menu instead.
    m_plot->setContextMenuPolicy(Qt::PreventContextMenu);

    m_logView = new QPlainTextEdit(hostWidget);
    m_logView->setReadOnly(true);
    m_logView->setMaximumBlockCount(kMaxLogLines);
    m_logView->setLineWrapMode(QPlainTextEdit::NoWrap);

    m_stack->addWidget(m_plot);
    m_stack->addWidget(m_logView);
    m_stack->setCurrentWidget(m_logVisible ? static_cast<QWidget *>(m_logView)
                                           : static_cast<QWidget *>(m_plot));

    m_clockStartUs = hostTimeUs();
    m_initialized = true;

    for (int i = 0; i < kPanelCount; ++i)
        configurePanel(i);
    setLiveMode(m_liveMode);
    applySettings(m_settings);
    retranslate();
}

void PlotController::createPanel(int index)
{
    Panel &panel = m_panels[index];
    // Built top-down: an element takes its plot from the layout it is added to, and
    // the legend has to be in the plot before traces can be added to it.
    panel.cell = new QCPLayoutGrid;
    m_plot->plotLayout()->addElement(index, 0, panel.cell);
    panel.cell->setRowSpacing(0);

    panel.header = new QCPLayoutGrid;
    panel.cell->addElement(0, 0, panel.header);
    panel.header->setColumnSpacing(0);
    panel.header->setSizeConstraintRect(QCPLayoutElement::scrOuterRect);

    panel.title = new QCPTextElement(m_plot);
    panel.title->setTextFlags(Qt::AlignLeft | Qt::AlignVCenter);
    panel.title->setMargins(QMargins(4, 2, 4, 2));
    panel.header->addElement(0, 0, panel.title);

    panel.legend = new QCPLegend;
    panel.header->addElement(0, 1, panel.legend);
    panel.legend->setLayer(QStringLiteral("legend"));
    panel.legend->setFillOrder(QCPLayoutGrid::foColumnsFirst);
    panel.legend->setSelectableParts(QCPLegend::spNone);
    panel.legend->setMargins(QMargins(8, 2, 0, 2));
    panel.legend->setColumnSpacing(14);
    panel.legend->setIconSize(20, 10);
    panel.legend->setSizeConstraintRect(QCPLayoutElement::scrOuterRect);

    // Takes the width the title and the legend leave, so the mark sits at the right.
    panel.header->addElement(0, 2, new QCPLayoutElement(m_plot));

    panel.maximize = new PlotIconButton(m_plot);
    panel.maximize->setMargins(QMargins(4, 2, 8, 2));
    panel.header->addElement(0, 3, panel.maximize);
    // The texts would share the spare width with the spacer otherwise.
    panel.header->setColumnStretchFactors({1e-3, 1e-3, 1.0, 1e-3});

    panel.rect = new QCPAxisRect(m_plot);
    panel.cell->addElement(1, 0, panel.rect);
    panel.rect->setMarginGroup(QCP::msLeft | QCP::msRight, m_marginGroup);

    QCPAxis *keyAxis = panel.rect->axis(QCPAxis::atBottom);
    QCPAxis *valueAxis = panel.rect->axis(QCPAxis::atLeft);
    panel.measured = m_plot->addGraph(keyAxis, valueAxis);
    panel.measured->setAdaptiveSampling(true);
    panel.companion = m_plot->addGraph(keyAxis, valueAxis);
    panel.companion->setAdaptiveSampling(true);

    m_crosshair->addGraph(panel.measured);
    m_crosshair->addGraph(panel.companion);
    m_measure->addAxisRect(panel.rect);

    connect(panel.title, &QCPTextElement::clicked, this, [this, index](QMouseEvent *event) {
        if (event->button() == Qt::LeftButton)
            showPanelMenu(index, event->globalPosition().toPoint());
    });
    connect(panel.maximize, &PlotIconButton::clicked, this, [this, index](QMouseEvent *event) {
        if (event->button() == Qt::LeftButton)
            toggleMaximized(index);
    });
    connect(keyAxis, qOverload<const QCPRange &>(&QCPAxis::rangeChanged), this,
            &PlotController::syncXRange);
}

void PlotController::applySettings(const UiSettings &settings)
{
    m_settings = settings;
    // Autoscale the value axes about twice a second rather than every frame.
    m_rescaleIntervalTicks = qMax(1, m_settings.plot_draw_rate_hz / 2);

    const int intervalMs =
            qMax(1, static_cast<int>(1000.0 / qMax(1, m_settings.plot_draw_rate_hz)));
    m_drawTimer.setInterval(intervalMs);
    if (!m_drawTimer.isActive())
        m_drawTimer.start();

    if (!m_initialized)
        return;

    if (std::isfinite(m_rightKey)) {
        const double left = qMax(0.0, m_rightKey - m_settings.plot_time_window_s);
        for (const auto &channel : m_channels)
            channel->removeBefore(left);
    }

    QFont logFont = m_logView->font();
    logFont.setPointSize(m_settings.plot_font_size);
    logFont.setFamily(QStringLiteral("monospace"));
    m_logView->setFont(logFont);

    applyTheme(m_theme);
}

void PlotController::applyTheme(const QString &theme)
{
    m_theme = theme;
    if (!m_initialized)
        return;
    ThemeManager::applyPlotTheme(m_plot, theme, m_settings.plot_font_size);
    applyPens(theme);
    styleHeaders(theme);
    m_measure->applyTheme(theme);
    m_crosshair->applyTheme(theme, m_settings.plot_font_size);
    static_cast<PanelBorders *>(m_borders)
            ->setColors(ThemeManager::plotSplitterColor(theme, false),
                        ThemeManager::plotSplitterColor(theme, true));
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

void PlotController::applyPens(const QString &theme)
{
    for (Panel &panel : m_panels) {
        panel.measured->setPen(
                QPen(ThemeManager::measuredColor(theme), m_settings.plot_line_width));
        const bool setpoint = signalInfo(panel.signal).companionIsSetpoint;
        QPen companion(setpoint ? ThemeManager::setpointColor(theme)
                                : ThemeManager::secondaryColor(theme),
                       m_settings.plot_line_width);
        if (setpoint)
            companion.setStyle(Qt::DashLine);
        panel.companion->setPen(companion);
    }
}

void PlotController::styleHeaders(const QString &theme)
{
    const QColor text = ThemeManager::foregroundColor(theme);
    const QColor muted = ThemeManager::mutedTextColor(theme);
    QFont font = m_plot->font();
    font.setPointSize(m_settings.plot_font_size);

    for (Panel &panel : m_panels) {
        panel.title->setFont(font);
        panel.title->setTextColor(text);
        panel.maximize->setColor(text);
        // The header is a row of the panel, not a box over the traces.
        panel.legend->setBrush(Qt::NoBrush);
        panel.legend->setBorderPen(Qt::NoPen);
        panel.legend->setFont(font);
        for (int i = 0; i < panel.legend->itemCount(); ++i) {
            auto *item = qobject_cast<QCPPlottableLegendItem *>(panel.legend->item(i));
            if (!item)
                continue;
            item->setFont(font);
            // A trace hidden from its legend entry stays listed, dimmed.
            item->setTextColor(item->plottable()->visible() ? text : muted);
        }

        // The legend keeps its natural width and the header the height of one line.
        // The hints are protected in QCPTextElement, public in the base.
        const QCPLayoutElement *title = panel.title;
        const QCPLayoutElement *legend = panel.legend;
        panel.legend->setMaximumSize(legend->minimumOuterSizeHint());
        const int height = qMax(title->minimumOuterSizeHint().height(),
                                legend->minimumOuterSizeHint().height());
        panel.header->setMinimumSize(0, height);
        panel.header->setMaximumSize(QWIDGETSIZE_MAX, height);
    }
}

void PlotController::retranslate()
{
    if (!m_initialized)
        return;
    for (int i = 0; i < kPanelCount; ++i) {
        Panel &panel = m_panels[i];
        panel.measured->setName(primaryName(panel.signal));
        panel.companion->setName(secondaryName(panel.signal));
    }
    updateTitles();
    rebuildLayout();
}

// --- signals -----------------------------------------------------------------------

PlotController::SignalInfo PlotController::signalInfo(PlotSignal signal)
{
    switch (signal) {
    case PlotSignal::Position:
        return {Channel::Position, Channel::PositionTarget, true};
    case PlotSignal::Velocity:
        return {Channel::Velocity, Channel::VelocityTarget, true};
    case PlotSignal::Torque:
        return {Channel::Torque, Channel::TorqueTarget, true};
    case PlotSignal::Temperature:
        return {Channel::TempMcu, Channel::TempStator, false};
    case PlotSignal::Current:
        return {Channel::BusCurrent, Channel::Count, false};
    case PlotSignal::Encoder:
        return {Channel::EncoderRotor, Channel::EncoderShaft, false};
    case PlotSignal::None:
        break;
    }
    return {Channel::Count, Channel::Count, false};
}

bool PlotController::isAngular(Channel channel)
{
    switch (channel) {
    case Channel::Position:
    case Channel::PositionTarget:
    case Channel::Velocity:
    case Channel::VelocityTarget:
        return true;
    default:
        return false;
    }
}

int PlotController::setpointSlot(ServoControlType type)
{
    switch (type) {
    case ServoControlType::Position:
        return 0;
    case ServoControlType::Velocity:
        return 1;
    case ServoControlType::Torque:
    case ServoControlType::Voltage:
        break;
    }
    return 2;
}

PlotController::Channel PlotController::targetChannel(int slot)
{
    switch (slot) {
    case 0:
        return Channel::PositionTarget;
    case 1:
        return Channel::VelocityTarget;
    default:
        return Channel::TorqueTarget;
    }
}

QString PlotController::primaryName(PlotSignal signal) const
{
    switch (signal) {
    case PlotSignal::Position:
        return tr("Position");
    case PlotSignal::Velocity:
        return tr("Velocity");
    case PlotSignal::Torque:
        return tr("Torque");
    case PlotSignal::Temperature:
        return tr("MCU");
    case PlotSignal::Current:
        return tr("Bus current");
    case PlotSignal::Encoder:
        return tr("Rotor");
    case PlotSignal::None:
        break;
    }
    return QString();
}

QString PlotController::secondaryName(PlotSignal signal) const
{
    switch (signal) {
    case PlotSignal::Position:
    case PlotSignal::Velocity:
    case PlotSignal::Torque:
        return tr("Target");
    case PlotSignal::Temperature:
        return tr("Stator");
    case PlotSignal::Encoder:
        return tr("Shaft");
    default:
        break;
    }
    return QString();
}

QString PlotController::titleText(PlotSignal signal) const
{
    switch (signal) {
    case PlotSignal::Position:
        return tr("Position, %1").arg(QString::fromLatin1(units::angleSuffix(m_angleUnit)));
    case PlotSignal::Velocity:
        return tr("Velocity, %1")
                .arg(QString::fromLatin1(units::angularVelocitySuffix(m_angleUnit)));
    case PlotSignal::Torque:
        return tr("Torque, N*m");
    case PlotSignal::Temperature:
        return tr("Temperature, C");
    case PlotSignal::Current:
        return tr("Bus current, A");
    case PlotSignal::Encoder:
        return tr("Encoder, counts");
    case PlotSignal::None:
        break;
    }
    return QString();
}

/// Column names stay untranslated, for scripts that read the file back.
QString PlotController::csvColumn(Channel channel) const
{
    const QString angle = m_angleUnit == AngleUnit::Degrees ? QStringLiteral("deg")
                                                            : QStringLiteral("rad");
    switch (channel) {
    case Channel::Position:
        return QStringLiteral("position_") + angle;
    case Channel::PositionTarget:
        return QStringLiteral("position_target_") + angle;
    case Channel::Velocity:
        return QStringLiteral("velocity_%1_s").arg(angle);
    case Channel::VelocityTarget:
        return QStringLiteral("velocity_target_%1_s").arg(angle);
    case Channel::Torque:
        return QStringLiteral("torque_nm");
    case Channel::TorqueTarget:
        return QStringLiteral("torque_target_nm");
    case Channel::TempMcu:
        return QStringLiteral("temp_mcu_c");
    case Channel::TempStator:
        return QStringLiteral("temp_stator_c");
    case Channel::BusCurrent:
        return QStringLiteral("bus_current_a");
    case Channel::EncoderRotor:
        return QStringLiteral("encoder_rotor_counts");
    case Channel::EncoderShaft:
        return QStringLiteral("encoder_shaft_counts");
    case Channel::Count:
        break;
    }
    return QString();
}

double PlotController::angleScale() const
{
    return m_angleUnit == AngleUnit::Degrees ? units::kRadToDeg : 1.0;
}

// --- panels ---------------------------------------------------------------------------

void PlotController::setPanels(const QVector<PlotSignal> &panelSignals,
                               const QVector<double> &heights)
{
    for (int i = 0; i < kPanelCount; ++i) {
        m_panels[i].signal = i < panelSignals.size() ? panelSignals[i] : PlotSignal::None;
        const double height = i < heights.size() ? heights[i] : 1.0;
        m_panels[i].height = std::isfinite(height) && height > 0.0 ? height : 1.0;
    }
    if (panelCount() == 0)
        m_panels[0].signal = PlotSignal::Position;
    m_maximized = -1;
    if (!m_initialized)
        return;
    for (int i = 0; i < kPanelCount; ++i)
        configurePanel(i);
    m_measure->clear();
    rebuildLayout();
}

QVector<PlotSignal> PlotController::panelSignals() const
{
    QVector<PlotSignal> result;
    for (const Panel &panel : m_panels)
        result << panel.signal;
    return result;
}

QVector<double> PlotController::panelHeights() const
{
    QVector<double> result;
    for (const Panel &panel : m_panels)
        result << panel.height;
    return result;
}

bool PlotController::isShown(int index) const
{
    return m_panels[index].signal != PlotSignal::None
            && (m_maximized < 0 || m_maximized == index);
}

int PlotController::panelCount() const
{
    return static_cast<int>(std::count_if(m_panels.cbegin(), m_panels.cend(), [](const Panel &p) {
        return p.signal != PlotSignal::None;
    }));
}

void PlotController::configurePanel(int index)
{
    Panel &panel = m_panels[index];
    const SignalInfo info = signalInfo(panel.signal);
    const bool hasMeasured = info.measured != Channel::Count;
    const bool hasCompanion = info.companion != Channel::Count;

    panel.measured->setData(hasMeasured ? m_channels[static_cast<int>(info.measured)] : m_noData);
    panel.companion->setData(hasCompanion ? m_channels[static_cast<int>(info.companion)]
                                          : m_noData);
    panel.measured->setVisible(hasMeasured);
    panel.companion->setVisible(hasCompanion);
    panel.measured->setName(primaryName(panel.signal));
    panel.companion->setName(secondaryName(panel.signal));

    panel.legend->clearItems();
    if (hasMeasured)
        panel.measured->addToLegend(panel.legend);
    if (hasCompanion)
        panel.companion->addToLegend(panel.legend);

    applyPens(m_theme);
    styleHeaders(m_theme);
    updateTitles();
}

void PlotController::setPanelSignal(int index, PlotSignal signal)
{
    Panel &panel = m_panels[index];
    if (panel.signal == signal)
        return;
    panel.signal = signal;
    configurePanel(index);
    m_measure->clear();
    autoscaleY(panel, panel.rect->axis(QCPAxis::atBottom)->range());
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

void PlotController::updateTitles()
{
    for (int i = 0; i < kPanelCount; ++i) {
        Panel &panel = m_panels[i];
        const QString title = titleText(panel.signal);
        panel.title->setText(m_exporting ? title : title + kMenuMark);
        // Maximising only makes sense with more than one panel.
        const bool canMaximize = m_maximized == i || panelCount() > 1;
        panel.maximize->setGlyph(m_exporting || !canMaximize
                                         ? QString()
                                         : (m_maximized == i ? kRestoreGlyph : kMaximizeGlyph));
    }
}

void PlotController::rebuildLayout()
{
    if (!m_initialized)
        return;
    QCPLayoutGrid *root = m_plot->plotLayout();
    for (Panel &panel : m_panels) {
        if (panel.cell->layout() == root)
            root->take(panel.cell);
    }
    root->simplify();

    int row = 0;
    int last = -1;
    for (int i = 0; i < kPanelCount; ++i) {
        Panel &panel = m_panels[i];
        const bool shown = isShown(i);
        panel.cell->setVisible(shown);
        // A hidden rect would still widen the common margins with its tick labels.
        panel.rect->setMarginGroup(QCP::msLeft | QCP::msRight, shown ? m_marginGroup : nullptr);
        if (!shown)
            continue;
        root->addElement(row, 0, panel.cell);
        root->setRowStretchFactor(row, panel.height);
        ++row;
        last = i;
    }

    // One time axis under the stack: the panels above keep only its grid.
    for (int i = 0; i < kPanelCount; ++i) {
        QCPAxis *keyAxis = m_panels[i].rect->axis(QCPAxis::atBottom);
        keyAxis->setTickLabels(i == last);
        keyAxis->setLabel(i == last ? tr("t, s") : QString());
        QMargins margins = kRectMargins;
        if (i != last)
            margins.setBottom(kStackedBottomMargin);
        m_panels[i].rect->setMinimumMargins(margins);
    }
    updateTitles();
    // Only the elements in the layout took the theme; a panel back on show catches up.
    applyTheme(m_theme);
}

void PlotController::showPanelMenu(int index, const QPoint &globalPos)
{
    QMenu menu(m_plot);
    auto *group = new QActionGroup(&menu);
    for (PlotSignal signal : kSelectableSignals) {
        QAction *action = menu.addAction(titleText(signal));
        action->setCheckable(true);
        action->setChecked(m_panels[index].signal == signal);
        action->setActionGroup(group);
        connect(action, &QAction::triggered, this,
                [this, index, signal] { setPanelSignal(index, signal); });
    }
    menu.addSeparator();
    QAction *fit = menu.addAction(tr("Fit to data"));
    connect(fit, &QAction::triggered, this, [this, index] {
        Panel &panel = m_panels[index];
        autoscaleY(panel, panel.rect->axis(QCPAxis::atBottom)->range());
        m_plot->replot(QCustomPlot::rpQueuedReplot);
    });
    QAction *maximize =
            menu.addAction(m_maximized == index ? tr("Restore panels") : tr("Maximize panel"));
    maximize->setEnabled(m_maximized == index || panelCount() > 1);
    connect(maximize, &QAction::triggered, this, [this, index] { toggleMaximized(index); });
    menu.addSeparator();
    QAction *add = menu.addAction(tr("Add panel"));
    add->setEnabled(panelCount() < kPanelCount);
    connect(add, &QAction::triggered, this, &PlotController::addPanel);
    QAction *hide = menu.addAction(tr("Hide panel"));
    hide->setEnabled(panelCount() > 1);
    connect(hide, &QAction::triggered, this, [this, index] { hidePanel(index); });
    menu.exec(globalPos);
}

void PlotController::addPanel()
{
    const auto hidden = std::find_if(m_panels.begin(), m_panels.end(), [](const Panel &p) {
        return p.signal == PlotSignal::None;
    });
    if (hidden == m_panels.end())
        return;
    // A quantity that is not on show yet, if any is left.
    PlotSignal signal = PlotSignal::Position;
    for (PlotSignal candidate : kSelectableSignals) {
        const bool onShow = std::any_of(m_panels.cbegin(), m_panels.cend(),
                                        [candidate](const Panel &p) { return p.signal == candidate; });
        if (!onShow) {
            signal = candidate;
            break;
        }
    }
    hidden->signal = signal;
    m_maximized = -1;
    configurePanel(static_cast<int>(hidden - m_panels.begin()));
    autoscaleY(*hidden, m_panels[0].rect->axis(QCPAxis::atBottom)->range());
    m_measure->clear();
    rebuildLayout();
}

void PlotController::hidePanel(int index)
{
    if (panelCount() <= 1)
        return;
    m_panels[index].signal = PlotSignal::None;
    if (m_maximized == index)
        m_maximized = -1;
    configurePanel(index);
    m_measure->clear();
    rebuildLayout();
}

void PlotController::toggleMaximized(int index)
{
    if (m_maximized != index && panelCount() <= 1)
        return;
    m_maximized = m_maximized == index ? -1 : index;
    m_measure->clear();
    rebuildLayout();
}

void PlotController::autoscaleY(Panel &panel, const QCPRange &keys)
{
    bool found = false;
    QCPRange range;
    for (QCPGraph *graph : {panel.measured, panel.companion}) {
        if (!graph->visible())
            continue;
        bool foundHere = false;
        const QCPRange here = graph->getValueRange(foundHere, QCP::sdBoth, keys);
        if (!foundHere)
            continue;
        if (found)
            range.expand(here);
        else
            range = here;
        found = true;
    }
    if (!found || !std::isfinite(range.lower) || !std::isfinite(range.upper))
        return;

    double lower = range.lower;
    double upper = range.upper;
    if (lower <= 0.0 && upper >= 0.0) {
        const double limit = qMax(std::abs(lower), std::abs(upper)) * kYAxisMargin;
        lower = -limit;
        upper = limit;
    } else {
        lower = lower < 0.0 ? lower * kYAxisMargin : lower / kYAxisMargin;
        upper = upper < 0.0 ? upper / kYAxisMargin : upper * kYAxisMargin;
    }
    if (qFuzzyCompare(lower, upper)) {
        const double pad = qMax(1.0, std::abs(lower) * 0.2);
        lower -= pad;
        upper += pad;
    }
    panel.rect->axis(QCPAxis::atLeft)->setRange(lower, upper);
}

void PlotController::setXRange(const QCPRange &range)
{
    m_syncingX = true;
    for (Panel &panel : m_panels)
        panel.rect->axis(QCPAxis::atBottom)->setRange(range);
    m_syncingX = false;
}

void PlotController::syncXRange(const QCPRange &range)
{
    // A pan or zoom of one panel moves them all: they share the time axis.
    if (!m_syncingX)
        setXRange(range);
}

// --- border dragging ----------------------------------------------------------------

QVector<QLineF> PlotController::borderLines() const
{
    QVector<QLineF> lines;
    if (m_maximized >= 0)
        return lines;
    QVector<int> shown;
    for (int i = 0; i < kPanelCount; ++i) {
        if (isShown(i))
            shown << i;
    }
    for (int k = 0; k + 1 < shown.size(); ++k) {
        const QRect upper = m_panels[shown[k]].cell->outerRect();
        const double y = (upper.bottom() + m_panels[shown[k + 1]].cell->outerRect().top()) / 2.0;
        // As wide as the axis rects, which the margin group lines up.
        const QRect rect = m_panels[shown[k]].rect->rect();
        lines << QLineF(rect.left(), y, rect.right(), y);
    }
    return lines;
}

int PlotController::borderAt(const QPointF &pos) const
{
    const QVector<QLineF> lines = borderLines();
    for (int k = 0; k < lines.size(); ++k) {
        if (std::abs(pos.y() - lines[k].y1()) <= kBorderGrabPx)
            return k;
    }
    return -1;
}

void PlotController::setActiveBorder(int index)
{
    auto *borders = static_cast<PanelBorders *>(m_borders);
    if (borders->active() == index)
        return;
    borders->setActive(index);
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

void PlotController::dragBorder(double y)
{
    QVector<int> shown;
    for (int i = 0; i < kPanelCount; ++i) {
        if (isShown(i))
            shown << i;
    }
    if (m_dragBorder < 0 || m_dragBorder + 1 >= shown.size())
        return;

    // The heights of the panels on show, in pixels, with the two around the border
    // sharing their sum at the cursor.
    QVector<double> pixels;
    for (int i : std::as_const(shown))
        pixels << m_panels[i].cell->outerRect().height();
    Panel &upper = m_panels[shown[m_dragBorder]];
    const int k = m_dragBorder;
    const double pair = pixels[k] + pixels[k + 1];
    const double least = upper.header->maximumSize().height() + kMinRectHeight;
    if (pair < 2 * least)
        return;
    pixels[k] = std::clamp(y - upper.cell->outerRect().top(), least, pair - least);
    pixels[k + 1] = pair - pixels[k];

    // Kept relative, around 1, so a hidden panel's height still compares.
    double sum = 0.0;
    for (double px : std::as_const(pixels))
        sum += px;
    for (int j = 0; j < shown.size(); ++j) {
        m_panels[shown[j]].height = pixels[j] * shown.size() / sum;
        m_plot->plotLayout()->setRowStretchFactor(j, m_panels[shown[j]].height);
    }
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

void PlotController::updateCursor(const QPointF &pos)
{
    Qt::CursorShape shape = Qt::ArrowCursor;
    // Only a border being dragged is highlighted; a hovered one just changes the cursor.
    setActiveBorder(m_dragBorder);
    if (m_dragBorder >= 0 || borderAt(pos) >= 0) {
        shape = Qt::SplitVCursor;
    } else {
        for (int i = 0; i < kPanelCount; ++i) {
            const Panel &panel = m_panels[i];
            if (!isShown(i))
                continue;
            if (panel.title->outerRect().contains(pos.toPoint())
                || (!panel.maximize->glyph().isEmpty()
                    && panel.maximize->outerRect().contains(pos.toPoint()))) {
                shape = Qt::PointingHandCursor;
                break;
            }
        }
    }
    if (shape == m_cursor)
        return;
    m_cursor = shape;
    if (shape == Qt::ArrowCursor)
        m_plot->unsetCursor();
    else
        m_plot->setCursor(shape);
}

bool PlotController::eventFilter(QObject *watched, QEvent *event)
{
    if (watched != m_plot)
        return QObject::eventFilter(watched, event);

    switch (event->type()) {
    case QEvent::MouseButtonPress: {
        auto *mouse = static_cast<QMouseEvent *>(event);
        // QCustomPlot hands a press to the zoom rectangle whenever one is enabled, and
        // then never to the titles and the legends, which take clicks only outside the
        // axis rects anyway. So in a pause the rectangle is enabled only over these.
        m_plot->setSelectionRectMode(!m_liveMode && m_plot->axisRectAt(mouse->position())
                                             ? QCP::srmZoom
                                             : QCP::srmNone);
        if (mouse->button() != Qt::LeftButton)
            break;
        m_dragBorder = borderAt(mouse->position());
        // The press is the border's: no pan, zoom rectangle or measuring point.
        if (m_dragBorder >= 0) {
            setActiveBorder(m_dragBorder);
            return true;
        }
        break;
    }
    case QEvent::MouseMove: {
        auto *mouse = static_cast<QMouseEvent *>(event);
        if (m_dragBorder >= 0) {
            dragBorder(mouse->position().y());
            return true;
        }
        updateCursor(mouse->position());
        break;
    }
    case QEvent::MouseButtonRelease:
        if (m_dragBorder >= 0) {
            m_dragBorder = -1;
            updateCursor(static_cast<QMouseEvent *>(event)->position());
            return true;
        }
        break;
    case QEvent::Leave:
        if (m_dragBorder < 0)
            setActiveBorder(-1);
        if (m_dragBorder < 0 && m_cursor != Qt::ArrowCursor) {
            m_cursor = Qt::ArrowCursor;
            m_plot->unsetCursor();
        }
        break;
    default:
        break;
    }
    return QObject::eventFilter(watched, event);
}

// --- modes --------------------------------------------------------------------------

void PlotController::setAngleUnit(AngleUnit unit)
{
    if (m_angleUnit == unit)
        return;
    const double before = angleScale();
    m_angleUnit = unit;
    // The traces hold display units, so what is already on screen is converted in
    // place: a paused plot keeps its picture, a live one keeps its history.
    rescaleValues(angleScale() / before);
    updateTitles();
}

void PlotController::rescaleValues(double factor)
{
    if (qFuzzyCompare(factor, 1.0))
        return;
    for (int c = 0; c < kChannelCount; ++c) {
        if (!isAngular(static_cast<Channel>(c)))
            continue;
        for (PendingSample &pending : m_pending[c])
            pending.value *= factor;
        // Values only; the containers stay sorted by key.
        for (auto it = m_channels[c]->begin(); it != m_channels[c]->end(); ++it)
            it->value *= factor;
    }
    if (!m_initialized)
        return;
    for (Panel &panel : m_panels) {
        if (!isAngular(signalInfo(panel.signal).measured))
            continue;
        QCPAxis *valueAxis = panel.rect->axis(QCPAxis::atLeft);
        const QCPRange range = valueAxis->range();
        valueAxis->setRange(range.lower * factor, range.upper * factor);
        m_measure->scaleY(panel.rect, factor);
    }
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

void PlotController::setLogVisible(bool visible)
{
    m_logVisible = visible;
    if (m_initialized)
        m_stack->setCurrentWidget(visible ? static_cast<QWidget *>(m_logView)
                                          : static_cast<QWidget *>(m_plot));
}

void PlotController::setLiveMode(bool enabled)
{
    m_liveMode = enabled;
    if (!m_initialized)
        return;
    // Live: the window drives the axes. Paused: hand panning and zooming to the user.
    m_plot->setInteractions(enabled ? QCP::Interactions(QCP::iSelectPlottables)
                                    : QCP::Interactions(QCP::iRangeDrag | QCP::iRangeZoom));
    m_plot->setSelectionRectMode(enabled ? QCP::srmNone : QCP::srmZoom);
    if (enabled)
        m_ticksSinceRescale = m_rescaleIntervalTicks;
    // Points picked on a frozen picture mean nothing once it scrolls again, which
    // disabling the tool takes care of.
    m_measure->setEnabled(!enabled);
}

PlotMeasurement PlotController::measurement() const
{
    return m_initialized ? m_measure->measurement() : PlotMeasurement{};
}

void PlotController::setCrosshairEnabled(bool enabled)
{
    if (m_initialized)
        m_crosshair->setEnabled(enabled);
}

bool PlotController::isCrosshairEnabled() const
{
    return m_initialized && m_crosshair->isEnabled();
}

void PlotController::clear()
{
    for (auto &pending : m_pending)
        pending.clear();
    for (auto &channel : m_channels)
        channel->clear();
    for (auto &history : m_setpoints)
        history.clear();
    m_unpaired.clear();
    m_setpointStreamOpen = false;
    m_lastTelemetryKey = -std::numeric_limits<double>::infinity();
    m_lastStatusKey = -std::numeric_limits<double>::infinity();
    m_rightKey = -std::numeric_limits<double>::infinity();
    m_anchors.clear();
    if (!m_initialized)
        return;
    m_measure->clear();
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

// --- ingest -------------------------------------------------------------------------

double PlotController::nowKey() const
{
    return hostKey(hostTimeUs());
}

double PlotController::hostKey(qint64 hostUs) const
{
    return static_cast<double>(hostUs - m_clockStartUs) * 1e-6;
}

void PlotController::addDelaySample(qint64 driveUs, qint64 hostUs)
{
    const qint64 delayUs = hostUs - driveUs;
    if (!m_anchors.isEmpty()
        && (driveUs < m_lastDriveUs
            || std::abs(delayUs - m_anchors.last().delayUs) > kTelemetryResyncUs)) {
        m_anchors.clear();
    }
    if (m_anchors.isEmpty())
        m_anchorOriginUs = driveUs;
    m_lastDriveUs = driveUs;

    const qint64 block = (driveUs - m_anchorOriginUs) / kAnchorBlockUs;
    if (m_anchors.isEmpty() || block != m_anchors.last().block) {
        m_anchors.push_back({block, driveUs, delayUs});
        if (m_anchors.size() > kMaxAnchors)
            m_anchors.removeFirst();
    } else if (delayUs < m_anchors.last().delayUs) {
        m_anchors.last().driveUs = driveUs;
        m_anchors.last().delayUs = delayUs;
    }
}

qint64 PlotController::delayAt(qint64 driveUs) const
{
    if (m_anchors.isEmpty())
        return 0;
    // Only finished blocks count: the one being filled has not seen its least delayed
    // sample yet, and would key the samples at its start too late. Until one block is
    // finished, its running minimum is all there is.
    const int finished = m_anchors.size() - 1;
    if (finished == 0)
        return m_anchors.last().delayUs;

    if (driveUs <= m_anchors.first().driveUs)
        return m_anchors.first().delayUs;
    for (int i = 1; i < finished; ++i) {
        const DelayAnchor &lo = m_anchors.at(i - 1);
        const DelayAnchor &hi = m_anchors.at(i);
        if (driveUs < hi.driveUs) {
            return lo.delayUs
                    + (hi.delayUs - lo.delayUs) * (driveUs - lo.driveUs)
                    / (hi.driveUs - lo.driveUs);
        }
    }
    return m_anchors.at(finished - 1).delayUs;
}

bool PlotController::setpointAt(int slot, double key, double *value) const
{
    const QVector<SetpointSample> &history = m_setpoints[slot];
    if (history.isEmpty())
        return false;
    if (key <= history.first().key) {
        *value = history.first().value;
        return true;
    }
    if (key >= history.last().key) {
        *value = history.last().value;
        return true;
    }
    const auto after = std::lower_bound(history.cbegin(), history.cend(), key,
                                        [](const SetpointSample &sample, double k) {
                                            return sample.key < k;
                                        });
    const SetpointSample &hi = *after;
    const SetpointSample &lo = *(after - 1);
    const double span = hi.key - lo.key;
    const double alpha = span > 0.0 ? (key - lo.key) / span : 0.0;
    *value = lo.value + (hi.value - lo.value) * alpha;
    return true;
}

void PlotController::queue(Channel channel, double key, double value)
{
    if (!m_liveMode || !m_initialized)
        return;
    m_pending[static_cast<int>(channel)].push_back({key, value});
    m_dirty = true;
}

void PlotController::appendTelemetry(const TelemetryBatch &samples)
{
    if (samples.isEmpty())
        return;

    // Samples reach the host in bursts, so they are spaced by the drive's own clock
    // (t_us) rather than by when they arrived. That clock drifts against the host's,
    // by more than a percent and in steps while the drive follows commands, so it is
    // mapped onto the host's by the smallest delivery delay (host_us - t_us) of each
    // block of drive time: delivery never comes before sampling, and the least delayed
    // sample is the one stamped closest to its instant. Between blocks the delay is
    // interpolated, which takes the drift out in either direction; a single offset
    // for the whole run let the trace run ahead of its set-point once the drive's
    // clock fell behind. host_us is on the set-points' clock, so both share keys.
    for (const TelemetrySample &sample : samples)
        addDelaySample(sample.t_us, sample.host_us);

    for (const TelemetrySample &sample : samples) {
        Unpaired unpaired;
        unpaired.key = hostKey(sample.t_us + delayAt(sample.t_us));
        unpaired.position = sample.position;
        unpaired.velocity = sample.velocity;
        unpaired.torque = sample.torque;
        m_unpaired.push_back(unpaired);
    }
    releaseTelemetry(false);
}

void PlotController::releaseTelemetry(bool flush)
{
    if (m_unpaired.isEmpty())
        return;
    bool haveSetpoint = false;
    double newestSetpoint = -std::numeric_limits<double>::infinity();
    for (const QVector<SetpointSample> &history : m_setpoints) {
        if (history.isEmpty())
            continue;
        haveSetpoint = true;
        newestSetpoint = qMax(newestSetpoint, history.last().key);
    }

    const double scale = angleScale();
    const double now = nowKey();
    int released = 0;
    for (; released < m_unpaired.size(); ++released) {
        const Unpaired &sample = m_unpaired.at(released);
        // Its reports are still on the way; everything after it is newer.
        if (!flush && m_setpointStreamOpen && haveSetpoint && sample.key > newestSetpoint
            && now - sample.key < kSetpointWaitS) {
            break;
        }
        double key = sample.key;
        if (key <= m_lastTelemetryKey)
            key = m_lastTelemetryKey + 1e-6;
        m_lastTelemetryKey = key;

        queue(Channel::Position, key, sample.position * scale);
        queue(Channel::Velocity, key, sample.velocity * scale);
        queue(Channel::Torque, key, sample.torque);
        // A target only for what was commanded; the others have no trace to draw.
        for (int slot = 0; slot < kSetpointSlots; ++slot) {
            double setpoint = 0.0;
            if (!setpointAt(slot, sample.key, &setpoint))
                continue;
            const Channel target = targetChannel(slot);
            queue(target, key, isAngular(target) ? setpoint * scale : setpoint);
        }
    }
    m_unpaired.remove(0, released);
}

void PlotController::appendStatus(const DeviceStatus &status)
{
    double key = nowKey();
    if (key <= m_lastStatusKey)
        key = m_lastStatusKey + 1e-6;
    m_lastStatusKey = key;

    const auto put = [this, key](Channel channel, double value) {
        if (!std::isnan(value))
            queue(channel, key, value);
    };
    put(Channel::TempMcu, status.tempMcu);
    put(Channel::TempStator, status.tempStator);
    put(Channel::BusCurrent, status.busCurrent);
    put(Channel::EncoderRotor, status.encoderRotor);
    put(Channel::EncoderShaft, status.encoderShaft);
}

void PlotController::appendSetpoint(double value, ServoControlType type, qint64 t_us)
{
    // The trace itself is emitted alongside the telemetry samples so both share keys.
    // Kept in native units and scaled together with the sample it is drawn against.
    if (!m_setpointStreamOpen) {
        // A new run commands its own quantities: a target left over from the last run
        // would otherwise be held flat under them for good.
        for (auto &history : m_setpoints)
            history.clear();
    }
    m_setpointStreamOpen = true;

    // Stamped on the host's steady clock, which the plot clock is, so no estimate is
    // involved.
    SetpointSample sample;
    sample.key = hostKey(t_us);
    sample.value = value;

    // The history has to stay sorted for setpointAt(), so a report stamped no later
    // than the previous one replaces it instead of being appended out of order.
    QVector<SetpointSample> &history = m_setpoints[setpointSlot(type)];
    if (!history.isEmpty() && sample.key <= history.last().key)
        history.last().value = sample.value;
    else
        history.push_back(sample);

    const double oldest = history.last().key - kSetpointHistoryS;
    int drop = 0;
    // One report before `oldest` is kept, so a key inside the window still has a
    // sample on each side to interpolate between.
    while (drop + 1 < history.size() && history.at(drop + 1).key < oldest)
        ++drop;
    if (drop > 0)
        history.remove(0, drop);

    releaseTelemetry(false);
}

void PlotController::endSetpoints()
{
    releaseTelemetry(true);
    m_setpointStreamOpen = false;
}

void PlotController::appendLogLine(const QString &line)
{
    if (!m_logView || !m_liveMode)
        return;
    m_logView->appendPlainText(line);
}

// --- drawing -------------------------------------------------------------------------

void PlotController::onDrawTimer()
{
    // Samples whose set-point stopped coming are let through here, since no new
    // report will ever release them.
    releaseTelemetry(false);
    if (!m_dirty || !m_initialized)
        return;
    m_dirty = false;

    bool added = false;
    for (int c = 0; c < kChannelCount; ++c) {
        QVector<PendingSample> &pending = m_pending[c];
        if (pending.isEmpty())
            continue;
        QVector<QCPGraphData> data;
        data.reserve(pending.size());
        for (const PendingSample &sample : std::as_const(pending))
            data.push_back(QCPGraphData(sample.key, sample.value));
        m_rightKey = qMax(m_rightKey, pending.last().key);
        m_channels[c]->add(data, true);
        pending.clear();
        added = true;
    }
    if (!added)
        return;

    const double right = m_rightKey;
    const double left = qMax(0.0, right - m_settings.plot_time_window_s);
    for (const auto &channel : m_channels)
        channel->removeBefore(left);
    setXRange(QCPRange(left, right));

    if (++m_ticksSinceRescale >= m_rescaleIntervalTicks) {
        m_ticksSinceRescale = 0;
        for (int i = 0; i < kPanelCount; ++i) {
            if (isShown(i))
                autoscaleY(m_panels[i], QCPRange(left, right));
        }
    }

    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

// --- export ---------------------------------------------------------------------------

bool PlotController::saveImage(const QString &filePath, plot_export::ImageFormat format,
                               const QString &exportTheme, int dpi, QString *error)
{
    if (!m_initialized) {
        if (error)
            *error = tr("The plot is not initialised.");
        return false;
    }
    if (m_logVisible) {
        if (error)
            *error = tr("The log view cannot be exported as an image.");
        return false;
    }

    // Exported without the cursor line, which is not part of the data, and without the
    // marks that only mean something to the mouse. The series pens and the headers
    // follow the theme too, and plot_export only restyles the chrome.
    const bool crosshair = m_crosshair->isEnabled();
    m_crosshair->setEnabled(false);
    m_borders->setVisible(false);
    m_exporting = true;
    updateTitles();
    const bool ok = plot_export::saveImage(m_plot, filePath, format, exportTheme, m_theme,
                                           m_settings.plot_font_size, dpi, error,
                                           [this](const QString &theme) {
                                               applyPens(theme);
                                               styleHeaders(theme);
                                           });
    m_exporting = false;
    updateTitles();
    m_borders->setVisible(true);
    m_crosshair->setEnabled(crosshair);
    m_plot->replot(QCustomPlot::rpQueuedReplot);
    return ok;
}

bool PlotController::saveCsv(const QString &filePath, QString *error)
{
    if (!m_initialized) {
        if (error)
            *error = tr("The plot is not initialised.");
        return false;
    }

    QSaveFile file(filePath);
    if (!file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        if (error)
            *error = tr("Could not write %1: %2").arg(filePath, file.errorString());
        return false;
    }
    QTextStream out(&file);
    out.setEncoding(QStringConverter::Utf8);

    if (m_logVisible) {
        out << m_logView->toPlainText();
    } else {
        out.setLocale(QLocale::c());
        out.setRealNumberNotation(QTextStream::SmartNotation);
        out.setRealNumberPrecision(12);

        // The traces on show, each channel once, in panel order.
        QVector<Channel> columns;
        for (int i = 0; i < kPanelCount; ++i) {
            if (!isShown(i))
                continue;
            const Panel &panel = m_panels[i];
            const SignalInfo info = signalInfo(panel.signal);
            if (panel.measured->visible() && !columns.contains(info.measured))
                columns << info.measured;
            if (panel.companion->visible() && !columns.contains(info.companion))
                columns << info.companion;
        }

        out << "time_s";
        for (Channel channel : std::as_const(columns))
            out << ',' << csvColumn(channel);
        out << '\n';

        // Exports what is currently in the window, which is what the user is looking
        // at. Telemetry and the polled status come at their own instants, so the rows
        // are the union of the sample times, with a channel's cell empty where it has
        // no sample.
        using Iterator = QCPGraphDataContainer::const_iterator;
        QVector<Iterator> its;
        QVector<Iterator> ends;
        for (Channel channel : std::as_const(columns)) {
            its << m_channels[static_cast<int>(channel)]->constBegin();
            ends << m_channels[static_cast<int>(channel)]->constEnd();
        }
        for (;;) {
            double key = std::numeric_limits<double>::infinity();
            for (int j = 0; j < its.size(); ++j) {
                if (its[j] != ends[j])
                    key = qMin(key, its[j]->key);
            }
            if (!std::isfinite(key))
                break;
            out << key;
            for (int j = 0; j < its.size(); ++j) {
                out << ',';
                if (its[j] != ends[j] && its[j]->key == key) {
                    out << its[j]->value;
                    ++its[j];
                }
            }
            out << '\n';
        }
    }

    if (!file.commit()) {
        if (error)
            *error = tr("Could not write %1: %2").arg(filePath, file.errorString());
        return false;
    }
    return true;
}
