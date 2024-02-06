export function lightenColor(hex, percent) {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  let adjust = percent / 100;
  r = Math.round(r + (255 - r) * adjust);
  g = Math.round(g + (255 - g) * adjust);
  b = Math.round(b + (255 - b) * adjust);
  return `#${(r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, "0")}`;
}
