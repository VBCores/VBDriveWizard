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

    // The measuring points are markers only: no line joins them.
    m_markers = m_plot->addGraph();
    m_markers->setLineStyle(QCPGraph::lsNone);
    m_markers->removeFromLegend();
    m_markers->setLayer(layer);
    applyTheme(QStringLiteral("dark"));

    connect(m_plot, &QCustomPlot::mousePress, this, &PlotMeasurementTool::onMousePress);
    connect(m_plot, &QCustomPlot::mouseRelease, this, &PlotMeasurementTool::onMouseRelease);
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

void PlotMeasurementTool::scaleY(double factor)
{
    if (m_measurement.points == 0)
        return;
    m_measurement.y1 *= factor;
    m_measurement.y2 *= factor;
    redrawMarkers();
    emit measurementChanged(m_measurement);
}

void PlotMeasurementTool::applyTheme(const QString &theme)
{
    const QColor marker = ThemeManager::foregroundColor(theme);
    m_markers->setPen(QPen(marker, 2));
    m_markers->setScatterStyle(
            QCPScatterStyle(QCPScatterStyle::ssCircle, marker, Qt::darkGreen, kMarkerSize));
}

void PlotMeasurementTool::redrawMarkers()
{
    QVector<double> keys;
    QVector<double> values;
    if (m_measurement.points >= 1) {
        keys << m_measurement.x1;
        values << m_measurement.y1;
    }
    if (m_measurement.points >= 2) {
        keys << m_measurement.x2;
        values << m_measurement.y2;
    }
    // Not sorted: the second point may lie left of the first.
    m_markers->setData(keys, values, false);
}

void PlotMeasurementTool::onMousePress(QMouseEvent *event)
{
    m_pressPos = event->position();
    // A click on the legend marks no point.
    const QCPLegend *legend = m_plot->legend;
    const bool onLegend = legend && legend->realVisibility()
            && legend->outerRect().contains(m_pressPos.toPoint());
    m_pressed = event->button() == Qt::LeftButton && !onLegend;
}

void PlotMeasurementTool::onMouseRelease(QMouseEvent *event)
{
    const bool wasPressed = m_pressed;
    m_pressed = false;
    if (!wasPressed || event->button() != Qt::LeftButton || !m_enabled)
        return;
    if (QLineF(m_pressPos, event->position()).length() > kClickSlopPx)
        return;  // a pan or a zoom rectangle
    QCPAxisRect *rect = m_plot->axisRect();
    if (!rect->rect().contains(event->position().toPoint()))
        return;

    // The point is taken where the user clicked, not snapped to a trace: it can
    // mark a level or an instant between the samples as well as a sample itself.
    const QPointF point(m_plot->xAxis->pixelToCoord(event->position().x()),
                        m_plot->yAxis->pixelToCoord(event->position().y()));
    if (m_measurement.points == 1) {
        m_measurement.x2 = point.x();
        m_measurement.y2 = point.y();
        m_measurement.points = 2;
    } else {
        // The first click, or the third one, which starts a new pair.
        m_measurement = PlotMeasurement{};
        m_measurement.x1 = point.x();
        m_measurement.y1 = point.y();
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
        dy->setText(number(measurement.y2 - measurement.y1));
    } else {
        dx->setText(kNoValue);
        dy->setText(kNoValue);
    }
}
