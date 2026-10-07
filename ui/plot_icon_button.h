#ifndef VBDW_UI_PLOT_ICON_BUTTON_H
#define VBDW_UI_PLOT_ICON_BUTTON_H

#include "third_party/qcustomplot/qcustomplot.h"

#include <QColor>
#include <QPixmap>
#include <QString>

/// A clickable glyph in a QCustomPlot layout, such as the maximise mark of a plot
/// panel. It shows a bundled white `:/icons/<glyph>.svg` tinted with one colour, at
/// the right of its cell and centred vertically; with no glyph it is blank and takes
/// no clicks. The glyphs are drawn on a 16 px grid and shown at that size, so their
/// one-pixel lines stay sharp.
class PlotIconButton : public QCPLayoutElement
{
    Q_OBJECT

public:
    explicit PlotIconButton(QCustomPlot *parentPlot);

    QString glyph() const { return m_glyph; }
    /// The icon's resource name without the extension, or empty for none.
    void setGlyph(const QString &glyph);
    void setColor(const QColor &color);

    double selectTest(const QPointF &pos, bool onlySelectable,
                      QVariant *details = nullptr) const override;

signals:
    void clicked(QMouseEvent *event);

protected:
    void draw(QCPPainter *painter) override;
    QSize minimumOuterSizeHint() const override;
    QSize maximumOuterSizeHint() const override;
    void mousePressEvent(QMouseEvent *event, const QVariant &details) override;
    void mouseReleaseEvent(QMouseEvent *event, const QPointF &startPos) override;

private:
    QString m_glyph;
    QColor m_color = Qt::black;
    /// The tinted icon, rendered again once the glyph, colour or the screen's
    /// pixel ratio changes.
    QPixmap m_pixmap;
};

#endif // VBDW_UI_PLOT_ICON_BUTTON_H
