<script lang="ts">
import { defineComponent } from 'vue';
import { TimeHelper } from '@/utils/helpers/time.helper';


export default defineComponent({
  emits: ['timelineUpdated'],

  props: {
    value: Number,
    duration: Number
  },

  methods: {

    /**
     * @description
     * Emits timeline change
     *
     * @param e The change event
     */
    onChanged(e: Event) {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value) ?? 0;

      this.$emit('timelineUpdated', value);
    }
  },

  computed: {

    /**
     * @description
     * Returns readable duration value
     */
    displayDuration() {
      return TimeHelper.secondsToTime(this.duration);
    },

    /**
     * @description
     * Returns readable time value
     */
    displayTime() {
      return TimeHelper.secondsToTime(this.value);
    }
  }
});
</script>

<template>
  <div class="timeline">
    <div class="timeline__label">
      {{ displayTime }}
    </div>

    <div class="timeline__track">
      <input
        min="0"
        type="range"
        :value="value"
        :max="duration"
        @input="onChanged"
      >
    </div>

    <div class="timeline__label">
      {{ displayDuration }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/mixins/selectable';

.timeline {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  &__label {
    color: var(--text-color);

    font-size: 14px;
    font-weight: var(--font-weight-light);
  }

  &__track {
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1;
    margin: 0 10px;

    input {
      width: 100%;
      border-radius: 4px;
      accent-color: var(--color-primary);

      @extend %focusable;

      &::-webkit-slider-runnable-track {
        cursor: pointer;

        width: 100%;
        height: 4px;

        border-radius: 10px;
      }

      &::-webkit-slider-thumb {
        transform: scale(0.8);

        margin-top: -6px;
        border-radius: 5px;
      }
    }
  }
}
</style>