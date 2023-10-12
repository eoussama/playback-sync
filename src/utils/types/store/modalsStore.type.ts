import type { TModal } from '../composition/modal.type';



/**
 * @description
 * The modals store structure
 */
export type TModalsStore = {

  /**
   * @description
   * The list of modals
   */
  modals: Array<TModal>;
}