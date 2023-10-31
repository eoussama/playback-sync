import { ModalHelper } from './modal.helper';
import ToastComp from '@/components/info/ToastComp.vue';
import type { TToast } from '../types/composition/toast.type';
import { ModalAlignment } from '../enums/modalAlignment.enum';



/**
 * @description
 * Helps with toast modals
 */
export class ToastHelper {

  /**
   * @description
   * Shows a toast
   *
   * @param props The properties of the toast
   */
  static show(props: Partial<TToast>): Promise<boolean> {
    return new Promise(resolve => {
      const message = props.message ?? '';
      const params = { dialog: false, overlay: false, alignment: ModalAlignment.Top };

      ModalHelper
        .open('', params, ToastComp, { message })
        .then(modal => resolve(modal.payload));
    });
  }
}