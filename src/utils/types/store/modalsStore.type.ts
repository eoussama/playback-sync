import type { TComponent } from "../composition/component.type";
import type { TModal } from "../composition/modal.type";



/**
 * @description
 * The modals store structure
 */
export type TModalsStore = {

  /**
   * @description
   * The list of modals
   */
  modals: Array<TModal<TComponent>>;
};
