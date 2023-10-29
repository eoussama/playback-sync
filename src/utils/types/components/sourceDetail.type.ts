import type { TNullable } from '../generic/nullable.type';
import type { TSource } from '../composition/source.type';



/**
 * @description
 * The local data of the SourceDetail component
 */
export type TSourceDetailType = {

  /**
   * @description
   * The source to display
   */
  source: TNullable<TSource>

  /**
   * @description
   * If the main form has been submitted
   */
  submitted: boolean;

  /**
   * @description
   * If the preview is loaded
   */
  previewLoaded: boolean
};