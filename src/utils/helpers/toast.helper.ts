import type { TComponent } from "../types/composition/component.type";

import type { TToast } from "../types/composition/toast.type";
import ToastComp from "@/components/info/ToastComp.vue";

import { useModalStore } from "@/state/stores/modal.store";
import { ModalAlignment } from "../enums/modalAlignment.enum";
import { ModalHelper } from "./modal.helper";



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
   * @returns A promise that resolves with the toast result
   */
  static show(props: Partial<TToast>): Promise<boolean> {
    return new Promise((resolve) => {
      const store = useModalStore();
      const toasts = store.modals.filter(e => this.isToast(e.component));
      const message = props.message ?? "";
      const params = {
        dialog: false,
        overlay: false,
        dismissive: false,
        alignment: ModalAlignment.Top,
        interrupting: false,
      };

      for (const toast of toasts) {
        ModalHelper.close(toast.id);
      }

      ModalHelper
        .open("", params, ToastComp, { message })
        .then(modal => resolve(modal.payload as boolean));
    });
  }

  /**
   * @description
   * Checks if component is a toast
   *
   * @param component The component to check
   * @returns Whether the component is a toast
   */
  private static isToast(component: TComponent): boolean {
    const path: string = (component as unknown as { __file: string }).__file;
    const file = path.split("/").reverse()[0];
    const name = file.split(".")[0];

    return name === "ToastComp";
  }
}
