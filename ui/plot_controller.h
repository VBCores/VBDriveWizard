#ifndef VBDW_UI_PLOT_CONTROLLER_H
#define VBDW_UI_PLOT_CONTROLLER_H

#include "app_types.h"

#include <QElapsedTimer>
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

    void clear();

    // --- ingest; each is a no-op unless it feeds the selected signal ---
    void appendTelemetry(const TelemetryBatch &samples);
    void appendStatus(const DeviceStatus &status);
    /// `value` is in drive-native units, like the telemetry samples.
    void appendSetpoint(double value, ServoControlType type);
    void appendLogLine(const QString &line);

    bool savePng(const QString &filePath, QString *error);
    bool saveCsv(const QString &filePath, QString *error);

private slots:
    void onDrawTimer();

private:
    struct Pending
    {
        double key = 0.0;
        double primary = 0.0;
        double secondary = 0.0;
        bool hasSecondary = false;
    };

    void configureForSignal();
    void push(double primary, bool hasSecondary, double secondary);
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

    UiSettings m_settings;
    QString m_theme = QStringLiteral("dark");
    PlotSignal m_signal = PlotSignal::Position;
    AngleUnit m_angleUnit = AngleUnit::Radians;

    bool m_liveMode = true;
    bool m_initialized = false;
    bool m_dirty = false;

    QVector<Pending> m_pending;
    QTimer m_drawTimer;
    QElapsedTimer m_clock;
    double m_lastKey = 0.0;
    bool m_haveLastKey = false;
    int m_ticksSinceRescale = 0;
    int m_rescaleIntervalTicks = 15;

    /// Latest set-point, held between telemetry samples so the two traces share keys.
    double m_lastSetpoint = 0.0;
    bool m_haveSetpoint = false;
};

#endif // VBDW_UI_PLOT_CONTROLLER_H
