#ifndef VBDW_UI_PLOT_EXPORT_H
#define VBDW_UI_PLOT_EXPORT_H

#include <QString>

#include <functional>

class QCustomPlot;

/// Image export shared by every plot in the application.
namespace plot_export {

enum class ImageFormat { Png, Jpg, Svg };

/// Renders `plot` into `filePath` in `exportTheme` at `dpi`, then puts the plot back
/// on `screenTheme`. The size is the on-screen size scaled to the requested DPI, so
/// the image looks like what the user saw, only sharper.
///
/// SVG needs the Qt SVG module; a build without it reports that instead of writing
/// a raster image under an .svg name.
///
/// `restyle` is called with each theme after the plot chrome took it, for what the
/// caller styles itself: the series pens, or axes coloured after their curves.
bool saveImage(QCustomPlot *plot, const QString &filePath, ImageFormat format,
               const QString &exportTheme, const QString &screenTheme, int fontSize, int dpi,
               QString *error,
               const std::function<void(const QString &theme)> &restyle = {});

/// Whether this build can write SVG at all.
bool svgSupported();

} // namespace plot_export

#endif // VBDW_UI_PLOT_EXPORT_H
