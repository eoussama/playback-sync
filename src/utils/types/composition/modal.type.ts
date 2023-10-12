import type { TComponent } from './component.type';



/**
 * @description
 * A source to stream
 */
export type TModal<T extends TComponent> = {

  /**
   * @description
   * The ID of the modal
   */
  id: string;

  /**
   * @description
   * The title of the modal
   */
  title: string;

  /**
   * @description
   * The content displayed in the body
   */
  component: InstanceType<T>;
}