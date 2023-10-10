import type { TSource } from '../composition/source.type'



/**
 * @description
 * The sources store structure
 */
export type TSourcesStore = {

  /**
   * @description
   * The list of sources
   */
  sources: Array<TSource>;
}