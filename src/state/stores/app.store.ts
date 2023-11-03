import { defineStore } from 'pinia';
import type { TAppStore } from '@/utils/types/store/appStore.type';



export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    seek: 10,
    fullscreen: false,
    hover: {
      head: false,
      foot: false,
      controls: false
    }
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
    },

    /**
     * @description
     * Updates the hover state of the head
     *
     * @param hover The hover state to update to
     */
    updateHeadHover(hover: boolean): void {
      this.hover.head = hover;
    },

    /**
     * @description
     * Updates the hover state of the foot
     *
     * @param hover The hover state to update to
     */
    updateFootHover(hover: boolean): void {
      this.hover.foot = hover;
    },

    /**
     * @description
     * Updates the hover state of the controls
     *
     * @param hover The hover state to update to
     */
    updateControlsHover(hover: boolean): void {
      this.hover.controls = hover;
    }
  }
});