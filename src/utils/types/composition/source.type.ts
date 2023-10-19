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
   * If the source if pinned
   */
  pinned: boolean;

  /**
   * @description
   * Source metadata
   */
  metadata: TMetadata;
}