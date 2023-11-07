<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useAppStore } from '@/state/stores/app.store';
import { useSourcesStore } from '@/state/stores/sources.store';

export default defineComponent({

  methods: {
    ...mapActions(useAppStore, ['updateControlsHover']),
    ...mapActions(useSourcesStore, [
      'setPlaying',
      'setMuted',
      'setVolume',
      'setSpeed',
      'onSeek',
      'onRestart',
      'onTimelineSet'
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
     * Toggles the playing state of the sources
     */
    onRestartSources(): void {
      this.onRestart();
    },

    /**
     * @description
     * Seek timeline backward
     */
    onBackward(): void {
      this.onSeek(-this.seekStep);
    },

    /**
     * @description
     * Seek timeline forward
     */
    onForward(): void {
      this.onSeek(this.seekStep);
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
      this.onTimelineSet(time);
    },

    /**
     * @description
     * Handles mouse enter
     */
    onMouseEnter(): void {
      this.updateControlsHover(true);
    },

    /**
     * @description
     * Handles mouse leave
     */
    onMouseLeave(): void {
      this.updateControlsHover(false);
    }
  },

  computed: {
    ...mapState(useAppStore, ['seekStep', 'fullscreen', 'hover']),
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
  <div
    class="controls-wrapper"
    :class="{
      'controls-wrapper--show': hover.controls,
      'controls-wrapper--fullscreen': fullscreen
    }"
  >
    <div
      v-if="!disabled"
      class="controls"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="controls__top">
        <TimelineComp
          :duration="duration"
          :value="timelineValue"
          @timeline-updated="onTimelineChanged"
        />
      </div>

      <div class="controls__bottom">
        <div class="controls__speed">
          <SpeedComp
            :value="speed"
            @speedChanged="onSpeed"
          />
        </div>

        <div class="controls__rewind">
          <div class="controls__backward">
            <ButtonComp
              icon="backward"
              @click="onBackward"
            />
          </div>

          <div class="controls__play-pause">
            <PlayPauseComp
              :repeat="ended"
              :value="playing"
              @toggled="onToggle"
              @restart="onRestartSources"
            />
          </div>

          <div class="controls__forward">
            <ButtonComp
              icon="forward"
              @click="onForward"
            />
          </div>
        </div>

        <div class="controls__volume">
          <VolumeComp
            :muted="muted"
            :value="volume"
            @volumeUpdated="onVolume"
            @muteToggled="onMuteToggled"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/mixins/triggerable';

.controls {
  $root: &;

  padding: 15px 15px 35px 15px;
  box-sizing: border-box;
  background-color: hsl(var(--color-secondary-hsl), 90%);

  &__top {
    margin-bottom: 24px;

    transition-duration: 0.2s;
    transition-property: padding-top;
  }

  &__bottom {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    position: relative;

    #{$root}__speed {
      width: auto;
    }

    #{$root}__rewind {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      transition-duration: 0.2s;
      transition-property: transform;

      #{$root}__play-pause {
        margin: 0 10px;
      }
    }
  }

  &-wrapper {
    $wrapper: &;

    width: 100%;

    &--fullscreen {
      position: fixed;
      bottom: 35px;
      left: 0;

      #{$root} {
        margin: auto;
        position: relative;

        width: 90%;
        max-width: 1000px;
        border-radius: 10px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

        top: 10px;
        opacity: 0;

        transition-duration: 0.2s;
        transition-property: top opacity;

        @extend %triggerable;
      }

      &#{$wrapper}--show {
        #{$root} {
          top: 0;
          opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 520px) {
    &__top {
      padding-top: 60px;
    }

    &__bottom {
      #{$root}__rewind {
        transform: translate(-50%, calc(-50% - 100px));
      }
    }
  }

  @media screen and (max-width: 290px) {
    &__bottom {
      flex-direction: column-reverse;

      #{$root}__rewind {
        transform: translate(-50%, calc(-50% - 125px));
      }

      #{$root}__volume {
        margin-bottom: 15px;
      }
    }
  }
}
</style>