/**
 * @description
 * Helps with math
 */
export class MathHelper {
  /**
   * @description
   * Clamps a value between two values
   *
   * @param value The value to clamp
   * @param min The minimum value
   * @param max The maximum value
   * @returns The clamped value
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * @description
   * Sanitizes value
   *
   * @param value The value to sanitize
   * @returns The sanitized value
   */
  static sanitize(value: number): number {
    return (Number.isNaN(value) ? 0 : value) ?? 0;
  }
}
