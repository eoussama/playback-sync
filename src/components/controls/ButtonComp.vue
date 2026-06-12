<script lang="ts">
import type { PropType } from "vue";
import type { Theme } from "@/utils/enums/theme.enum";

import type { TButtonType } from "@/utils/types/composition/buttonType.type";
import { mapState } from "pinia";
import { defineComponent } from "vue";

import { useAppStore } from "@/state/stores/app.store";

import { ThemeHelper } from "@/utils/helpers/theme.helper";



export default defineComponent({

  props: {
    id: String,
    icon: String,
    label: String,
    autofocus: Boolean,
    type: String as PropType<TButtonType>,
  },

  computed: {
    ...mapState(useAppStore, ["theme"]),

    /**
     * @description
     * The type class of the button
     *
     * @returns The type CSS class string
     */
    typeClass(): string {
      const type = this.type ?? "plain";

      return `button--${type}`;
    },

    /**
     * @description
     * Checks if dark theme is on
     *
     * @returns Whether the dark theme is active
     */
    isDark(): boolean {
      return ThemeHelper.isDark(this.theme as Theme);
    },

    /**
     * @description
     * The theme class of the button
     *
     * @returns The theme CSS class string
     */
    themeClass(): string {
      return this.isDark ? "button--dark" : "button--light";
    },
  },
});
</script>

<template>
  <button
    :id="id"
    class="button"
    :autofocus="autofocus"
    :class="[typeClass, themeClass]"
  >
    <div
      v-if="icon"
      class="button__icon"
    >
      <font-awesome-icon :icon="icon" />
    </div>

    <div
      v-if="label"
      class="button__label"
    >
      {{ label }}
    </div>
  </button>
</template>

<style scoped lang="scss">
@use '@/style/mixins/selectable';

.button {
  $root: &;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  min-width: 35px;
  min-height: 35px;

  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid transparent;
  background-color: transparent;

  transition-duration: 0.2s;
  transition-property: background-color outline;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  @extend %focusable;
  @extend %selectable;

  &__label {
    color: var(--color-primary);
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-regular);
  }

  &__icon {
    display: flex;
    align-content: center;
    justify-content: center;

    color: var(--color-primary);

    &:not(:last-child) {
      margin-right: 6px;
    }
  }

  &--radial {
    padding: 16px;
    border-radius: 50%;

    width: 52px;
    height: 52px;

    .button__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 18px;
    }
  }

  &--outline {
    border-color: rgba(var(--color-primary-rgb), 0.2);
  }

  &--secondary {
    #{$root}__icon {
      color: hsl(var(--color-primary-hsl), 65%);
    }
  }

  &--radial,
  &--primary {
    background-color: hsl(var(--color-secondary-hsl), 85%);

    &#{$root}--dark {
      background-color: hsl(var(--color-secondary-hsl), 40%);
    }
  }

  &--outline,
  &--plain {
    &#{$root}--dark {
      #{$root}__label {
        color: hsl(var(--color-secondary-hsl), 60%);
      }
    }
  }

  &:hover {

    &#{$root}--plain,
    &#{$root}--outline {
      background-color: hsl(var(--color-secondary-hsl), 83%);
    }

    &#{$root}--plain {
      &#{$root}--dark {
        background-color: hsl(var(--color-secondary-hsl), 55%);
      }
    }

    &#{$root}--outline {
      &#{$root}--dark {
        background-color: hsl(var(--color-secondary-hsl), 30%);
      }
    }

    &#{$root}--secondary {
      background-color: hsl(var(--color-primary-hsl), 87%);
    }

    &#{$root}--radial,
    &#{$root}--primary {
      background-color: hsl(var(--color-secondary-hsl), 80%);

      &#{$root}--dark {
        background-color: hsl(var(--color-secondary-hsl), 35%);
      }
    }
  }
}
</style>
