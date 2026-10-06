#include "ui/plot_export.h"

#include "third_party/qcustomplot/qcustomplot.h"
#include "ui/theme_manager.h"

#include <QCoreApplication>

#ifdef VBDW_HAVE_SVG
#include <QSvgGenerator>
#endif

namespace {

/// Resolution the plot is laid out at on screen; the export scales from it.
constexpr int kScreenDpi = 96;

QString tr(const char *text)
{
    return QCoreApplication::translate("plot_export", text);
}

bool writeSvg(QCustomPlot *plot, const QString &filePath, int dpi)
{
#ifdef VBDW_HAVE_SVG
    QSvgGenerator generator;
    generator.setFileName(filePath);
    generator.setSize(plot->size());
    generator.setViewBox(plot->rect());
    generator.setResolution(dpi);
    QCPPainter painter;
    if (!painter.begin(&generator))
        return false;
    plot->toPainter(&painter, plot->width(), plot->height());
    return painter.end();
#else
    Q_UNUSED(plot)
    Q_UNUSED(filePath)
    Q_UNUSED(dpi)
    return false;
#endif
}

} // namespace

namespace plot_export {

bool svgSupported()
{
#ifdef VBDW_HAVE_SVG
    return true;
#else
    return false;
#endif
}

bool saveImage(QCustomPlot *plot, const QString &filePath, ImageFormat format,
               const QString &exportTheme, const QString &screenTheme, int fontSize, int dpi,
               QString *error, const std::function<void(const QString &theme)> &restyle)
{
    if (!plot) {
        if (error)
            *error = tr("The plot is not initialised.");
        return false;
    }
    if (format == ImageFormat::Svg && !svgSupported()) {
        if (error)
            *error = tr("This build cannot write SVG: the Qt SVG module was not available "
                        "when it was compiled. Choose PNG or JPG instead.");
        return false;
    }

    dpi = qBound(36, dpi, 1200);
    ThemeManager::applyPlotTheme(plot, exportTheme, fontSize);
    if (restyle)
        restyle(exportTheme);
    plot->replot(QCustomPlot::rpImmediateRefresh);

    const double scale = static_cast<double>(dpi) / kScreenDpi;
    bool ok = false;
    switch (format) {
    case ImageFormat::Png:
        ok = plot->savePng(filePath, 0, 0, scale, -1, dpi);
        break;
    case ImageFormat::Jpg:
        ok = plot->saveJpg(filePath, 0, 0, scale, 95, dpi);
        break;
    case ImageFormat::Svg:
        ok = writeSvg(plot, filePath, dpi);
        break;
    }

    ThemeManager::applyPlotTheme(plot, screenTheme, fontSize);
    if (restyle)
        restyle(screenTheme);
    plot->replot(QCustomPlot::rpQueuedReplot);

    if (!ok && error)
        *error = tr("Could not write %1.").arg(filePath);
    return ok;
}

} // namespace plot_export
