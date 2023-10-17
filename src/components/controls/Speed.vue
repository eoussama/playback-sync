<script lang="ts">
import { defineComponent } from 'vue';
import type { TOption } from '@/utils/types/composition/option.type';

export default defineComponent({
  data: () => ({
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
  }),

  props: {
    value: Number
  },

  computed: {

    /**
     * @description
     * Playback rate options
     */
    playbackRateOptions(): Array<TOption> {
      return this.playbackRates.map(e => ({ value: e, label: e.toString() }));
    }
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
      :options="playbackRateOptions"
      @change="onPlaybackRateChanged"
    />
  </div>
</template>

<style scoped lang="scss"></style>