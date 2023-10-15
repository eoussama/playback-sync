<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  data: () => ({
    end: 0,
    step: 1,
    start: 0
  }),

  props: {
    end: Number,
    step: Number,
    start: Number,
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    }
  },

  computed: {

    /**
     * @description
     * The start value
     */
    startValue(): number {
      return this.start ?? this.min;
    },

    /**
     * @description
     * The end value
     */
    endValue(): number {
      return this.end ?? this.max;
    }
  },

  methods: {

    /**
     * @description
     * handles updates when the start value changes
     *
     * @param e The event object
     */
    onStartChanged(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value ?? 0)

      this.start = Math.min(value, this.end - this.step);
      target.value = this.start.toString();
    },

    /**
     * @description
     * handles updates when the start value changes
     *
     * @param e The event object
     */
    onEndChanged(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value ?? 0)

      this.end = Math.max(value, this.start + this.step);
      target.value = this.end.toString();
    }
  },

  mounted(): void {
    this.end = this.max ?? 100;
    this.start = this.min ?? 0;
  }
});
</script>

<template>
  {{ start }} - {{ end }}
  <div class="range">
    <input
      :min="min"
      :max="max"
      :step="step"
      type="range"
      :value="start"
      class="range__start"
      @input="onStartChanged"
    >

    <div class="range__track"></div>

    <!-- :min="start" -->
    <input
      :min="min"
      :max="max"
      :step="step"
      type="range"
      :value="end"
      class="range__end"
      @input="onEndChanged"
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
    width: 100%;
    height: 5px;
    border-radius: 5px;

    background-color: rgb(194, 194, 194);
  }

  &__end,
  &__start {
    cursor: grab;

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
}
</style>