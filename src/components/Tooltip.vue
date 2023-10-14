<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  data: () => ({
    hovered: false
  }),

  props: {
    text: String
  },

  methods: {

    /**
     * @description
     * Handles mouse entrance
     */
    onMouseEnter(): void {
      this.hovered = true;
    },

    /**
     * @description
     * Handles mouse exit
     */
    onMouseLeave(): void {
      this.hovered = false;
    }
  }
});
</script>

<template>
  <div
    class="tooltip"
    :class="{ 'tooltip--hovered': hovered }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="tooltip__text">
      {{ text }}
    </div>

    <div class="tooltip__element">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tooltip {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;

  &__text {
    position: absolute;
    top: -25px;
    left: 0;

    display: none;
    width: 100%;
  }

  &--hovered {
    .tooltip__text {
      display: block;
    }
  }
}
</style>