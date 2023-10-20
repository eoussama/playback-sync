<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useSourcesStore } from '@/state/stores/sources.store';

export default defineComponent({

  methods: {
    ...mapActions(useSourcesStore, [
      'setPlaying',
      'setMuted',
      'setVolume',
      'setSpeed',
      'setTimeline',
      'seek'
    ]),

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
  }
});
</script>

<template>
  <div class="controls">
    <div class="controls__top">
      <TimelineComp
        v-if="!disabled"
        :duration="duration"
        :value="timelineValue"
        @timeline-updated="onTimelineChanged"
      />
    </div>

    <div class="controls__bottom">
      <div class="controls__speed">
        <SpeedComp
          v-if="!disabled"
          :value="speed"
          @speedChanged="onSpeed"
        />
      </div>

      <div class="controls__rewind">
        <ButtonComp
          v-if="!disabled"
          icon="backward"
          @click="onBackward"
        />

        <PlayPauseComp
          v-if="!disabled"
          :repeat="ended"
          :value="playing"
          @toggled="onToggle"
        />

        <ButtonComp
          v-if="!disabled"
          icon="forward"
          @click="onForward"
        />
      </div>

      <div class="controls__volume">
        <VolumeComp
          v-if="!disabled"
          :muted="muted"
          :value="volume"
          @volumeUpdated="onVolume"
          @muteToggled="onMuteToggled"
        />
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.controls {
  padding: 10px;
  background-color: hsl(var(--color-secondary-hsl), 90%);

  &__top {
    margin-bottom: 10px;
  }

  &__bottom {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    position: relative;

    .controls__rewind {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>