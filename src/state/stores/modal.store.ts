import type { TComponent } from "@/utils/types/composition/component.type";
import type { TModal } from "@/utils/types/composition/modal.type";
import type { TModalsStore } from "@/utils/types/store/modalsStore.type";
import { defineStore } from "pinia";



export const useModalStore = defineStore("modals", {
  state: (): TModalsStore => ({
    modals: [],
  }),

  actions: {

    /**
     * @description
     * The ID of the modal to add
     *
     * @param modal The modal to add
     */
    addModal(modal: TModal<TComponent>): void {
      this.modals.push(modal);
    },

    /**
     * @description
     * Removes a modal
     *
     * @param id The ID of the modal to remove
     * @param _data Optional payload emitted when the modal is removed, used by the effect exclusively
     */
    removeModal<T = unknown>(id: string, _data?: T): void {
      const index = this.modals.findIndex(e => e.id === id);

      if (index >= 0) {
        this.modals.splice(index, 1);
      }
    },

    /**
     * @description
     * Closes the overlaying modal
     */
    closeModal(): void {
      const modal = this.modals.slice(0).reverse()[0];

      if (modal) {
        this.removeModal(modal.id, { id: modal.id });
      }
    },
  },
});
