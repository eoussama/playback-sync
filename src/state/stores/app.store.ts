import { defineStore } from 'pinia';

import { Theme } from '@/utils/enums/theme.enum';
import type { TAppStore } from '@/utils/types/store/appStore.type';



export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    seekStep: 10,
    volumeStep: 0.1,
    fullscreen: false,
    theme: Theme.Light,
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
    },

    /**
     * @description
     * Updates app's theme
     *
     * @param theme The theme to update to
     */
    updateTheme(theme: Theme): void {
      this.theme = theme;
    },

    /**
     * @description
     * Toggles the app's theme
     */
    toggleTheme(): void {
      const theme = this.theme === Theme.Light
        ? Theme.Dark
        : Theme.Light;

      this.updateTheme(theme);
    },

    /**
     * @description
     * Form validation notification
     */
    onValidate(): void { }
  }
});