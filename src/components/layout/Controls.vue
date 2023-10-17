<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import Speed from '@/components/controls/Speed.vue';
import Volume from '@/components/controls/Volume.vue';
import Timeline from '@/components/controls/Timeline.vue';
import PlayPause from '@/components/controls/PlayPause.vue';
import SourceDetail from '@/components/source/SourceDetail.vue';

import { PageType } from '@/utils/enums/pageType.enum';
import { ModalHelper } from '@/utils/helpers/modal.helper';
import { SourceHelper } from '@/utils/helpers/source.helper';
import { useSourcesStore } from '@/state/stores/sources.store';

export default defineComponent({

  methods: {
    ...mapActions(useSourcesStore, [
      'addSource',
      'resetSources',
      'setPlaying',
      'setMuted',
      'setVolume',
      'setSpeed',
      'setTimeline',
      'seek'
    ]),

    /**
     * @description
     * Opens source addition modal
     */
    onAdd(): void {
      ModalHelper
        .open('Add Source', SourceDetail, { type: PageType.Creation })
        .then(modal => {
          if (modal.payload) {
            this.addSource(modal.payload);
          }
        });
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
    },

    /**
     * @description
     * Updates the sources timelines
     */
    onTimelineChanged(time: number) {
      this.setTimeline(time);
    }
  },

  computed: {
    ...mapState(useSourcesStore, [
      'sources',
      'volume',
      'speed',
      'playing',
      'muted',
      'longestSource'
    ]),

    /**
     * @description
     * The universal duration,
     * generally the duration of the longest source
     */
    duration() {
      return Math.max(...this.sources.map(e => e.metadata.duration));
    },

    /**
     * @description
     * Returns the current time of the longest loaded source
     * to use a a reference for universal time
     */
    timelineValue() {
      return this.longestSource?.metadata?.currentTime ?? 0;
    },

    /**
     * @description
     * Whether or not the sources are finished playing
     */
    ended() {
      return this.timelineValue === this.duration
    },

    /**
     * @description
     * If the controls are disabled, mainly due
     * to the absense of any loaded sources.
     */
    disabled() {
      return this.sources.length === 0;
    }
  },

  created() {
    this.resetSources();

    [{ title: 'Futari no Yakusoku', url: 'https://v.animethemes.moe/Basquash-ED3.webm' },
    { title: 'Brave', url: 'https://v.animethemes.moe/Kindaichi-OP4.webm' }].forEach(async e => {
      const source = await SourceHelper.create(e.title, e.url);
      this.addSource(source);
    });
  }
});
</script>

<template>
  <Tooltip text="Add a new source">
    <Button
      icon="plus"
      @click="onAdd"
    />
  </Tooltip>

  <hr>

  <Button
    v-if="!disabled"
    icon="backward"
    @click="onBackward"
  />

  <PlayPause
    v-if="!disabled"
    :repeat="ended"
    :value="playing"
    @toggled="onToggle"
  />

  <Button
    v-if="!disabled"
    icon="forward"
    @click="onForward"
  />

  <hr>

  <Volume
    v-if="!disabled"
    :muted="muted"
    :value="volume"
    @volumeUpdated="onVolume"
    @muteToggled="onMuteToggled"
  />

  <hr>

  <Speed
    v-if="!disabled"
    :value="speed"
    @speedChanged="onSpeed"
  />

  <hr>

  <Timeline
    v-if="!disabled"
    :duration="duration"
    :value="timelineValue"
    @timeline-updated="onTimelineChanged"
  />
</template>

<style scoped lang="scss"></style>