import type { TComponent } from './component.type';



/**
 * @description
 * A source to stream
 */
export type TModal<T extends TComponent, U = any> = {

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
   * If the modal should overlay the page
   */
  overlay: boolean;

  /**
   * @description
   * The props to pass to the component
   */
  props: U;

  /**
   * @description
   * The content displayed in the body
   */
  component: InstanceType<T>;
}