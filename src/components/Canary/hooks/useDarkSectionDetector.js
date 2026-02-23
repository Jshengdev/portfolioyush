export function isOverDarkSection(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return true;
  const section = el.closest('section, nav, footer, body');
  if (!section) return true;
  const bg = window.getComputedStyle(section).backgroundColor;
  const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return true;
  return (parseInt(m[1]) + parseInt(m[2]) + parseInt(m[3])) < 160;
}
