#include "ui/plot_crosshair.h"

#include "third_party/qcustomplot/qcustomplot.h"
#include "ui/theme_manager.h"

#include <QFontMetrics>
#include <QMouseEvent>

namespace {
constexpr double kMarkerSize = 7.0;
/// Panel geometry, in pixels.
constexpr double kPanelMargin = 8.0;
constexpr double kPanelPadding = 6.0;
constexpr double kSwatchWidth = 16.0;
constexpr double kSwatchGap = 6.0;
constexpr double kColumnGap = 12.0;
/// Shown for a trace the cursor is off the ends of.
const QString kNoValue = QStringLiteral("—");

QString number(double value)
{
    return QString::number(value, 'f', 3);
}
} // namespace

PlotCrosshairTool::PlotCrosshairTool(QCustomPlot *plot, QObject *parent)
    : QObject(parent)
    , m_plot(plot)
{
    // Over the traces, the measurement markers and the legend. Buffered, so a mouse
    // move replots this layer alone and the dense traces come from their cached buffer.
    const QString layer = QStringLiteral("crosshair");
    if (!m_plot->layer(layer)) {
        QCPLayer *below = m_plot->layer(QStringLiteral("legend"));
        m_plot->addLayer(layer, below ? below : m_plot->layer(QStringLiteral("main")),
                         QCustomPlot::limAbove);
    }
    m_layer = m_plot->layer(layer);
    m_layer->setMode(QCPLayer::lmBuffered);
    applyTheme(QStringLiteral("dark"), m_plot->font().pointSize());

    // QCustomPlot has no leaveEvent() of its own to hook.
    m_plot->installEventFilter(this);
    connect(m_plot, &QCustomPlot::mouseMove, this, &PlotCrosshairTool::onMouseMove);
    // Every replot, so the values follow new samples, panning and zooming. After the
    // layout, as a resize moves the axis rects.
    connect(m_plot, &QCustomPlot::afterLayout, this, &PlotCrosshairTool::updateItems);
}

PlotCrosshairTool::Section &PlotCrosshairTool::section(QCPAxisRect *rect)
{
    for (Section &existing : m_sections) {
        if (existing.rect == rect)
            return existing;
    }

    // Everything is placed in pixels: the cursor keeps its place on the screen while
    // a live plot scrolls under it. Items are drawn in the order they are made, so
    // the panel covers the line and the markers cover the panel.
    Section added;
    added.rect = rect;
    added.line = new QCPItemStraightLine(m_plot);
    added.line->setLayer(m_layer);
    added.line->setSelectable(false);
    added.line->setClipAxisRect(rect);
    added.line->point1->setType(QCPItemPosition::ptAbsolute);
    added.line->point2->setType(QCPItemPosition::ptAbsolute);
    added.line->setVisible(false);

    added.panel = new QCPItemRect(m_plot);
    added.panel->setLayer(m_layer);
    added.panel->setSelectable(false);
    added.panel->setClipAxisRect(rect);
    added.panel->topLeft->setType(QCPItemPosition::ptAbsolute);
    added.panel->bottomRight->setType(QCPItemPosition::ptAbsolute);
    added.panel->setVisible(false);

    added.timeName = addText(rect, Qt::AlignLeft | Qt::AlignVCenter);
    added.timeName->setText(tr("t, s"));
    added.timeValue = addText(rect, Qt::AlignRight | Qt::AlignVCenter);

    m_sections.push_back(added);
    styleSection(m_sections.last());
    return m_sections.last();
}

void PlotCrosshairTool::addGraph(QCPGraph *graph)
{
    QCPAxisRect *rect = graph->keyAxis()->axisRect();
    Section &target = section(rect);

    Probe probe;
    probe.graph = graph;

    probe.tracer = new QCPItemTracer(m_plot);
    probe.tracer->setLayer(m_layer);
    probe.tracer->setSelectable(false);
    probe.tracer->setClipAxisRect(rect);
    // The nearest real sample: an interpolated value is one the drive never sent.
    probe.tracer->setInterpolating(false);
    probe.tracer->setStyle(QCPItemTracer::tsCircle);
    probe.tracer->setSize(kMarkerSize);
    probe.tracer->setBrush(m_markerFill);
    probe.tracer->setVisible(false);

    probe.swatch = new QCPItemLine(m_plot);
    probe.swatch->setLayer(m_layer);
    probe.swatch->setSelectable(false);
    probe.swatch->setClipAxisRect(rect);
    probe.swatch->start->setType(QCPItemPosition::ptAbsolute);
    probe.swatch->end->setType(QCPItemPosition::ptAbsolute);
    probe.swatch->setVisible(false);

    probe.name = addText(rect, Qt::AlignLeft | Qt::AlignVCenter);
    probe.value = addText(rect, Qt::AlignRight | Qt::AlignVCenter);

    target.probes.push_back(probe);
    styleSection(target);
}

QCPItemText *PlotCrosshairTool::addText(QCPAxisRect *rect, Qt::Alignment alignment)
{
    auto *text = new QCPItemText(m_plot);
    text->setLayer(m_layer);
    text->setSelectable(false);
    text->setClipAxisRect(rect);
    text->position->setType(QCPItemPosition::ptAbsolute);
    text->setPositionAlignment(alignment);
    text->setPadding(QMargins());
    text->setVisible(false);
    return text;
}

void PlotCrosshairTool::setEnabled(bool enabled)
{
    if (m_enabled == enabled)
        return;
    m_enabled = enabled;
    // Without tracking QCustomPlot reports a mouse move only while a button is down.
    // Turned on only: the plot may track the mouse for its own reasons too.
    if (enabled)
        m_plot->setMouseTracking(true);
    m_hovered = false;
    updateItems();
    m_layer->replot();
}

void PlotCrosshairTool::applyTheme(const QString &theme, int fontSize)
{
    m_lineColor = ThemeManager::foregroundColor(theme);
    m_lineColor.setAlpha(160);
    m_panelBrush = QBrush(ThemeManager::plotPanelColor(theme));
    m_panelPen = QPen(ThemeManager::plotPanelBorderColor(theme));
    m_textColor = ThemeManager::foregroundColor(theme);
    m_font = m_plot->font();
    m_font.setPointSize(fontSize);
    m_markerFill = ThemeManager::backgroundColor(theme);
    for (const Section &existing : std::as_const(m_sections))
        styleSection(existing);
}

void PlotCrosshairTool::styleSection(const Section &section)
{
    section.line->setPen(QPen(m_lineColor, 1, Qt::DashLine));
    section.panel->setBrush(m_panelBrush);
    section.panel->setPen(m_panelPen);
    QVector<QCPItemText *> texts = {section.timeName, section.timeValue};
    for (const Probe &probe : section.probes) {
        probe.tracer->setBrush(m_markerFill);
        texts << probe.name << probe.value;
    }
    for (QCPItemText *text : std::as_const(texts)) {
        text->setFont(m_font);
        text->setColor(m_textColor);
    }
}

bool PlotCrosshairTool::eventFilter(QObject *watched, QEvent *event)
{
    if (watched == m_plot && event->type() == QEvent::Leave && m_hovered) {
        m_hovered = false;
        updateItems();
        m_layer->replot();
    }
    return QObject::eventFilter(watched, event);
}

void PlotCrosshairTool::onMouseMove(QMouseEvent *event)
{
    if (!m_enabled)
        return;
    const QPointF pos = event->position();
    m_hovered = isOverRects(pos);
    m_cursorX = pos.x();
    updateItems();
    m_layer->replot();
}

bool PlotCrosshairTool::isOverRects(const QPointF &pos) const
{
    bool any = false;
    QRectF span;
    for (const Section &existing : m_sections) {
        if (!existing.rect->realVisibility())
            continue;
        const QRectF area = existing.rect->rect();
        span = any ? span.united(area) : area;
        any = true;
    }
    return any && span.contains(pos);
}

void PlotCrosshairTool::updateItems()
{
    for (Section &existing : m_sections) {
        if (m_enabled && m_hovered && existing.rect->realVisibility())
            updateSection(existing);
        else
            hideSection(existing);
    }
}

void PlotCrosshairTool::hideSection(Section &section)
{
    section.line->setVisible(false);
    for (const Probe &probe : std::as_const(section.probes))
        probe.tracer->setVisible(false);
    hidePanel(section);
}

void PlotCrosshairTool::hidePanel(Section &section)
{
    section.panel->setVisible(false);
    section.timeName->setVisible(false);
    section.timeValue->setVisible(false);
    for (const Probe &probe : std::as_const(section.probes)) {
        probe.swatch->setVisible(false);
        probe.name->setVisible(false);
        probe.value->setVisible(false);
    }
    section.valueWidth = 0.0;
}

void PlotCrosshairTool::updateSection(Section &section)
{
    const QRectF area = section.rect->rect();
    section.line->point1->setCoords(m_cursorX, area.top());
    section.line->point2->setCoords(m_cursorX, area.bottom());
    section.line->setVisible(true);

    // A row for every trace on show, with a dash for one the cursor is off the ends
    // of, so the panel keeps its rows as the cursor moves.
    const double key = section.rect->axis(QCPAxis::atBottom)->pixelToCoord(m_cursorX);
    QVector<const Probe *> rows;
    bool haveSample = false;
    double sampleKey = 0.0;
    for (const Probe &probe : std::as_const(section.probes)) {
        const bool shown = probe.graph->visible();
        // Off the ends of a trace the tracer would stick to its first or last sample.
        const auto data = probe.graph->data();
        const bool covered = shown && !data->isEmpty() && key >= data->constBegin()->key
                && key <= (data->constEnd() - 1)->key;
        probe.tracer->setVisible(covered);
        if (!shown)
            continue;
        rows << &probe;
        if (!covered) {
            probe.value->setText(kNoValue);
            continue;
        }

        // Attached only once the trace has data: QCPItemTracer::setGraph() complains
        // about an empty one.
        if (probe.tracer->graph() != probe.graph)
            probe.tracer->setGraph(probe.graph);
        probe.tracer->setGraphKey(key);
        probe.tracer->updatePosition();
        probe.tracer->setPen(QPen(probe.graph->pen().color(), 2));
        probe.value->setText(number(probe.tracer->position->value()));
        // The traces of one rect share their sample times, so the first one gives the time.
        if (!haveSample) {
            sampleKey = probe.tracer->position->key();
            haveSample = true;
        }
    }
    if (!haveSample) {
        hidePanel(section);
        return;
    }
    section.timeValue->setText(number(sampleKey));

    // Two columns: the names left-aligned after the swatches, the values
    // right-aligned against the edge, so the digits keep their places.
    const QFontMetricsF metrics(m_font);
    double nameWidth = metrics.horizontalAdvance(section.timeName->text());
    section.valueWidth =
            qMax(section.valueWidth, metrics.horizontalAdvance(section.timeValue->text()));
    for (const Probe *probe : std::as_const(rows)) {
        probe->name->setText(probe->graph->name());
        nameWidth = qMax(nameWidth, metrics.horizontalAdvance(probe->name->text()));
        section.valueWidth =
                qMax(section.valueWidth, metrics.horizontalAdvance(probe->value->text()));
    }
    const double rowHeight = metrics.height();
    const QSizeF size(2 * kPanelPadding + kSwatchWidth + kSwatchGap + nameWidth + kColumnGap
                              + section.valueWidth,
                      2 * kPanelPadding + (rows.size() + 1) * rowHeight);
    const QPointF bottomRight = area.bottomRight() - QPointF(kPanelMargin, kPanelMargin);
    const QPointF topLeft = bottomRight - QPointF(size.width(), size.height());
    section.panel->topLeft->setPixelPosition(topLeft);
    section.panel->bottomRight->setPixelPosition(bottomRight);
    section.panel->setVisible(true);

    const double swatchX = topLeft.x() + kPanelPadding;
    const double nameX = swatchX + kSwatchWidth + kSwatchGap;
    const double valueX = bottomRight.x() - kPanelPadding;
    const auto rowY = [&](qsizetype row) {
        return topLeft.y() + kPanelPadding + (row + 0.5) * rowHeight;
    };
    const auto place = [&](QCPItemText *name, QCPItemText *value, double y) {
        name->position->setPixelPosition(QPointF(nameX, y));
        value->position->setPixelPosition(QPointF(valueX, y));
        name->setVisible(true);
        value->setVisible(true);
    };

    place(section.timeName, section.timeValue, rowY(0));
    for (qsizetype i = 0; i < rows.size(); ++i) {
        const Probe *probe = rows[i];
        const double y = rowY(i + 1);
        place(probe->name, probe->value, y);
        probe->swatch->setPen(probe->graph->pen());
        probe->swatch->start->setPixelPosition(QPointF(swatchX, y));
        probe->swatch->end->setPixelPosition(QPointF(swatchX + kSwatchWidth, y));
        probe->swatch->setVisible(true);
    }
    // A trace that is not on show keeps no row.
    for (const Probe &probe : std::as_const(section.probes)) {
        if (!probe.graph->visible()) {
            probe.swatch->setVisible(false);
            probe.name->setVisible(false);
            probe.value->setVisible(false);
        }
    }
}
