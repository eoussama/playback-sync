/**
 * @description
 * Source metadata
 */
export type TMetadata = {

  /**
   * @description
   * The start time
   */
  start: number;

  /**
   * @description
   * The end time
   */
  end: number;

  /**
   * @description
   * The duration of the source in seconds
   */
  duration: number;

  /**
   * @description
   * The time where the source is at now
  */
  currentTime: number;

  /**
   * @description
   * If the source is muted
   */
  muted: boolean;

  /**
   * @description
   * If the source is playing
   */
  playing: boolean;
}