import { defineStore } from 'pinia';
import type { TModal } from '@/utils/types/composition/modal.type';
import type { TModalsStore } from '@/utils/types/store/modalsStore.type';
import type { TComponent } from '@/utils/types/composition/component.type';



export const useModalStore = defineStore('modals', {
  state: (): TModalsStore => ({
    modals: []
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
     * @param data Optional payload emited when the modal is removed,
     * This param is used by the effect exclusively.
     */
    removeModal<T = any>(id: string, data?: T): void { // eslint-disable-line
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
    }
  }
});