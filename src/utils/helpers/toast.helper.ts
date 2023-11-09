import ToastComp from '@/components/info/ToastComp.vue';

import { ModalHelper } from './modal.helper';
import { useModalStore } from '@/state/stores/modal.store';

import type { TToast } from '../types/composition/toast.type';
import { ModalAlignment } from '../enums/modalAlignment.enum';
import type { TComponent } from '../types/composition/component.type';



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
      const store = useModalStore();
      const toasts = store.modals.filter(e => this.isToast(e.component));
      const message = props.message ?? '';
      const params = {
        dialog: false,
        overlay: false,
        dismissive: false,
        alignment: ModalAlignment.Top
      };

      for (const toast of toasts) {
        ModalHelper.close(toast.id);
      }

      ModalHelper
        .open('', params, ToastComp, { message })
        .then(modal => resolve(modal.payload));
    });
  }

  /**
   * @description
   * Checks if component is a toast
   *
   * @param component The component to check
   */
  private static isToast(component: TComponent): boolean {
    const path: string = (component as any).__file;
    const file = path.split('/').reverse()[0];
    const name = file.split('.')[0];

    return name === 'ToastComp';
  }
}