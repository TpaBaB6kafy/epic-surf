export function handleHorizontalWheelScroll(event, scroller) {
  if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

  const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientWidth : 1;
  const deltaX = event.deltaX * scale;
  const deltaY = event.deltaY * scale;
  const delta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : event.shiftKey ? deltaY : 0;

  if (!delta) return;

  const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
  const canScroll =
    (delta < 0 && scroller.scrollLeft > 0) ||
    (delta > 0 && scroller.scrollLeft < maxScrollLeft - 1);

  if (!canScroll) return;

  event.preventDefault();
  scroller.scrollLeft += delta;
}
