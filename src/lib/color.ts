/**
 * Converts a #hex color to an rgba() string with the given alpha (0-1).
 * Used to compose the shadow CSS var from the color picker + opacity slider.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "").trim();
  if (![3, 6].includes(clean.length) || !/^[0-9a-fA-F]+$/.test(clean)) {
    // Guard against invalid/partial hex while user is typing.
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}