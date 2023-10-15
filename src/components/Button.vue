<script lang="ts">
import { defineComponent } from 'vue';
import type { TButtonType } from '@/utils/types/composition/buttonType.type';

export default defineComponent({

  props: {
    icon: String,
    label: String,
    type: Object as () => TButtonType
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
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__label {}

  &__icon {}
}
</style>