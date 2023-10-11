/**
 * @description
 * Source metadata
 */
export type TMetadata = {

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
   * If the source is playing
   */
  playing: boolean;
}