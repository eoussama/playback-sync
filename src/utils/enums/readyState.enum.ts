/**
 * @description
 * The loading states of sources
 */
export enum ReadyState {

  /**
   * @description
   * No information is available about the media resource.
   */
  HaveNothing,

  /**
   * @description
   * Enough of the media resource has been retrieved thatthe metadata
   * attributes are initialized. Seeking will no longer raise an exception.
   */
  HaveMetadata,

  /**
   * @description
   * Data is available for the current playback position,
   * but not enough to actually play more than one frame.
   */
  HaveCurrentData,

  /**
   * @description
   * Data for the current playback position as well as for at least
   * a little bit of time into the future is available
   * (in other words, at least two frames of video, for example).
   */
  HaveFutureData,

  /**
   * @description
   * Enough data is available, and the download rate is high enough
   * that the media can be played through to the end without interruption.
   */
  HaveEnoughData
}