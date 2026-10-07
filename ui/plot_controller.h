#ifndef VBDW_UI_PLOT_CONTROLLER_H
#define VBDW_UI_PLOT_CONTROLLER_H

#include "app_types.h"
#include "ui/plot_export.h"
#include "ui/plot_measurement.h"

#include <QLineF>
#include <QObject>
#include <QSharedPointer>
#include <QTimer>
#include <QVector>

#include <array>
#include <limits>

QT_BEGIN_NAMESPACE
class QPlainTextEdit;
class QStackedLayout;
class QWidget;
QT_END_NAMESPACE

class QCPAxisRect;
class QCPGraph;
class QCPGraphData;
class QCPLayerable;
class QCPLayoutGrid;
class QCPLegend;
class QCPMarginGroup;
class QCPRange;
class QCPTextElement;
class QCustomPlot;
class PlotCrosshairTool;
class PlotIconButton;

template <class DataType>
class QCPDataContainer;
using QCPGraphDataContainer = QCPDataContainer<QCPGraphData>;

/// The realtime chart in the REALTIME DATA panel.
///
/// Up to three panels stacked over one time axis, each showing one quantity: the
/// measured value and either its set-point or a companion channel. The user picks the
/// quantity of a panel from the menu on its title, hides and adds panels, and drags
/// the border between two panels to share the height between them.
///
/// Every channel is buffered all the time, so a panel switched to another quantity
/// shows its history at once. Two panels showing the same quantity share its buffer.
///
/// The log is not a chart, so the host widget holds a QStackedLayout with the plot and
/// a read-only text view.
class PlotController : public QObject
{
    Q_OBJECT

public:
    static constexpr int kPanelCount = 3;

    explicit PlotController(QObject *parent = nullptr);

    /// Builds the chart inside the placeholder widget from mainwindow.ui.
    void setupPlot(QWidget *hostWidget);

    void applySettings(const UiSettings &settings);
    void applyTheme(const QString &theme);
    /// Re-applies titles, axis labels and trace names after a language change;
    /// QCustomPlot elements are not widgets and never receive QEvent::LanguageChange.
    void retranslate();

    /// The quantity of each panel, top to bottom, None for a hidden one, and their
    /// relative heights. At least one panel stays on show.
    void setPanels(const QVector<PlotSignal> &panelSignals, const QVector<double> &heights);
    QVector<PlotSignal> panelSignals() const;
    QVector<double> panelHeights() const;

    void setAngleUnit(AngleUnit unit);

    /// Shows the log in place of the plot.
    void setLogVisible(bool visible);
    bool isLogVisible() const { return m_logVisible; }

    /// Pause stops ingesting samples and hands range control back to the user.
    void setLiveMode(bool enabled);
    bool isLiveMode() const { return m_liveMode; }

    /// Points picked on the paused plot; see PlotMeasurementTool.
    PlotMeasurement measurement() const;

    /// The line under the cursor with the time and value of each trace; see
    /// PlotCrosshairTool. Off by default.
    void setCrosshairEnabled(bool enabled);
    bool isCrosshairEnabled() const;

    void clear();

    // --- ingest ---
    void appendTelemetry(const TelemetryBatch &samples);
    void appendStatus(const DeviceStatus &status);
    /// `value` is in drive-native units, like the telemetry samples; `t_us` is its
    /// production time on the host clock.
    void appendSetpoint(double value, ServoControlType type, qint64 t_us);
    /// Says no more set-points are coming, once the trajectory stops or the selected
    /// drive changes. Telemetry is then no longer held back for them, and the last
    /// reported set-points are held flat under it.
    void endSetpoints();
    void appendLogLine(const QString &line);

    /// Writes the plot in `exportTheme` at `dpi`; the screen keeps its own theme.
    bool saveImage(const QString &filePath, plot_export::ImageFormat format,
                   const QString &exportTheme, int dpi, QString *error);
    /// The traces on show, on one time column; or the log, when it is on show.
    bool saveCsv(const QString &filePath, QString *error);

signals:
    void measurementChanged(const PlotMeasurement &measurement);

protected:
    /// Dragging the border between two panels, and the cursor over it and the titles.
    bool eventFilter(QObject *watched, QEvent *event) override;

private slots:
    void onDrawTimer();

private:
    /// Everything buffered, whatever the panels show.
    enum class Channel
    {
        Position,
        PositionTarget,
        Velocity,
        VelocityTarget,
        Torque,
        TorqueTarget,
        TempMcu,
        TempStator,
        BusCurrent,
        EncoderRotor,
        EncoderShaft,
        Count
    };
    static constexpr int kChannelCount = static_cast<int>(Channel::Count);
    /// Set-point histories: position, velocity, torque.
    static constexpr int kSetpointSlots = 3;

    /// What a panel draws for a quantity.
    struct SignalInfo
    {
        Channel measured = Channel::Position;
        Channel companion = Channel::Count;  ///< Count: no second trace
        bool companionIsSetpoint = false;
    };

    struct Panel
    {
        PlotSignal signal = PlotSignal::None;
        /// Share of the height, relative to the other panels on show.
        double height = 1.0;
        /// The header row over the axis rect.
        QCPLayoutGrid *cell = nullptr;
        QCPLayoutGrid *header = nullptr;
        QCPTextElement *title = nullptr;
        QCPLegend *legend = nullptr;
        PlotIconButton *maximize = nullptr;
        QCPAxisRect *rect = nullptr;
        QCPGraph *measured = nullptr;
        QCPGraph *companion = nullptr;
    };

    struct PendingSample
    {
        double key = 0.0;
        double value = 0.0;  ///< display units
    };

    struct SetpointSample
    {
        double key = 0.0;    ///< plot-clock seconds
        double value = 0.0;  ///< drive-native units
    };

    /// The smallest delivery delay (host_us - t_us) of one block of drive time, and the
    /// drive time of the sample it was seen on; see appendTelemetry().
    struct DelayAnchor
    {
        qint64 block = 0;
        qint64 driveUs = 0;
        qint64 delayUs = 0;
    };

    /// A telemetry sample whose set-points have not been reported yet.
    struct Unpaired
    {
        double key = 0.0;  ///< plot-clock seconds
        /// Drive-native units.
        double position = 0.0;
        double velocity = 0.0;
        double torque = 0.0;
    };

    static SignalInfo signalInfo(PlotSignal signal);
    static bool isAngular(Channel channel);
    static int setpointSlot(ServoControlType type);
    static Channel targetChannel(int slot);

    // --- panels ---
    void createPanel(int index);
    /// Puts the panels on show into the layout, in order, with their heights.
    void rebuildLayout();
    bool isShown(int index) const;
    int panelCount() const;
    /// Points the panel's traces at the buffers of its quantity, and names them.
    void configurePanel(int index);
    void setPanelSignal(int index, PlotSignal signal);
    void showPanelMenu(int index, const QPoint &globalPos);
    void addPanel();
    void hidePanel(int index);
    void toggleMaximized(int index);
    void updateTitles();
    /// Header fonts and colours, which the theme of the rest of the plot does not cover.
    void styleHeaders(const QString &theme);
    void applyPens(const QString &theme);
    /// Fits the value axis of a panel to its traces between `keys`.
    void autoscaleY(Panel &panel, const QCPRange &keys);
    void setXRange(const QCPRange &range);
    void syncXRange(const QCPRange &range);

    // --- border dragging ---
    /// The borders between the shown panels, along the middles of the gaps.
    QVector<QLineF> borderLines() const;
    /// The border between the shown panels `k` and `k + 1` under `pos`, or -1.
    int borderAt(const QPointF &pos) const;
    /// Highlights the border `index` as hovered or dragged; -1 for none.
    void setActiveBorder(int index);
    void dragBorder(double y);
    void updateCursor(const QPointF &pos);

    // --- ingest ---
    /// Seconds on the plot clock, the key for anything sampled right now.
    double nowKey() const;
    /// The plot-clock key of a hostTimeUs() instant.
    double hostKey(qint64 hostUs) const;
    /// Takes one telemetry sample into the lower envelope of the delivery delay.
    void addDelaySample(qint64 driveUs, qint64 hostUs);
    /// Delivery delay to add to a drive timestamp to put it on the host's clock.
    qint64 delayAt(qint64 driveUs) const;
    /// Set-point of `slot` at `key`, linearly interpolated between the two reports
    /// around it, held flat outside the reported range. False when nothing has been
    /// reported.
    bool setpointAt(int slot, double key, double *value) const;
    /// Moves telemetry samples whose set-points are known on to the traces. `flush`
    /// releases the rest too, against the last reported set-points.
    void releaseTelemetry(bool flush);
    void queue(Channel channel, double key, double value);
    /// Multiplies every buffered and plotted angular value, and the value axes of the
    /// angular panels, by `factor`.
    void rescaleValues(double factor);
    /// Radians to the display unit.
    double angleScale() const;
    QString titleText(PlotSignal signal) const;
    QString primaryName(PlotSignal signal) const;
    QString secondaryName(PlotSignal signal) const;
    QString csvColumn(Channel channel) const;

    QCustomPlot *m_plot = nullptr;
    QPlainTextEdit *m_logView = nullptr;
    QStackedLayout *m_stack = nullptr;
    QCPMarginGroup *m_marginGroup = nullptr;
    std::array<Panel, kPanelCount> m_panels;
    /// The panel shown alone, or -1.
    int m_maximized = -1;
    PlotMeasurementTool *m_measure = nullptr;
    PlotCrosshairTool *m_crosshair = nullptr;
    /// Draws the borders between the panels.
    QCPLayerable *m_borders = nullptr;

    std::array<QSharedPointer<QCPGraphDataContainer>, kChannelCount> m_channels;
    /// For a trace with nothing to show.
    QSharedPointer<QCPGraphDataContainer> m_noData;
    /// Samples waiting for the next draw tick.
    std::array<QVector<PendingSample>, kChannelCount> m_pending;

    UiSettings m_settings;
    QString m_theme = QStringLiteral("dark");
    AngleUnit m_angleUnit = AngleUnit::Radians;

    bool m_liveMode = true;
    bool m_logVisible = false;
    bool m_initialized = false;
    bool m_dirty = false;
    bool m_syncingX = false;
    /// The image export hides the menu and maximise marks of the titles.
    bool m_exporting = false;

    /// The border being dragged, see borderAt(), or -1.
    int m_dragBorder = -1;
    Qt::CursorShape m_cursor = Qt::ArrowCursor;

    QTimer m_drawTimer;
    /// hostTimeUs() at which the plot clock reads zero.
    qint64 m_clockStartUs = 0;
    /// QCustomPlot's sorted fast path needs strictly increasing keys; telemetry and the
    /// polled status are keyed apart.
    double m_lastTelemetryKey = -std::numeric_limits<double>::infinity();
    double m_lastStatusKey = -std::numeric_limits<double>::infinity();
    /// The newest key drawn: the right edge of the live window.
    double m_rightKey = -std::numeric_limits<double>::infinity();
    int m_ticksSinceRescale = 0;
    int m_rescaleIntervalTicks = 15;

    /// The last few blocks of the delay's lower envelope, oldest first; the last one
    /// is the block still being filled. See appendTelemetry().
    QVector<DelayAnchor> m_anchors;
    qint64 m_anchorOriginUs = 0;
    qint64 m_lastDriveUs = 0;

    /// Recent set-point reports of each slot, keyed on the plot clock. A target trace
    /// is drawn at the telemetry keys, so each measurement is paired with the set-point
    /// interpolated at its own instant rather than with whatever report happened to
    /// arrive last - that alone was a staircase at the telemetry batch rate.
    std::array<QVector<SetpointSample>, kSetpointSlots> m_setpoints;
    /// Telemetry newer than the newest set-point report. It is held back until the
    /// report for its instant arrives: pairing it at once would hold the last report
    /// flat over the tail of every telemetry batch, and the reference would come out
    /// as a staircase with its peaks cut off.
    QVector<Unpaired> m_unpaired;
    /// Set-points are still being reported; see endSetpoints().
    bool m_setpointStreamOpen = false;
};

#endif // VBDW_UI_PLOT_CONTROLLER_H
