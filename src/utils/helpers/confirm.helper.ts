import { ModalHelper } from './modal.helper';
import Confirm from '@/components/Confirm.vue';
import type { TConfirm } from '../types/composition/confirm.type';



/**
 * @description
 * helps with confirmation modals
 */
export class ConfirmHelper {

  /**
   * @description
   * Opens a confirmation dialog
   *
   * @param props The properties of the confirmation dialog
   */
  static open(props: Partial<TConfirm>): Promise<boolean> {
    return new Promise(resolve => {
      const icon = props.icon ?? '';
      const title = props.title ?? '';
      const message = props.message ?? '';
      const rejectLabel = props.rejectLabel ?? 'Cancel';
      const resolveLabel = props.resolveLabel ?? 'Confirm';

      ModalHelper
        .open(title, Confirm, { message, icon, rejectLabel, resolveLabel })
        .then(modal => resolve(modal.payload));
    });
  }
}