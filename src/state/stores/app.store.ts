import { defineStore } from 'pinia';
import type { TAppStore } from '@/utils/types/store/appStore.type';



export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    fullscreen: false
  }),

  actions: {

    /**
     * @description
     * Toggles the fullscreen mode
     */
    toggleFullscreen(): void {
      this.fullscreen = !this.fullscreen;
    }
  }
});