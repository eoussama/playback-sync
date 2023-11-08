<script lang="ts">
import { mapState, mapActions } from 'pinia';
import { defineComponent } from 'vue';

import { Theme } from '@/utils/enums/theme.enum';
import { useAppStore } from '@/state/stores/app.store';

export default defineComponent({

  computed: {
    ...mapState(useAppStore, ['fullscreen', 'hover', 'theme']),

    /**
     * @description
     * Returns the app's version
     */
    version(): string {
      return config.version;
    },

    /**
     * @description
     * Checks if dark theme is on
     */
    isDark(): boolean {
      return this.theme === Theme.Dark;
    }
  },

  methods: {
    ...mapActions(useAppStore, ['updateFootHover']),

    /**
     * @description
     * Handles mouse enter
     */
    onMouseEnter(): void {
      this.updateFootHover(true);
    },

    /**
     * @description
     * Handles mouse leave
     */
    onMouseLeave(): void {
      this.updateFootHover(false);
    }
  }
});
</script>

<template>
  <div
    class="foot"
    :class="{
      'foot--dark': isDark,
      'foot--show': hover.foot,
      'foot--fullscreen': fullscreen
    }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <a
      target="_blank"
      class="foot__content"
      href="https://github.com/EOussama/playback-sync"
    >
      <span class="foot__github">
        <font-awesome-icon icon="fa-brands fa-github" />
      </span>

      <span class="foot__text">
        Playback Sync • {{ version }}
      </span>
    </a>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/mixins/triggerable';

.foot {
  $root: &;

  padding: 2px 10px;

  box-sizing: border-box;
  background-color: hsl(var(--color-secondary-hsl), 94%);

  &__content {
    text-align: center;
    text-decoration: none;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {

      .foot__text,
      .foot__github {
        color: hsl(var(--color-secondary-hsl), 50%);
        color: hsl(var(--color-secondary-hsl), 50%);
      }
    }
  }

  &__text,
  &__github {
    color: hsl(var(--color-secondary-hsl), 65%);

    transition-duration: 0.2s;
    transition-property: color;
  }

  &__github {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    margin-right: 5px;
  }

  &__text {
    font-size: 12px;
    font-family: var(--font-family-primary);
  }

  &--fullscreen {
    position: absolute;
    bottom: 0;
    left: 0;

    z-index: 1;
    width: 100%;

    transform: translateY(100%);

    transition-duration: 0.2s;
    transition-property: transform;

    @extend %triggerable;

    &#{$root}--show {
      transform: translateY(0);
    }
  }

  &--dark {
    background-color: hsl(var(--color-secondary-hsl), 54%);

    #{$root}__text,
    #{$root}__github {
      color: hsl(var(--color-secondary-hsl), 85%);
    }
  }
}
</style>