import type { TSource } from '../composition/source.type';



/**
 * @description
 * The sources store structure
 */
export type TSourcesStore = {

  /**
   * @description
   * The speed of the sources
   */
  speed: number;

  /**
   * @description
   * The volume of the sources
   */
  volume: number;

  /**
   * @description
   * If the sources are muted
   */
  muted: boolean;

  /**
   * @description
   * If the sources are playing
   */
  playing: boolean;

  /**
   * @description
   * If the sources are puased to load buffer
   */
  bufferPause: boolean;

  /**
   * @description
   * The list of sources
   */
  sources: Array<TSource>;
}