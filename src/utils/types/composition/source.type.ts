import type { TMetadata } from './metadata.type';



/**
 * @description
 * A source to stream
 */
export type TSource = {

  /**
   * @description
   * The ID of the source
   */
  id: string;

  /**
   * @description
   * The source file link
   */
  url: string;

  /**
   * @description
   * Source title
   */
  title: string;

  /**
   * @description
   * Source metadata
   */
  metadata: TMetadata;
}