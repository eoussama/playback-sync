import type { TSource } from '../composition/source.type'



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
   * If the sources are playing
   */
  playing: boolean;

  /**
   * @description
   * The list of sources
   */
  sources: Array<TSource>;
}