import type { TUnsafe } from '../types/generic/unsafe.type';



/**
 * @description
 * Helps with time
 */
export class TimeHelper {

  /**
   * @description
   * Formats seconds to time
   *
   * @param seconds The number of seconds to format
   */
  static secondsToTime(seconds: TUnsafe<number>): string {
    const value = Math.max(seconds ?? 0, 0);
    const safeValue = isNaN(value) ? 0 : value;

    const secs = Math.floor(safeValue % 60);
    const mins = Math.floor(safeValue / 60);

    const secsStr = secs.toString().padStart(2, '0');
    const minsStr = mins.toString().padStart(2, '0');

    return `${minsStr}:${secsStr}`;
  }
}