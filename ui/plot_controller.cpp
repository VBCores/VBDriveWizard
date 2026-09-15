#include "ui/plot_controller.h"

#include "core/units.h"
#include "third_party/qcustomplot/qcustomplot.h"
#include "ui/theme_manager.h"

#include <QPlainTextEdit>
#include <QSaveFile>
#include <QStackedLayout>
#include <QTextStream>
#include <QVBoxLayout>

#include <cmath>

namespace {
constexpr double kYAxisMargin = 1.2;
constexpr int kExportDpi = 96;
constexpr int kMaxLogLines = 2000;
/// A telemetry sample delivered this much later than the offset predicts is not late:
/// its clock has restarted, and the offset is re-estimated.
constexpr double kTelemetryResyncS = 1.0;
} // namespace

PlotController::PlotController(QObject *parent)
    : QObject(parent)
{
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
    m_plot->legend->setVisible(true);

    m_primary = m_plot->addGraph();
    m_primary->setAdaptiveSampling(true);
    m_secondary = m_plot->addGraph();
    m_secondary->setAdaptiveSampling(true);

    m_logView = new QPlainTextEdit(hostWidget);
    m_logView->setReadOnly(true);
    m_logView->setMaximumBlockCount(kMaxLogLines);
    m_logView->setLineWrapMode(QPlainTextEdit::NoWrap);

    m_stack->addWidget(m_plot);
    m_stack->addWidget(m_logView);
    m_stack->setCurrentWidget(m_plot);

    m_clock.start();
    m_initialized = true;

    configureForSignal();
    applySettings(m_settings);
    applyTheme(m_theme);
    retranslate();
}

void PlotController::applySettings(const UiSettings &settings)
{
    m_settings = settings;
    // Autoscale the value axis about twice a second rather than every frame.
    m_rescaleIntervalTicks = qMax(1, m_settings.plot_draw_rate_hz / 2);

    const int intervalMs =
            qMax(1, static_cast<int>(1000.0 / qMax(1, m_settings.plot_draw_rate_hz)));
    m_drawTimer.setInterval(intervalMs);
    if (!m_drawTimer.isActive())
        m_drawTimer.start();

    if (!m_initialized)
        return;

    const QPen measured(ThemeManager::measuredColor(m_theme), m_settings.plot_line_width);
    m_primary->setPen(measured);
    QPen companion(signalUsesSetpoint() ? ThemeManager::setpointColor(m_theme)
                                        : ThemeManager::secondaryColor(m_theme),
                   m_settings.plot_line_width);
    if (signalUsesSetpoint())
        companion.setStyle(Qt::DashLine);
    m_secondary->setPen(companion);

    if (m_haveLastKey) {
        const double left = qMax(0.0, m_lastKey - m_settings.plot_time_window_s);
        m_primary->data()->removeBefore(left);
        m_secondary->data()->removeBefore(left);
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
    m_primary->setPen(QPen(ThemeManager::measuredColor(theme), m_settings.plot_line_width));
    QPen companion(signalUsesSetpoint() ? ThemeManager::setpointColor(theme)
                                        : ThemeManager::secondaryColor(theme),
                   m_settings.plot_line_width);
    if (signalUsesSetpoint())
        companion.setStyle(Qt::DashLine);
    m_secondary->setPen(companion);
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

void PlotController::retranslate()
{
    if (!m_initialized)
        return;
    m_plot->xAxis->setLabel(tr("t, s"));
    m_plot->yAxis->setLabel(yAxisLabel());
    m_primary->setName(primaryName());
    m_secondary->setName(secondaryName());
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

// --- signal selection -------------------------------------------------------------

bool PlotController::signalUsesSetpoint() const
{
    switch (m_signal) {
    case PlotSignal::Position:
    case PlotSignal::Velocity:
    case PlotSignal::Torque:
        return true;
    default:
        return false;
    }
}

QString PlotController::primaryName() const
{
    switch (m_signal) {
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
    case PlotSignal::Log:
        break;
    }
    return QString();
}

QString PlotController::secondaryName() const
{
    switch (m_signal) {
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

QString PlotController::yAxisLabel() const
{
    switch (m_signal) {
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
        return tr("Current, A");
    case PlotSignal::Encoder:
        return tr("Encoder, counts");
    case PlotSignal::Log:
        break;
    }
    return QString();
}

/// Radian-valued signals arrive in radians; the traces hold them in the display unit.
double PlotController::displayScale() const
{
    if (m_angleUnit != AngleUnit::Degrees)
        return 1.0;
    return (m_signal == PlotSignal::Position || m_signal == PlotSignal::Velocity)
            ? units::kRadToDeg
            : 1.0;
}

void PlotController::configureForSignal()
{
    if (!m_initialized)
        return;
    const bool isLog = (m_signal == PlotSignal::Log);
    m_stack->setCurrentWidget(isLog ? static_cast<QWidget *>(m_logView)
                                    : static_cast<QWidget *>(m_plot));
    m_secondary->setVisible(!secondaryName().isEmpty());
    m_plot->legend->setVisible(!isLog && !secondaryName().isEmpty());
}

void PlotController::setSignal(PlotSignal signal)
{
    if (m_signal == signal)
        return;
    m_signal = signal;
    clear();
    configureForSignal();
    retranslate();
}

void PlotController::setAngleUnit(AngleUnit unit)
{
    if (m_angleUnit == unit)
        return;
    const double before = displayScale();
    m_angleUnit = unit;
    // The traces hold display units, so what is already on screen is converted in
    // place: a paused plot keeps its picture, a live one keeps its history.
    rescaleValues(displayScale() / before);
    retranslate();
}

void PlotController::rescaleValues(double factor)
{
    if (qFuzzyCompare(factor, 1.0))
        return;
    for (Pending &pending : m_pending) {
        pending.primary *= factor;
        pending.secondary *= factor;
    }
    if (!m_initialized)
        return;
    // Values only; the containers stay sorted by key.
    for (QCPGraph *graph : {m_primary, m_secondary}) {
        auto data = graph->data();
        for (auto it = data->begin(); it != data->end(); ++it)
            it->value *= factor;
    }
    const QCPRange range = m_plot->yAxis->range();
    m_plot->yAxis->setRange(range.lower * factor, range.upper * factor);
    m_plot->replot(QCustomPlot::rpQueuedReplot);
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
}

void PlotController::clear()
{
    m_pending.clear();
    m_haveLastKey = false;
    m_haveTelemetryOffset = false;
    m_lastKey = 0.0;
    m_haveSetpoint = false;
    m_lastSetpoint = 0.0;
    if (!m_initialized)
        return;
    m_primary->data()->clear();
    m_secondary->data()->clear();
    m_plot->replot(QCustomPlot::rpQueuedReplot);
}

// --- ingest -------------------------------------------------------------------------

double PlotController::nowKey() const
{
    return static_cast<double>(m_clock.nsecsElapsed()) * 1e-9;
}

void PlotController::push(double key, double primary, bool hasSecondary, double secondary)
{
    if (!m_liveMode || !m_initialized)
        return;

    Pending pending;
    pending.key = key;
    pending.primary = primary;
    pending.hasSecondary = hasSecondary;
    pending.secondary = secondary;
    m_pending.push_back(pending);
    m_dirty = true;
}

void PlotController::appendTelemetry(const TelemetryBatch &samples)
{
    if (samples.isEmpty())
        return;
    if (m_signal != PlotSignal::Position && m_signal != PlotSignal::Velocity
        && m_signal != PlotSignal::Torque) {
        return;  // this signal is not fed by telemetry
    }

    const double scale = displayScale();
    // A batch carries several samples produced over the whole batch interval, so
    // each is keyed by its own timestamp rather than by the moment the batch landed.
    // The sample clock (the drive's on CAN, the host's on Serial) is mapped onto the
    // plot clock by the smallest delivery delay seen (the newest sample of a batch
    // has the smallest one): delivery never runs ahead of sampling, so the minimum is
    // the best estimate of the offset between the two, and with it a steady sample
    // rate comes out as evenly spaced points. A delay that jumps far beyond that
    // estimate means the sample clock restarted, and the offset is taken afresh so
    // the trace simply continues from "now".
    const double delay = nowKey() - static_cast<double>(samples.last().t_us) * 1e-6;
    if (!m_haveTelemetryOffset || delay < m_telemetryOffset
        || delay - m_telemetryOffset > kTelemetryResyncS) {
        m_telemetryOffset = delay;
        m_haveTelemetryOffset = true;
    }

    for (const TelemetrySample &sample : samples) {
        double value = 0.0;
        switch (m_signal) {
        case PlotSignal::Position:
            value = sample.position;
            break;
        case PlotSignal::Velocity:
            value = sample.velocity;
            break;
        case PlotSignal::Torque:
            value = sample.torque;
            break;
        default:
            break;
        }
        push(static_cast<double>(sample.t_us) * 1e-6 + m_telemetryOffset, value * scale,
             m_haveSetpoint, m_lastSetpoint * scale);
    }
}

void PlotController::appendStatus(const DeviceStatus &status)
{
    switch (m_signal) {
    case PlotSignal::Temperature:
        if (std::isnan(status.tempMcu))
            return;
        push(nowKey(), status.tempMcu, !std::isnan(status.tempStator), status.tempStator);
        break;
    case PlotSignal::Current:
        if (std::isnan(status.busCurrent))
            return;
        push(nowKey(), status.busCurrent, false, 0.0);
        break;
    case PlotSignal::Encoder:
        if (std::isnan(status.encoderRotor))
            return;
        push(nowKey(), status.encoderRotor, !std::isnan(status.encoderShaft),
             status.encoderShaft);
        break;
    default:
        break;
    }
}

void PlotController::appendSetpoint(double value, ServoControlType type)
{
    // Only remembered when it belongs to the signal on screen; the trace itself is
    // emitted alongside the next telemetry sample so both share a key. Kept in
    // native units and scaled together with that sample.
    const bool matches = (m_signal == PlotSignal::Position && type == ServoControlType::Position)
            || (m_signal == PlotSignal::Velocity && type == ServoControlType::Velocity)
            || (m_signal == PlotSignal::Torque
                && (type == ServoControlType::Torque || type == ServoControlType::Voltage));
    if (!matches)
        return;
    m_lastSetpoint = value;
    m_haveSetpoint = true;
}

void PlotController::appendLogLine(const QString &line)
{
    if (m_signal != PlotSignal::Log || !m_logView || !m_liveMode)
        return;
    m_logView->appendPlainText(line);
}

// --- drawing -------------------------------------------------------------------------

void PlotController::onDrawTimer()
{
    if (!m_dirty || !m_initialized || m_pending.isEmpty())
        return;

    QVector<double> keys;
    QVector<double> primaries;
    QVector<double> secondaries;
    keys.reserve(m_pending.size());
    primaries.reserve(m_pending.size());
    secondaries.reserve(m_pending.size());

    const bool withSecondary = m_secondary->visible();
    for (const Pending &pending : m_pending) {
        double key = pending.key;
        // QCustomPlot's sorted fast path needs strictly increasing keys.
        if (m_haveLastKey && key <= m_lastKey)
            key = m_lastKey + 1e-6;
        m_lastKey = key;
        m_haveLastKey = true;

        keys.push_back(key);
        primaries.push_back(pending.primary);
        if (withSecondary)
            secondaries.push_back(pending.hasSecondary ? pending.secondary : 0.0);
    }
    m_pending.clear();

    m_primary->addData(keys, primaries, true);
    if (withSecondary)
        m_secondary->addData(keys, secondaries, true);

    const double right = keys.last();
    const double left = qMax(0.0, right - m_settings.plot_time_window_s);
    m_plot->xAxis->setRange(left, right);
    m_primary->data()->removeBefore(left);
    m_secondary->data()->removeBefore(left);

    if (++m_ticksSinceRescale >= m_rescaleIntervalTicks) {
        m_ticksSinceRescale = 0;
        bool found = false;
        QCPRange range = m_primary->getValueRange(found, QCP::sdBoth, QCPRange(left, right));
        if (found && withSecondary) {
            bool foundSecondary = false;
            const QCPRange other =
                    m_secondary->getValueRange(foundSecondary, QCP::sdBoth, QCPRange(left, right));
            if (foundSecondary)
                range.expand(other);
        }
        if (found && std::isfinite(range.lower) && std::isfinite(range.upper)) {
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
            m_plot->yAxis->setRange(lower, upper);
        }
    }

    m_plot->replot(QCustomPlot::rpQueuedReplot);
    m_dirty = false;
}

// --- export ---------------------------------------------------------------------------

bool PlotController::savePng(const QString &filePath, QString *error)
{
    if (!m_initialized) {
        if (error)
            *error = tr("The plot is not initialised.");
        return false;
    }
    if (m_signal == PlotSignal::Log) {
        if (error)
            *error = tr("The log view cannot be exported as an image.");
        return false;
    }

    // Export on white so the image is usable in documents regardless of the UI theme.
    ThemeManager::applyPlotTheme(m_plot, QStringLiteral("light"), m_settings.plot_font_size);
    m_plot->replot(QCustomPlot::rpImmediateRefresh);

    QImage image = m_plot->toPixmap().toImage();
    ThemeManager::applyPlotTheme(m_plot, m_theme, m_settings.plot_font_size);
    m_plot->replot(QCustomPlot::rpQueuedReplot);

    if (image.isNull()) {
        if (error)
            *error = tr("The plot could not be rendered.");
        return false;
    }
    const int dotsPerMeter = qRound(kExportDpi / 0.0254);
    image.setDotsPerMeterX(dotsPerMeter);
    image.setDotsPerMeterY(dotsPerMeter);
    if (!image.save(filePath, "PNG", -1)) {
        if (error)
            *error = tr("Could not write %1.").arg(filePath);
        return false;
    }
    return true;
}

bool PlotController::saveCsv(const QString &filePath, QString *error)
{
    if (!m_initialized) {
        if (error)
            *error = tr("The plot is not initialised.");
        return false;
    }

    if (m_signal == PlotSignal::Log) {
        QSaveFile file(filePath);
        if (!file.open(QIODevice::WriteOnly | QIODevice::Text)) {
            if (error)
                *error = tr("Could not write %1: %2").arg(filePath, file.errorString());
            return false;
        }
        QTextStream out(&file);
        out.setEncoding(QStringConverter::Utf8);
        out << m_logView->toPlainText();
        if (!file.commit()) {
            if (error)
                *error = tr("Could not write %1: %2").arg(filePath, file.errorString());
            return false;
        }
        return true;
    }

    QSaveFile file(filePath);
    if (!file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        if (error)
            *error = tr("Could not write %1: %2").arg(filePath, file.errorString());
        return false;
    }

    QTextStream out(&file);
    out.setEncoding(QStringConverter::Utf8);
    out.setLocale(QLocale::c());
    out.setRealNumberNotation(QTextStream::SmartNotation);
    out.setRealNumberPrecision(12);

    const bool withSecondary = m_secondary->visible();
    out << "time_s," << primaryName();
    if (withSecondary)
        out << ',' << secondaryName();
    out << '\n';

    // Exports what is currently in the window, which is what the user is looking at.
    const auto *primaryData = m_primary->data().data();
    const auto *secondaryData = m_secondary->data().data();
    auto secondaryIt = secondaryData->constBegin();

    for (auto it = primaryData->constBegin(); it != primaryData->constEnd(); ++it) {
        out << it->key << ',' << it->value;
        if (withSecondary) {
            if (secondaryIt != secondaryData->constEnd()) {
                out << ',' << secondaryIt->value;
                ++secondaryIt;
            } else {
                out << ',';
            }
        }
        out << '\n';
    }

    if (!file.commit()) {
        if (error)
            *error = tr("Could not write %1: %2").arg(filePath, file.errorString());
        return false;
    }
    return true;
}
