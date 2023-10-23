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
        const offset = 10;
        const tooltipText = tooltip.childNodes[0] as HTMLDivElement;
        const tooltipElement = tooltip.childNodes[1] as HTMLDivElement;

        const elementRect = tooltipElement.getClientRects().item(0);
        const elementX = elementRect?.left ?? 0;
        const elementY = elementRect?.top ?? 0;
        const elementWidth = elementRect?.width ?? 0;
        const elementHeight = elementRect?.height ?? 0;

        const textRect = tooltipText.getClientRects().item(0);
        const textWidth = textRect?.width ?? 0;
        const textHeight = textRect?.height ?? 0;

        const textXOffset = elementX + (elementWidth / 2) - (textWidth / 2);
        const textX = Math.max(textXOffset, 0);

        let textY = elementY - textHeight - offset;

        if (textY < 0) {
          textY = elementY + elementHeight + offset;
        }

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

    font-size: 13px;
    color: var(--color-secondary);
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-regular);

    border-radius: 5px;
    backdrop-filter: blur(5px);
    background-color: rgba(var(--color-primary-rgb), 0.6);

    animation-name: fadeIn;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
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