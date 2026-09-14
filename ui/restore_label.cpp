#include "ui/restore_label.h"

#include <QEnterEvent>
#include <QMouseEvent>
#include <QPainter>

namespace {
constexpr int kIconSize = 18;
}

RestoreLabel::RestoreLabel(QWidget *parent)
    : QLabel(parent)
    , m_normal(0x2d, 0x9a, 0x4a)
    , m_hover(0x66, 0xd9, 0x84)
{
    // The bundled restore.svg is a fixed-colour glyph, so it is rendered once at icon
    // size and re-tinted per theme rather than re-parsed.
    m_source = QIcon(QStringLiteral(":/icons/restore.svg"))
                       .pixmap(QSize(kIconSize, kIconSize));
    setCursor(Qt::PointingHandCursor);
    setToolTip(tr("Restore the value this field had when the drive was selected"));
    setFixedSize(kIconSize, kIconSize);
    setScaledContents(false);
    setText(QString());
    refreshPixmap();
}

void RestoreLabel::applyColors(const QColor &normal, const QColor &hover)
{
    m_normal = normal;
    m_hover = hover;
    refreshPixmap();
}

QPixmap RestoreLabel::tinted(const QColor &color) const
{
    if (m_source.isNull())
        return m_source;
    QPixmap out = m_source;
    QPainter painter(&out);
    painter.setCompositionMode(QPainter::CompositionMode_SourceIn);
    painter.fillRect(out.rect(), color);
    return out;
}

void RestoreLabel::refreshPixmap()
{
    setPixmap(tinted(m_hovered ? m_hover : m_normal));
}

void RestoreLabel::enterEvent(QEnterEvent *event)
{
    m_hovered = true;
    refreshPixmap();
    QLabel::enterEvent(event);
}

void RestoreLabel::leaveEvent(QEvent *event)
{
    m_hovered = false;
    refreshPixmap();
    QLabel::leaveEvent(event);
}

void RestoreLabel::mouseReleaseEvent(QMouseEvent *event)
{
    if (event->button() == Qt::LeftButton && rect().contains(event->pos()))
        emit clicked();
    QLabel::mouseReleaseEvent(event);
}
