<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'

import PlayPause from '@/components/PlayPause.vue'

import { SourceHelper } from '@/utils/helpers/source.helper'
import { useSourcesStore } from '@/state/stores/sources.store'

export default defineComponent({
  data: () => ({
    url: '',
    title: ''
  }),

  methods: {
    ...mapActions(useSourcesStore, ['addSource', 'setPlaying', 'setVolume', 'setSpeed', 'seek']),

    /**
     * @description
     * Checks if source is filled
     */
    isSourceFilled(): boolean {
      return this.url.length > 0 && this.title.length > 0;
    },

    /**
     * @description
     * Resets the source entry form
     */
    reset(): void {
      this.url = '';
      this.title = '';
    },

    /**
     * @description
     * Adds a new source
     */
    onSourceAdd(): void {
      if (this.isSourceFilled()) {
        const source = SourceHelper.create(this.url, this.title);

        this.reset();
        this.addSource(source);
      }
    },

    /**
     * @description
     * Toggles the playing state of the sources
     */
    onToggle(): void {
      this.setPlaying(!this.playing);
    },

    /**
     * @description
     * Seek timeline backward
     */
    onBackward(): void {
      this.seek(-10);
    },

    /**
     * @description
     * Seek timeline forward
     */
    onForward(): void {
      this.seek(10);
    },

    /**
     * @description
     * Changes the volume
     *
     * @param e The input event
     */
    onVolume(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value);

      this.setVolume(value);
    },

    /**
     * @description
     * Changes the speed
     *
     * @param e The input event
     */
    onSpeed(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value);

      this.setSpeed(value);
    }
  },

  computed: {
    ...mapState(useSourcesStore, ['sources', 'volume', 'speed', 'playing'])
  },

  components: {
    PlayPause
  }
});
</script>

<template>
  Controls

  <input
    type="text"
    placeholder="Video Title..."
    v-model="title"
  >

  <input
    type="url"
    placeholder="Video URL..."
    v-model="url"
  >

  <button @click="onSourceAdd">Add Video</button>

  <hr>

  <button @click="onBackward">
    <font-awesome-icon icon="backward" />
  </button>

  <PlayPause
    :value="playing"
    @valueUpdated="onToggle"
  />

  <button @click="onForward">
    <font-awesome-icon icon="forward" />
  </button>

  <hr>

  <input
    min="0"
    max="1"
    step="0.1"
    type="range"
    :value="volume"
    @input="onVolume"
  > {{ volume * 100 }}%

  <hr>

  <input
    min="0.25"
    max="2"
    step="0.25"
    type="range"
    :value="speed"
    @input="onSpeed"
  > x{{ speed }}
</template>

<style scoped lang="scss"></style>