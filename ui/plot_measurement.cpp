#include "ui/plot_measurement.h"

#include "third_party/qcustomplot/qcustomplot.h"
#include "ui/theme_manager.h"

#include <QLabel>
#include <QMouseEvent>

namespace {
/// A press and release further apart than this are a drag (pan or zoom rectangle),
/// not a measuring click.
constexpr double kClickSlopPx = 4.0;
constexpr double kMarkerSize = 9.0;
/// Shown in a read-out label with nothing to show.
const QString kNoValue = QStringLiteral("—");
} // namespace

PlotMeasurementTool::PlotMeasurementTool(QCustomPlot *plot, QObject *parent)
    : QObject(parent)
    , m_plot(plot)
{
    // A layer of their own keeps the markers over curves added after them.
    const QString layer = QStringLiteral("measurement");
    if (!m_plot->layer(layer))
        m_plot->addLayer(layer, m_plot->layer(QStringLiteral("main")), QCustomPlot::limAbove);

    connect(m_plot, &QCustomPlot::mousePress, this, &PlotMeasurementTool::onMousePress);
    connect(m_plot, &QCustomPlot::mouseRelease, this, &PlotMeasurementTool::onMouseRelease);
}

void PlotMeasurementTool::addAxisRect(QCPAxisRect *rect)
{
    // The measuring points are markers only: no line joins them.
    auto *markers = m_plot->addGraph(rect->axis(QCPAxis::atBottom), rect->axis(QCPAxis::atLeft));
    markers->setLineStyle(QCPGraph::lsNone);
    markers->removeFromLegend();
    markers->setLayer(QStringLiteral("measurement"));
    m_rects << rect;
    m_markers << markers;
    applyTheme(m_theme);
}

void PlotMeasurementTool::setEnabled(bool enabled)
{
    m_enabled = enabled;
    if (!enabled)
        clear();
}

void PlotMeasurementTool::clear()
{
    m_pressed = false;
    if (m_measurement.points == 0)
        return;
    m_measurement = PlotMeasurement{};
    redrawMarkers();
    m_plot->replot(QCustomPlot::rpQueuedReplot);
    emit measurementChanged(m_measurement);
}

void PlotMeasurementTool::scaleY(QCPAxisRect *rect, double factor)
{
    const int index = m_rects.indexOf(rect);
    bool changed = false;
    if (m_measurement.points >= 1 && m_measurement.rect1 == index) {
        m_measurement.y1 *= factor;
        changed = true;
    }
    if (m_measurement.points >= 2 && m_measurement.rect2 == index) {
        m_measurement.y2 *= factor;
        changed = true;
    }
    if (!changed)
        return;
    redrawMarkers();
    emit measurementChanged(m_measurement);
}

void PlotMeasurementTool::applyTheme(const QString &theme)
{
    m_theme = theme;
    const QColor marker = ThemeManager::foregroundColor(theme);
    for (QCPGraph *markers : std::as_const(m_markers)) {
        markers->setPen(QPen(marker, 2));
        markers->setScatterStyle(
                QCPScatterStyle(QCPScatterStyle::ssCircle, marker, Qt::darkGreen, kMarkerSize));
    }
}

void PlotMeasurementTool::redrawMarkers()
{
    for (int i = 0; i < m_markers.size(); ++i) {
        QVector<double> keys;
        QVector<double> values;
        if (m_measurement.points >= 1 && m_measurement.rect1 == i) {
            keys << m_measurement.x1;
            values << m_measurement.y1;
        }
        if (m_measurement.points >= 2 && m_measurement.rect2 == i) {
            keys << m_measurement.x2;
            values << m_measurement.y2;
        }
        // Not sorted: the second point may lie left of the first.
        m_markers[i]->setData(keys, values, false);
    }
}

void PlotMeasurementTool::onMousePress(QMouseEvent *event)
{
    m_pressPos = event->position();
    m_pressed = event->button() == Qt::LeftButton;
}

void PlotMeasurementTool::onMouseRelease(QMouseEvent *event)
{
    const bool wasPressed = m_pressed;
    m_pressed = false;
    if (!wasPressed || event->button() != Qt::LeftButton || !m_enabled)
        return;
    if (QLineF(m_pressPos, event->position()).length() > kClickSlopPx)
        return;  // a pan or a zoom rectangle
    int index = -1;
    for (int i = 0; i < m_rects.size(); ++i) {
        if (m_rects[i]->realVisibility()
            && m_rects[i]->rect().contains(event->position().toPoint())) {
            index = i;
            break;
        }
    }
    if (index < 0)
        return;  // a title, a legend, an axis or a gap between the rects

    // The point is taken where the user clicked, not snapped to a trace: it can
    // mark a level or an instant between the samples as well as a sample itself.
    QCPAxisRect *rect = m_rects[index];
    const QPointF point(rect->axis(QCPAxis::atBottom)->pixelToCoord(event->position().x()),
                        rect->axis(QCPAxis::atLeft)->pixelToCoord(event->position().y()));
    if (m_measurement.points == 1) {
        m_measurement.x2 = point.x();
        m_measurement.y2 = point.y();
        m_measurement.rect2 = index;
        m_measurement.points = 2;
    } else {
        // The first click, or the third one, which starts a new pair.
        m_measurement = PlotMeasurement{};
        m_measurement.x1 = point.x();
        m_measurement.y1 = point.y();
        m_measurement.rect1 = index;
        m_measurement.points = 1;
    }
    redrawMarkers();
    m_plot->replot(QCustomPlot::rpQueuedReplot);
    emit measurementChanged(m_measurement);
}

void PlotMeasurementTool::showInLabels(const PlotMeasurement &measurement, QLabel *x,
                                       QLabel *y, QLabel *dx, QLabel *dy,
                                       const QString &xSuffix)
{
    const auto number = [](double value) { return QString::number(value, 'f', 3); };
    if (measurement.points >= 1) {
        x->setText(number(measurement.x1) + xSuffix);
        y->setText(number(measurement.y1));
    } else {
        x->setText(kNoValue);
        y->setText(kNoValue);
    }
    if (measurement.points >= 2) {
        dx->setText(number(measurement.x2 - measurement.x1) + xSuffix);
        // Values of two different quantities do not subtract.
        dy->setText(measurement.rect1 == measurement.rect2
                            ? number(measurement.y2 - measurement.y1)
                            : kNoValue);
    } else {
        dx->setText(kNoValue);
        dy->setText(kNoValue);
    }
}
