<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['startChanged', 'endChanged'],

  data: () => ({
    endValue: 0,
    startValue: 0
  }),

  props: {
    end: Number,
    start: Number,
    disabled: Boolean,
    step: {
      default: 1,
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    }
  },

  watch: {
    startValue(): void {
      this.resizeThumb();
    },

    endValue(): void {
      this.resizeThumb();
    },

    disabled(): void {
      this.resizeThumb();
    }
  },

  methods: {

    /**
     * @description
     * Resizes the thumb element to fit between the start and end handles
     */
    resizeThumb(): void {
      const elementRef = this.$refs.elementRef as HTMLDivElement;
      const elementTrack = elementRef.querySelector('.range__track') as HTMLDivElement;
      const elementThumb = elementRef.querySelector('.range__thumb') as HTMLDivElement;
      const elementStart = elementRef.querySelector('.range__start') as HTMLInputElement;
      const elementEnd = elementRef.querySelector('.range__end') as HTMLInputElement;

      const trackRect = elementTrack.getClientRects().item(0);
      const trackWidth = trackRect?.width ?? 0;

      const start = parseFloat(elementStart.value ?? 0);
      const end = parseFloat(elementEnd.value ?? 0);

      const thumbStart = trackWidth * (start / this.max);
      const thumbEnd = (trackWidth * (end / this.max)) - thumbStart;

      elementThumb.style.left = `${thumbStart}px`;
      elementThumb.style.width = `${thumbEnd}px`;

      elementStart.value = this.startValue.toString();
      elementEnd.value = this.endValue.toString();
    },

    /**
     * @description
     * Handles start change
     *
     * @param e The event object
     */
    onStartInput(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value ?? 0)

      this.startValue = Math.min(value, this.endValue - this.step);
    },

    /**
     * @description
     * Handles end change
     *
     * @param e The event object
     */
    onEndInput(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value ?? 0)

      this.endValue = Math.max(value, this.startValue + this.step);
    },

    /**
     * @description
     * Emits start value on change
     */
    onStartChanged(): void {
      this.$emit('startChanged', this.startValue);
    },

    /**
     * @description
     * Emits end value on change
     */
    onEndChanged(): void {
      this.$emit('endChanged', this.endValue);
    }
  },

  mounted(): void {
    this.endValue = this.max ?? 100;
    this.startValue = this.min ?? 0;
  },

  setup() {
    const elementRef = ref(null);
    return { elementRef };
  }
});
</script>

<template>
  <div
    class="range"
    ref="elementRef"
    :class="{ 'range--disabled': disabled }"
  >
    <input
      :min="min"
      :max="max"
      :step="step"
      type="range"
      :value="startValue"
      class="range__start"
      :disabled="disabled"
      @input="onStartInput"
      @change="onStartChanged"
    >

    <div class="range__track">
      <div class="range__thumb"></div>
    </div>

    <input
      :min="min"
      :max="max"
      :step="step"
      type="range"
      :value="endValue"
      class="range__end"
      :disabled="disabled"
      @input="onEndInput"
      @change="onEndChanged"
    >
  </div>
</template>

<style scoped lang="scss">
.range {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 16px;
  position: relative;

  &__track {
    position: relative;

    width: 100%;
    height: 5px;
    border-radius: 5px;

    background-color: rgb(194, 194, 194);
  }

  &__thumb {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;

    background-color: gray;
  }

  &__end,
  &__start {
    cursor: grab;
    z-index: 1;

    top: 0;
    left: 0;
    position: absolute;

    width: 100%;

    &:active {
      cursor: grabbing;
    }

    &::-webkit-slider-runnable-track {
      height: 0;
    }
  }

  &--disabled {
    .range__track {
      background-color: rgb(235, 235, 235);
    }

    .range__thumb {
      background-color: rgb(204, 204, 204);
    }
  }
}
</style>