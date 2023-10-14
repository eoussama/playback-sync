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
    <Select
      :value="value"
      :options="playbackRates"
      @change="onPlaybackRateChanged"
    />
  </div>
</template>

<style scoped lang="scss"></style>