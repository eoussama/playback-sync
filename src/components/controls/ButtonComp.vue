<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { TButtonType } from '@/utils/types/composition/buttonType.type';

export default defineComponent({

  props: {
    icon: String,
    label: String,
    type: String as PropType<TButtonType>
  },

  computed: {

    /**
     * @description
     * The class type of the button
     */
    typeClass(): string {
      const type = this.type ?? 'plain';
      return `button--${type}`;
    }
  }
});
</script>

<template>
  <button
    class="button"
    :class="[typeClass]"
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
  transition-property: background-color;

  @extend %selectable;

  &__label {
    color: var(--color-primary);
    font-family: var(--font-primary);
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

  &--radial,
  &--primary {
    background-color: hsl(var(--color-secondary-hsl), 85%);
  }

  &:hover {

    &#{$root}--plain,
    &#{$root}--outline {
      background-color: hsl(var(--color-secondary-hsl), 83%);
    }

    &#{$root}--radial,
    &#{$root}--primary {
      background-color: hsl(var(--color-secondary-hsl), 80%);
    }
  }
}
</style>