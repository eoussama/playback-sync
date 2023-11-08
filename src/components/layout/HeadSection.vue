<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useAppStore } from '@/state/stores/app.store';
import { useSourcesStore } from '@/state/stores/sources.store';

import SourceDetail from '@/components/source/SourceDetail.vue';
import ShortcutsComp from '@/components/info/ShortcutsComp.vue';

import { Theme } from '@/utils/enums/theme.enum';
import { PageType } from '@/utils/enums/pageType.enum';

import { ModalHelper } from '@/utils/helpers/modal.helper';

export default defineComponent({

  computed: {
    ...mapState(useAppStore, ['fullscreen', 'hover', 'theme']),

    /**
     * @description
     * The contextual fullscreen icon
     */
    fullscreenIcon(): string {
      return this.fullscreen ? 'compress' : 'expand';
    },

    /**
     * @description
     * Returns the approprite theme icon
     */
    themeIcon(): string {
      return this.theme === Theme.Light ? 'moon' : 'sun';
    },

    /**
     * @description
     * >Returns the appropriate tooltip text for the app's theme
     */
    themeTooltip(): string {
      return this.theme === Theme.Light ? 'Turn Dark Mode On' : 'Turn Light Mode On';
    }
  },

  methods: {
    ...mapActions(useAppStore, [
      'toggleTheme',
      'updateHeadHover',
      'toggleFullscreen',
    ]),
    ...mapActions(useSourcesStore, ['addSource', 'resetSources']),

    /**
     * @description
     * Opens source addition modal
     */
    onAdd(): void {
      ModalHelper
        .open('Add Source', null, SourceDetail, { type: PageType.Creation })
        .then(modal => {
          if (modal.payload) {
            this.addSource(modal.payload);
          }
        });
    },

    /**
     * @descripion
     * Toggles fullscreen mode
     */
    onFullscreen(): void {
      this.toggleFullscreen();
    },

    /**
     * @descripion
     * Opens the shortcuts modal
     */
    onShortcuts(): void {
      ModalHelper.open('Shortcuts', null, ShortcutsComp);
    },

    /**
     * @descripion
     * Toggles the app's theme
     */
    onTheme(): void {
      this.toggleTheme();
    },

    /**
     * @description
     * Handles mouse enter
     */
    onMouseEnter(): void {
      this.updateHeadHover(true);
    },

    /**
     * @description
     * Handles mouse leave
     */
    onMouseLeave(): void {
      this.updateHeadHover(false);
    }
  },

  created() {
    this.resetSources();
  }
});
</script>

<template>
  <div
    class="head"
    :class="{
      'head--show': hover.head,
      'head--fullscreen': fullscreen
    }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="head__left">
      <TooltipComp text="Add a new source">
        <ButtonComp
          icon="plus"
          type="primary"
          id="button-add-modal"
          @click="onAdd"
        />
      </TooltipComp>

      <div class="tilling">
        <TillingComp />
      </div>
    </div>

    <div class="head__right">
      <TooltipComp text="Shortcuts">
        <ButtonComp
          type="primary"
          icon="question"
          id="button-shortcuts"
          @click="onShortcuts"
        />
      </TooltipComp>

      <TooltipComp :text="themeTooltip">
        <ButtonComp
          type="primary"
          :icon="themeIcon"
          id="button-theme"
          @click="onTheme"
        />
      </TooltipComp>

      <TooltipComp text="Toggle fullscreen">
        <ButtonComp
          type="primary"
          :icon="fullscreenIcon"
          @click="onFullscreen"
        />
      </TooltipComp>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/mixins/triggerable';

.head {
  $root: &;
  z-index: 1;

  display: flex;
  align-items: center;
  flex-direction: row;

  padding: 10px;
  max-height: 50px;

  box-sizing: border-box;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: hsl(var(--color-secondary-hsl), 90%);

  &__left,
  &__right {
    display: flex;
    align-items: center;
    flex-direction: row;

    &>*:not(:last-child) {
      margin-right: 10px;
    }

    .tilling {
      width: auto;
    }
  }

  &__right {
    margin-left: auto;
  }

  &--fullscreen {
    transform: translateY(-100%);

    transition-duration: 0.2s;
    transition-property: transform;

    @extend %triggerable;

    &::before {
      top: 10px;
    }

    &#{$root}--show {
      transform: translateY(0);
    }
  }
}
</style>
