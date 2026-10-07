#include "ui/plot_icon_button.h"

#include <QIcon>
#include <QMouseEvent>
#include <QPainter>

namespace {
constexpr int kIconSize = 16;
}

PlotIconButton::PlotIconButton(QCustomPlot *parentPlot)
    : QCPLayoutElement(parentPlot)
{
}

void PlotIconButton::setGlyph(const QString &glyph)
{
    if (glyph == m_glyph)
        return;
    m_glyph = glyph;
    m_pixmap = QPixmap();
}

void PlotIconButton::setColor(const QColor &color)
{
    if (color == m_color)
        return;
    m_color = color;
    m_pixmap = QPixmap();
}

double PlotIconButton::selectTest(const QPointF &pos, bool onlySelectable,
                                  QVariant *details) const
{
    Q_UNUSED(details)
    if (onlySelectable || m_glyph.isEmpty() || !mRect.contains(pos.toPoint()))
        return -1;
    return mParentPlot->selectionTolerance() * 0.99;
}

void PlotIconButton::draw(QCPPainter *painter)
{
    if (m_glyph.isEmpty())
        return;
    const qreal ratio = painter->device()->devicePixelRatioF();
    if (m_pixmap.isNull() || m_pixmap.devicePixelRatio() != ratio) {
        // The glyphs are white artwork, so the colour floods whatever they cover.
        m_pixmap = QIcon(QStringLiteral(":/icons/%1.svg").arg(m_glyph))
                           .pixmap(QSize(kIconSize, kIconSize), ratio);
        if (m_pixmap.isNull())
            return;
        QPainter tint(&m_pixmap);
        tint.setCompositionMode(QPainter::CompositionMode_SourceIn);
        tint.fillRect(m_pixmap.rect(), m_color);
    }
    const QSize size = m_pixmap.deviceIndependentSize().toSize();
    painter->drawPixmap(mRect.right() + 1 - size.width(),
                        mRect.top() + (mRect.height() - size.height()) / 2, m_pixmap);
}

QSize PlotIconButton::minimumOuterSizeHint() const
{
    const int side = m_glyph.isEmpty() ? 0 : kIconSize;
    return QSize(side + mMargins.left() + mMargins.right(),
                 side + mMargins.top() + mMargins.bottom());
}

QSize PlotIconButton::maximumOuterSizeHint() const
{
    return QSize(QWIDGETSIZE_MAX, minimumOuterSizeHint().height());
}

void PlotIconButton::mousePressEvent(QMouseEvent *event, const QVariant &details)
{
    Q_UNUSED(details)
    event->accept();
}

void PlotIconButton::mouseReleaseEvent(QMouseEvent *event, const QPointF &startPos)
{
    // A click, not the end of a drag.
    if ((event->position() - startPos).manhattanLength() <= 3)
        emit clicked(event);
}
