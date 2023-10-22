<script lang="ts">
import { v4 } from 'uuid';
import { defineComponent } from 'vue';

export default defineComponent({

  data: () => ({
    id: '',
    hovered: false
  }),

  props: {
    text: String
  },

  methods: {

    /**
     * @description
     * Positions the tooptip relative to the element
     */
    positionTooltip(): void {
      const tooltip = document.getElementById(this.id);

      if (tooltip) {
        const tooltipText = tooltip.childNodes[0] as HTMLDivElement;
        const tooltipElement = tooltip.childNodes[1] as HTMLDivElement;

        const elementRect = tooltipElement.getClientRects().item(0);
        const elementX = elementRect?.left ?? 0;
        const elementY = elementRect?.top ?? 0;
        const elementWidth = elementRect?.width ?? 0;

        const textRect = tooltipText.getClientRects().item(0);
        const textWidth = textRect?.width ?? 0;
        const textHeight = textRect?.height ?? 0;

        const textXOffset = elementX + (elementWidth / 2) - (textWidth / 2);
        const textX = Math.max(textXOffset, 0);
        const textY = elementY - textHeight;

        tooltipText.style.left = `${textX}px`;
        tooltipText.style.top = `${textY}px`;
      }
    },

    /**
     * @description
     * Handles mouse entrance
     */
    onMouseEnter(): void {
      this.hovered = true;
      setTimeout(this.positionTooltip);
    },

    /**
     * @description
     * Handles mouse exit
     */
    onMouseLeave(): void {
      this.hovered = false;
    }
  },

  mounted(): void {
    this.id = `tooltip-${v4()}`;
  }
});
</script>

<template>
  <div
    :id="id"
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
    display: none;
    pointer-events: none;
    box-sizing: border-box;

    position: fixed;
    padding: 4px 8px;
    width: max-content;

    font-size: 14px;
    color: var(--color-secondary);

    border-radius: 5px;
    background-color: rgba(var(--color-primary-rgb), 0.4);
  }

  &__element {
    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
  }

  &--hovered {
    .tooltip__text {
      display: block;
    }
  }
}
</style>