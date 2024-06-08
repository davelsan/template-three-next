/**
 * Convert a hex color string to an RGBA string.
 * @param hexCode the hex color code to convert
 * @param alpha optional opacity value to apply to the rgba string
 */
export function hexToRgba(hexCode: string, alpha = 1) {
  const [r, g, b, a] = calcRgba(hexCode, alpha);

  return `rgba(${r},${g},${b},${a})`;
}

/**
 * Calculate the RGB values for a given hex color code. By default, the returned
 * values are in the interval [0, 255].
 * @param hexCode hex color code to convert
 * @param alpha optional opacity value
 * @param float return values as floats in the interval [0, 1]
 */
export function calcRgba(hexCode: string, alpha: number, float?: boolean) {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  let a = alpha;
  if (alpha > 1 && alpha <= 100) {
    a = alpha / 100;
  }

  let rgb = [r, g, b];
  if (float) {
    rgb = rgb.map((v) => v / 255);
  }

  return [...rgb, a];
}
