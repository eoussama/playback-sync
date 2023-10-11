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
      {{ displayTime }} / {{ displayDuration }}
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
  </div>
</template>

<style scoped lang="scss">
.timeline {
  &__track {
    input {
      width: 100%;
    }
  }
}
</style>