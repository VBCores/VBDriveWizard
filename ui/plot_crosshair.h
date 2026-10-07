#ifndef VBDW_UI_PLOT_CROSSHAIR_H
#define VBDW_UI_PLOT_CROSSHAIR_H

#include <QBrush>
#include <QColor>
#include <QFont>
#include <QObject>
#include <QPen>
#include <QVector>

QT_BEGIN_NAMESPACE
class QMouseEvent;
QT_END_NAMESPACE

class QCPAxisRect;
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
/// A plot with several axis rects stacked over one time axis gets the line through all
/// of them and a read-out in each, with the traces of that rect. Rects that are not
/// visible are skipped.
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
    void applyTheme(const QString &theme, int fontSize);

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

    /// One axis rect: its piece of the line, its read-out and its traces.
    struct Section
    {
        QCPAxisRect *rect = nullptr;
        QCPItemStraightLine *line = nullptr;
        QCPItemRect *panel = nullptr;
        QCPItemText *timeName = nullptr;
        QCPItemText *timeValue = nullptr;
        QVector<Probe> probes;
        /// The widest value since the panel appeared. The panel only grows while it is
        /// shown, so its edge and the names do not twitch as the digits change.
        double valueWidth = 0.0;
    };

    Section &section(QCPAxisRect *rect);
    QCPItemText *addText(QCPAxisRect *rect, Qt::Alignment alignment);
    /// Places the line, markers and panels for the current cursor position and data,
    /// or hides them. Draws nothing itself.
    void updateItems();
    void updateSection(Section &section);
    void hideSection(Section &section);
    void hidePanel(Section &section);
    void styleSection(const Section &section);
    /// The cursor is within the horizontal span of the visible rects and between the
    /// top of the first and the bottom of the last one.
    bool isOverRects(const QPointF &pos) const;

    QCustomPlot *m_plot = nullptr;
    QCPLayer *m_layer = nullptr;
    QVector<Section> m_sections;
    QColor m_lineColor;
    QBrush m_panelBrush;
    QPen m_panelPen;
    QColor m_textColor;
    QColor m_markerFill;
    QFont m_font;
    bool m_enabled = false;
    /// The cursor is over the axis rects, at `m_cursorX` pixels.
    bool m_hovered = false;
    double m_cursorX = 0.0;
};

#endif // VBDW_UI_PLOT_CROSSHAIR_H
