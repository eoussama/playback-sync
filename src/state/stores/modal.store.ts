import { defineStore } from 'pinia'
import type { TModal } from '@/utils/types/composition/modal.type';
import type { TModalsStore } from '@/utils/types/store/modalsStore.type';



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
    addModal(modal: TModal): void {
      this.modals.push(modal);
    },

    /**
     * @description
     * Removes a modal
     *
     * @param id The ID of the modal to remove
     */
    removeModal(id: string): void {
      const index = this.modals.findIndex(e => e.id === id);

      if (index >= 0) {
        this.modals.splice(index, 1);
      }
    }
  }
});