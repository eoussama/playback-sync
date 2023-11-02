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
   * @param max The minimum value
   * @param min The maximum valie
   */
  static clamp(value: number, max: number, min: number): number {
    return Math.min(Math.max(value, min), max);
  }
}