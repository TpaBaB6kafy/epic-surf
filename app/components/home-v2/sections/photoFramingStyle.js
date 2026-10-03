// Keep the crop anchor and zoom origin together. With cover-size C, frame F,
// scale S and position P, the visible image offset becomes (F - C*S) * P.
export function photoFramingStyle(framing, fallback = { x: 50, y: 50, scale: 1 }) {
  const { x, y, scale } = framing || fallback;
  const position = `${x}% ${y}%`;
  return { objectFit: 'cover', objectPosition: position, transformOrigin: position, transform: `scale(${scale})` };
}
