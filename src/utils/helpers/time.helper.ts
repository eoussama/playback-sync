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
    const value = seconds ?? 0;

    const secs = Math.floor(value % 60);
    const mins = Math.floor(value / 60);

    const secsStr = secs.toString().padStart(2, '0');
    const minsStr = mins.toString().padStart(2, '0');

    return `${minsStr}:${secsStr}`;
  }
}