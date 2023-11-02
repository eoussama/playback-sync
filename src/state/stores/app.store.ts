import { defineStore } from 'pinia';
import type { TAppStore } from '@/utils/types/store/appStore.type';



export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    fullscreen: false
  }),

  actions: {

    /**
     * @description
     * Updates the fullscreen state
     *
     * @param fullscreen The fullscreen state to update
     */
    updateFullscreen(fullscreen: boolean): void {
      this.fullscreen = fullscreen;
    },

    /**
     * @description
     * Toggles the fullscreen mode
     */
    toggleFullscreen(): void {
      this.updateFullscreen(!this.fullscreen);
    }
  }
});