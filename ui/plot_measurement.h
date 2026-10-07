#ifndef VBDW_UI_PLOT_MEASUREMENT_H
#define VBDW_UI_PLOT_MEASUREMENT_H

#include <QObject>
#include <QPointF>
#include <QString>
#include <QVector>

QT_BEGIN_NAMESPACE
class QLabel;
class QMouseEvent;
QT_END_NAMESPACE

class QCPAxisRect;
class QCPGraph;
class QCustomPlot;

/// Points picked on a plot, in display units. `points` is 0, 1 or 2; the second
/// point is only meaningful when there are two. `rect1` and `rect2` are the indexes
/// of the axis rects the points were picked on, in the order they were registered:
/// the Y difference only means something within one rect.
struct PlotMeasurement
{
    int points = 0;
    double x1 = 0.0;
    double y1 = 0.0;
    int rect1 = 0;
    double x2 = 0.0;
    double y2 = 0.0;
    int rect2 = 0;
};

/// Picking points on a plot by clicking it: the first click marks a point, the
/// second a pair, the third starts over. The points are drawn as markers with no
/// line between them. A press and release far apart are a drag (pan or zoom
/// rectangle), not a click. Clicks count on the registered axis rects that are
/// visible; the pair may span two of them.
class PlotMeasurementTool : public QObject
{
    Q_OBJECT

public:
    explicit PlotMeasurementTool(QCustomPlot *plot, QObject *parent = nullptr);

    /// Lets points be picked on `rect`, and adds its marker graph; it stays out of the
    /// legend.
    void addAxisRect(QCPAxisRect *rect);

    void setEnabled(bool enabled);
    bool isEnabled() const { return m_enabled; }
    /// Forgets the points, e.g. when the picture they were taken on changes.
    void clear();
    /// The values on `rect` were multiplied by `factor`; the points on it follow them.
    void scaleY(QCPAxisRect *rect, double factor);
    void applyTheme(const QString &theme);

    const PlotMeasurement &measurement() const { return m_measurement; }

    /// Shows a measurement in the four read-out labels under a plot: the first
    /// point, and the X and Y distance to the second. `xSuffix` follows the numbers
    /// on the X axis, e.g. " s".
    static void showInLabels(const PlotMeasurement &measurement, QLabel *x, QLabel *y,
                             QLabel *dx, QLabel *dy, const QString &xSuffix);

signals:
    void measurementChanged(const PlotMeasurement &measurement);

private slots:
    void onMousePress(QMouseEvent *event);
    void onMouseRelease(QMouseEvent *event);

private:
    void redrawMarkers();

    QCustomPlot *m_plot = nullptr;
    QVector<QCPAxisRect *> m_rects;
    /// One marker graph per rect, in the same order.
    QVector<QCPGraph *> m_markers;
    QString m_theme = QStringLiteral("dark");
    bool m_enabled = false;
    PlotMeasurement m_measurement;
    /// Where the left button went down.
    QPointF m_pressPos;
    bool m_pressed = false;
};

#endif // VBDW_UI_PLOT_MEASUREMENT_H
