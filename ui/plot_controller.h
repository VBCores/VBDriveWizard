#ifndef VBDW_UI_PLOT_CONTROLLER_H
#define VBDW_UI_PLOT_CONTROLLER_H

#include "app_types.h"
#include "ui/plot_export.h"
#include "ui/plot_measurement.h"

#include <QObject>
#include <QTimer>
#include <QVector>

QT_BEGIN_NAMESPACE
class QPlainTextEdit;
class QStackedLayout;
class QWidget;
QT_END_NAMESPACE

class QCPGraph;
class QCustomPlot;
class PlotCrosshairTool;

/// The realtime chart in the REALTIME DATA panel.
///
/// Exactly one signal is plotted at a time, with at most two traces (the measured
/// value and either its set-point or a companion channel). Nothing is buffered or
/// drawn for signals that are not selected.
///
/// The Log entry of the signal selector is not a chart, so the host widget holds a
/// QStackedLayout with the plot and a read-only text view.
class PlotController : public QObject
{
    Q_OBJECT

public:
    explicit PlotController(QObject *parent = nullptr);

    /// Builds the chart inside the placeholder widget from mainwindow.ui.
    void setupPlot(QWidget *hostWidget);

    void applySettings(const UiSettings &settings);
    void applyTheme(const QString &theme);
    /// Re-applies axis labels and trace names after a language change; QCustomPlot
    /// elements are not widgets and never receive QEvent::LanguageChange.
    void retranslate();

    PlotSignal currentSignal() const { return m_signal; }
    void setSignal(PlotSignal signal);
    void setAngleUnit(AngleUnit unit);

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

    // --- ingest; each is a no-op unless it feeds the selected signal ---
    void appendTelemetry(const TelemetryBatch &samples);
    void appendStatus(const DeviceStatus &status);
    /// `value` is in drive-native units, like the telemetry samples; `t_us` is its
    /// production time on the host clock.
    void appendSetpoint(double value, ServoControlType type, qint64 t_us);
    /// Says no more set-points are coming, once the trajectory stops or the selected
    /// drive changes. Telemetry is then no longer held back for them, and the last
    /// reported set-point is held flat under it.
    void endSetpoints();
    void appendLogLine(const QString &line);

    /// Writes the plot in `exportTheme` at `dpi`; the screen keeps its own theme.
    bool saveImage(const QString &filePath, plot_export::ImageFormat format,
                   const QString &exportTheme, int dpi, QString *error);
    bool saveCsv(const QString &filePath, QString *error);

signals:
    void measurementChanged(const PlotMeasurement &measurement);

private slots:
    void onDrawTimer();

private:
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

    /// A telemetry sample whose set-point has not been reported yet.
    struct Unpaired
    {
        double key = 0.0;    ///< plot-clock seconds
        double value = 0.0;  ///< drive-native units
    };

    struct Pending
    {
        double key = 0.0;
        double primary = 0.0;
        double secondary = 0.0;
        bool hasSecondary = false;
    };

    void configureForSignal();
    void applyPens(const QString &theme);
    /// Seconds on the plot clock, the key for anything sampled right now.
    double nowKey() const;
    /// The plot-clock key of a hostTimeUs() instant.
    double hostKey(qint64 hostUs) const;
    /// Takes one telemetry sample into the lower envelope of the delivery delay.
    void addDelaySample(qint64 driveUs, qint64 hostUs);
    /// Delivery delay to add to a drive timestamp to put it on the host's clock.
    qint64 delayAt(qint64 driveUs) const;
    /// Set-point at `key`, linearly interpolated between the two reports around it,
    /// held flat outside the reported range. False when nothing has been reported.
    bool setpointAt(double key, double *value) const;
    /// Moves telemetry samples whose set-point is known on to the trace. `flush`
    /// releases the rest too, against the last reported set-point.
    void releaseTelemetry(bool flush);
    void push(double key, double primary, bool hasSecondary, double secondary);
    /// Multiplies every buffered and plotted value, and the value axis, by `factor`.
    void rescaleValues(double factor);
    double displayScale() const;
    QString primaryName() const;
    QString secondaryName() const;
    QString yAxisLabel() const;
    bool signalUsesSetpoint() const;

    QCustomPlot *m_plot = nullptr;
    QPlainTextEdit *m_logView = nullptr;
    QStackedLayout *m_stack = nullptr;
    QCPGraph *m_primary = nullptr;
    QCPGraph *m_secondary = nullptr;
    PlotMeasurementTool *m_measure = nullptr;
    PlotCrosshairTool *m_crosshair = nullptr;

    UiSettings m_settings;
    QString m_theme = QStringLiteral("dark");
    PlotSignal m_signal = PlotSignal::Position;
    AngleUnit m_angleUnit = AngleUnit::Radians;

    bool m_liveMode = true;
    bool m_initialized = false;
    bool m_dirty = false;

    QVector<Pending> m_pending;
    QTimer m_drawTimer;
    /// hostTimeUs() at which the plot clock reads zero.
    qint64 m_clockStartUs = 0;
    double m_lastKey = 0.0;
    bool m_haveLastKey = false;
    int m_ticksSinceRescale = 0;
    int m_rescaleIntervalTicks = 15;

    /// The last few blocks of the delay's lower envelope, oldest first; the last one
    /// is the block still being filled. See appendTelemetry().
    QVector<DelayAnchor> m_anchors;
    qint64 m_anchorOriginUs = 0;
    qint64 m_lastDriveUs = 0;

    /// Recent set-point reports, keyed on the plot clock. The set-point trace is
    /// drawn at the telemetry keys, so each measurement is paired with the set-point
    /// interpolated at its own instant rather than with whatever report happened to
    /// arrive last - that alone was a staircase at the telemetry batch rate.
    QVector<SetpointSample> m_setpoints;
    /// Telemetry newer than the newest set-point report. It is held back until the
    /// report for its instant arrives: pairing it at once would hold the last report
    /// flat over the tail of every telemetry batch, and the reference would come out
    /// as a staircase with its peaks cut off.
    QVector<Unpaired> m_unpaired;
    /// Set-points for the signal on screen are still being reported; see endSetpoints().
    bool m_setpointStreamOpen = false;
};

#endif // VBDW_UI_PLOT_CONTROLLER_H
