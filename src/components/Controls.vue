<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import Speed from '@/components/Speed.vue';
import Volume from '@/components/Volume.vue';
import Timeline from '@/components/Timeline.vue';
import PlayPause from '@/components/PlayPause.vue';

import { SourceHelper } from '@/utils/helpers/source.helper';
import { useSourcesStore } from '@/state/stores/sources.store';

export default defineComponent({
  data: () => ({
    url: '',
    title: ''
  }),

  methods: {
    ...mapActions(useSourcesStore, [
      'addSource',
      'setPlaying',
      'setMuted',
      'setVolume',
      'setSpeed',
      'seek'
    ]),

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
     * @param e The volume value
     */
    onVolume(volume: number): void {
      this.setVolume(volume);
    },

    /**
     * @description
     * Toggles the muted state of the sources
     */
    onMuteToggled(): void {
      this.setMuted(!this.muted);
    },

    /**
     * @description
     * Changes the speed
     *
     * @param speed The speed of the sources
     */
    onSpeed(speed: number): void {
      this.setSpeed(speed);
    }
  },

  computed: {
    ...mapState(useSourcesStore, [
      'sources',
      'volume',
      'speed',
      'playing',
      'muted'
    ])
  },

  components: {
    PlayPause,
    Timeline,
    Volume,
    Speed
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
    @toggled="onToggle"
  />

  <button @click="onForward">
    <font-awesome-icon icon="forward" />
  </button>

  <hr>

  <Volume
    :muted="muted"
    :value="volume"
    @volumeUpdated="onVolume"
    @muteToggled="onMuteToggled"
  />

  <hr>

  <Speed
    :value="speed"
    @speedChanged="onSpeed"
  />

  <hr>

  <Timeline />
</template>

<style scoped lang="scss"></style>