<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSourcesStore } from '@/stores/sources.store'
import { SourceHelper } from '@/utils/helpers/source.helper'

export default defineComponent({
  data: () => ({
    url: '',
    title: '',
    speed: 1,
    volume: 1
  }),

  methods: {
    ...mapActions(useSourcesStore, ['addSource']),

    /**
     * @description
     * Checks if source is filled
     */
    isSourceFilled() {
      return this.url.length > 0 && this.title.length > 0;
    },

    /**
     * @description
     * Resets the source entry form
     */
    reset() {
      this.url = '';
      this.title = '';
    },

    /**
     * @description
     * Adds a new source
     */
    onSourceAdd() {
      if (this.isSourceFilled()) {
        const source = SourceHelper.create(this.url, this.title);

        this.reset();
        this.addSource(source);
      }
    },


    /**
     * @description
     * Plays the sources
     */
    onPlay() {
      for (const source of this.sources) {
        SourceHelper.play(source.id);
      }
    },

    /**
     * @description
     * Pauses the sources
     */
    onPause() {
      for (const source of this.sources) {
        SourceHelper.pause(source.id);
      }
    },

    /**
     * @description
     * Seek timeline backward
     */
    onBackward() {
      for (const source of this.sources) {
        SourceHelper.seek(source.id, -10);
      }
    },

    /**
     * @description
     * Seek timeline forward
     */
    onForward() {
      for (const source of this.sources) {
        SourceHelper.seek(source.id, 10);
      }
    },

    /**
     * @description
     * Changes the volume
     */
    onVolume() {
      for (const source of this.sources) {
        SourceHelper.setVolume(source.id, this.volume);
      }
    },

    /**
     * @description
     * Changes the speed
     */
    onSpeed() {
      for (const source of this.sources) {
        SourceHelper.setSpeed(source.id, this.speed);
      }
    }
  },

  computed: {
    ...mapState(useSourcesStore, ['sources'])
  }
})
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

  <button @click="onBackward">Backward</button>
  <button @click="onPlay">Play</button>
  <button @click="onPause">Pause</button>
  <button @click="onForward">Forward</button>

  <hr>

  <input
    min="0"
    max="1"
    step="0.1"
    type="range"
    v-model="volume"
    @input="onVolume"
  >

  <hr>

  <input
    min="0.25"
    max="2"
    step="0.25"
    type="range"
    v-model="speed"
    @input="onSpeed"
  >
</template>

<style scoped lang="scss"></style>