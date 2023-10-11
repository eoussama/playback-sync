<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['updated'],

  props: {
    value: Number
  },

  methods: {

    /**
     * @description
     * Emits the changed volume value
     *
     * @param e The input event
     */
    onVolume(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value ?? 0);

      this.$emit('updated', value);
    },
  },

  computed: {

    /**
     * @description
     * Returns a human readable volume value
     */
    volume(): number {
      const volume = this.value ?? 0;
      return volume * 100;
    },
  }
});
</script>

<template>
  <input
    min="0"
    max="1"
    step="0.1"
    type="range"
    :value="value"
    @input="onVolume"
  > {{ volume }}%
</template>

<style scoped lang="scss"></style>