#ifndef UI_RESTORE_LABEL_H
#define UI_RESTORE_LABEL_H

#include <QLabel>
#include <QPixmap>

/// The clickable "revert this field" affordance next to every configuration editor.
///
/// It shows `:/icons/restore.svg` instead of a caption, tints the icon on hover so it
/// reads as clickable, and emits clicked(). MainWindow keeps it hidden until the
/// bound editor diverges from the DeviceParamList snapshot.
class RestoreLabel : public QLabel
{
    Q_OBJECT

public:
    explicit RestoreLabel(QWidget *parent = nullptr);

    /// Re-tints the icon for the active theme. Called on every theme change.
    void applyColors(const QColor &normal, const QColor &hover);

signals:
    void clicked();

protected:
    void enterEvent(QEnterEvent *event) override;
    void leaveEvent(QEvent *event) override;
    void mouseReleaseEvent(QMouseEvent *event) override;

private:
    void refreshPixmap();
    QPixmap tinted(const QColor &color) const;

    QPixmap m_source;
    QColor m_normal;
    QColor m_hover;
    bool m_hovered = false;
};

#endif // UI_RESTORE_LABEL_H
