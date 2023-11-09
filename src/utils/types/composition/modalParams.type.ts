import type { ModalAlignment } from '@/utils/enums/modalAlignment.enum';



/**
 * @description
 * Modal specific parameters
 */
export type TModalParams = {

  /**
   * @description
   * If other modals will be closed when this one is displayed
   */
  dismissive: boolean

  /**
   * @description
   * If the modal should overlay the page
   */
  overlay: boolean

  /**
   * @description
   * If the modal should be wrapped inside of a dialog box
   */
  dialog: boolean

  /**
   * @description
   * The alignment of the modal
   */
  alignment: ModalAlignment
}