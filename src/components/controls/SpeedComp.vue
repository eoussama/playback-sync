<script lang="ts">
import type { TOption } from "@/utils/types/composition/option.type";

import { defineComponent } from "vue";
import { speed } from "@/utils/const/speed.const";



export default defineComponent({

  props: {
    value: Number,
  },
  emits: ["speedChanged"],

  computed: {

    /**
     * @description
     * Playback rate options
     *
     * @returns The array of playback rate options
     */
    playbackRateOptions(): Array<TOption> {
      return speed.map(rate => ({ value: rate, label: `x${rate}` }));
    },
  },

  methods: {

    /**
     * @description
     * Emits the speed change
     *
     * @param e The change event
     */
    onPlaybackRateChanged(e: Event) {
      const target = e.target as HTMLSelectElement;
      const value = Number.parseFloat(target.value ?? 0);

      this.$emit("speedChanged", value);
    },
  },
});
</script>

<template>
  <div class="speed">
    <SelectComp
      :model-value="value"
      :options="playbackRateOptions"
      @change="onPlaybackRateChanged"
    />
  </div>
</template>

<style scoped lang="scss"></style>
