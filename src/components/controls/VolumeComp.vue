<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['volumeUpdated', 'muteToggled'],

  props: {
    value: Number,
    muted: Boolean
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

      this.$emit('volumeUpdated', value);
    },

    /**
     * @description
     * Toggles the muted state
     */
    onMuteToggled(): void {
      this.$emit('muteToggled');
    }
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

    /**
     * @description
     * The icon to show on the button
     */
    icon(): string {
      if (this.muted || this.volume === 0) {
        return 'volume-xmark';
      } else if (this.volume < 30) {
        return 'volume-off';
      } else if (this.volume < 60) {
        return 'volume-low';
      } else {
        return 'volume-high';
      }
    }
  }
});
</script>

<template>
  <div class="volume">
    <div class="volume__status">
      <ButtonComp
        :icon="icon"
        @click="onMuteToggled"
      />
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