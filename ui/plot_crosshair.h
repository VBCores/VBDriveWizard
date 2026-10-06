#ifndef VBDW_UI_PLOT_CROSSHAIR_H
#define VBDW_UI_PLOT_CROSSHAIR_H

#include <QColor>
#include <QFont>
#include <QObject>
#include <QVector>

QT_BEGIN_NAMESPACE
class QMouseEvent;
QT_END_NAMESPACE

class QCPGraph;
class QCPItemLine;
class QCPItemRect;
class QCPItemStraightLine;
class QCPItemText;
class QCPItemTracer;
class QCPLayer;
class QCustomPlot;

/// A vertical line under the mouse cursor that marks where it crosses each registered
/// trace. The time and the values there are read out in a panel that stays put in the
/// bottom-right corner, so the numbers of a noisy or fast signal do not jump around
/// with the markers. The marked point is the nearest real sample, not an interpolated
/// one.
///
/// The cursor keeps its place on the screen, not on the time axis: on a live plot the
/// values scroll under it.
class PlotCrosshairTool : public QObject
{
    Q_OBJECT

public:
    /// Adds the line to `plot` on a buffered layer of its own, so moving the mouse
    /// redraws only that layer and not the traces.
    explicit PlotCrosshairTool(QCustomPlot *plot, QObject *parent = nullptr);

    /// Registers a trace to mark; traces that are not registered are ignored.
    void addGraph(QCPGraph *graph);

    void setEnabled(bool enabled);
    bool isEnabled() const { return m_enabled; }
    /// The panel is styled like the legend, so this follows ThemeManager::applyPlotTheme().
    void applyTheme(const QString &theme);

protected:
    bool eventFilter(QObject *watched, QEvent *event) override;

private slots:
    void onMouseMove(QMouseEvent *event);

private:
    /// A registered trace: its marker and its row in the panel.
    struct Probe
    {
        QCPGraph *graph = nullptr;
        QCPItemTracer *tracer = nullptr;
        /// A short piece of the trace's line, as in the legend.
        QCPItemLine *swatch = nullptr;
        QCPItemText *name = nullptr;
        QCPItemText *value = nullptr;
    };

    QCPItemText *addText(Qt::Alignment alignment);
    /// Places the line, markers and panel for the current cursor position and data,
    /// or hides them. Draws nothing itself.
    void updateItems();
    void hideItems();
    void hidePanel();

    QCustomPlot *m_plot = nullptr;
    QCPLayer *m_layer = nullptr;
    QCPItemStraightLine *m_line = nullptr;
    QCPItemRect *m_panel = nullptr;
    QCPItemText *m_timeName = nullptr;
    QCPItemText *m_timeValue = nullptr;
    QVector<Probe> m_probes;
    QColor m_markerFill;
    QFont m_font;
    bool m_enabled = false;
    /// The cursor is over the axis rect, at `m_cursorX` pixels.
    bool m_hovered = false;
    double m_cursorX = 0.0;
    /// The widest value since the panel appeared. The panel only grows while it is
    /// shown, so its edge and the names do not twitch as the digits change.
    double m_valueWidth = 0.0;
};

#endif // VBDW_UI_PLOT_CROSSHAIR_H
