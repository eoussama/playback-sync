<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
  }),

  props: {
    value: Number
  },

  methods: {

    /**
     * @description
     * Emits the speed change
     */
    onPlaybackRateChanged(e: Event) {
      const target = e.target as HTMLSelectElement;
      const value = parseFloat(target.value ?? 0);

      this.$emit('speedChanged', value);
    }
  }
});
</script>

<template>
  <div class="speed">
    <select
      class="speed_input"
      :value="value"
      @change="onPlaybackRateChanged"
    >
      <option
        v-for="speed in playbackRates"
        :value="speed"
      >
        x{{ speed }}
      </option>
    </select>
  </div>
  <!-- <input
    min="0.25"
    max="2"
    step="0.25"
    type="range"
    :value="speed"
    @input="onSpeed"
  > x{{ speed }} -->
</template>

<style scoped lang="scss"></style>