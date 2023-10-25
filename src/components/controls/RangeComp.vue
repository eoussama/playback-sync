<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['startChanged', 'endChanged'],

  data: () => ({
    endValue: 0,
    startValue: 0
  }),

  props: {
    disabled: Boolean,
    valueFormater: {
      type: Function,
      default: (value: number) => value.toString()
    },
    end: {
      default: 0,
      type: Number
    },
    start: {
      default: 0,
      type: Number
    },
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
      setTimeout(this.resizeThumb);
    },

    endValue(): void {
      setTimeout(this.resizeThumb);
    },

    start(): void {
      this.startValue = this.start;
    },

    end(): void {
      this.endValue = this.end;
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
      target.value = this.startValue.toString();
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
      target.value = this.endValue.toString();
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
    this.endValue = this.end;
    this.startValue = this.start;
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
    <div class="range__label range__label--start">
      {{ valueFormater(min) }}
    </div>

    <div class="range__wrapper">
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
        <div class="range__thumb">
          <div class="range__value range__value--start">{{ valueFormater(startValue) }}</div>
          <div class="range__value range__value--end">{{ valueFormater(endValue) }}</div>
        </div>
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

    <div class="range__label range__label--end">
      {{ valueFormater(max) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/mixins/selectable';

.range {
  $root: &;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 16px;
  position: relative;

  &__label {
    font-size: 14px;
    color: var(--color-primary);

    &--start {
      margin-right: 10px;
    }

    &--end {
      margin-left: 10px;
    }
  }

  &__wrapper {
    position: relative;

    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    #{$root}__track {
      position: relative;

      width: 100%;
      height: 5px;
      border-radius: 5px;

      background-color: var(--color-secondary);

      #{$root}__thumb {
        pointer-events: none;

        width: 100%;
        height: 100%;

        position: absolute;
        left: 0;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: space-between;

        background-color: var(--color-primary);

        #{$root}__value {
          position: absolute;
          top: -5px;

          z-index: 2;
          padding: 0 6px;

          font-size: 10px;
          color: var(--color-secondary);
          font-weight: var(--font-weight-light);

          border-radius: 10px;
          background-color: var(--color-primary);

          &--start {
            left: -6px;
          }

          &--end {
            right: -6px;
          }
        }
      }
    }

    #{$root}__end,
    #{$root}__start {
      cursor: grab;
      z-index: 1;

      top: 0;
      left: 0;
      position: absolute;

      width: 100%;
      accent-color: var(--color-primary);

      &:active {
        cursor: grabbing;
      }

      &::-webkit-slider-runnable-track {
        cursor: pointer;

        height: 0;
        width: 100%;

        border-radius: 10px;
      }

      &::-webkit-slider-thumb {
        padding: 0 15px;
        opacity: 0;
      }
    }
  }

  &--disabled {
    #{$root}__track {
      background-color: rgb(235, 235, 235);
    }

    #{$root}__thumb {
      background-color: rgb(204, 204, 204);
    }
  }

  &:focus-within {
    #{$root}__track {
      @extend %focus-outline;
    }
  }
}
</style>