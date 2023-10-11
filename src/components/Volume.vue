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
      return Math.floor(volume * 100);
    },
  }
});
</script>

<template>
  <div class="volume">
    <div class="volume__status">
      <button>
        <font-awesome-icon
          v-if="volume < 30"
          icon="volume-off"
        />

        <font-awesome-icon
          v-else-if="volume < 60"
          icon="volume-low"
        />

        <font-awesome-icon
          v-else
          icon="volume-high"
        />
      </button>
    </div>

    <div class="volume__input">
      <input
        min="0"
        max="1"
        step="0.01"
        type="range"
        :value="value"
        @input="onVolume"
      >
    </div>

    <div class="volume__label">{{ volume }}%</div>
  </div>
</template>

<style scoped lang="scss">
.volume {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__status,
  &__input,
  &__label {
    display: flex;
  }
}
</style>