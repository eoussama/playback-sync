<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapState } from 'pinia';

import { DOMHelper } from '@/utils/helpers/dom.helper';
import { ReadyState } from '@/utils/enums/readyState.enum';
import { useSourcesStore } from '@/state/stores/sources.store';

export default defineComponent({
  emits: ['load'],

  data: () => ({
    loading: false
  }),

  props: {
    buffering: Boolean,
    forceLoad: Boolean
  },

  watch: {
    loading() {
      this.$emit('load', this.loading);
    }
  },

  computed: {
    ...mapState(useSourcesStore, ['bufferPause']),

    /**
     * @description
     * Checks if source is loading
     */
    isLoading(): boolean {
      return this.loading || this.buffering || this.bufferPause || this.forceLoad;
    }
  },

  mounted(): void {
    const container = this.$refs.elementRef as HTMLElement;

    DOMHelper
      .watch('.source__player', container)
      .then(players => players[0] as HTMLVideoElement)
      .then(player => {
        const listener = () => {
          this.loading = player.readyState < ReadyState.HaveEnoughData;
        };

        player.addEventListener('load', listener);
        player.addEventListener('stalled', listener);
        player.addEventListener('canplay', listener);
        player.addEventListener('waiting', listener);
        player.addEventListener('suspend', listener);
        player.addEventListener('loadstart', listener);
        player.addEventListener('loadeddata', listener);
        player.addEventListener('loadedmetadata', listener);
        player.addEventListener('canplaythrough', listener);
      });
  },

  setup() {
    const elementRef = ref(null);
    return { sourceRef: elementRef };
  }
})
</script>

<template>
  <div
    class="loader"
    ref="elementRef"
    :class="{ 'loader--loading': isLoading }"
  >
    <div
      v-if="isLoading"
      class="loader__element"
    >
      <div
        v-if="buffering"
        class="loader__wrapper"
      >
        <div class="loader__icon">
          <font-awesome-icon
            fade
            icon="hourglass-half"
          />
        </div>

        <div class="loader__message">
          Syncing Video
        </div>
      </div>

      <div
        v-else
        class="loader__wrapper"
      >
        <div class="loader__icon">
          <font-awesome-icon
            spin
            icon="circle-notch"
          />
        </div>

        <div class="loader__message">
          Loading Video
        </div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.loader {
  $root: &;

  position: relative;

  &__element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 1;

    #{$root}__wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      #{$root}__icon {
        font-size: 35px;
        color: rgba(var(--color-primary-rgb), 0.8);
      }

      #{$root}__message {
        font-size: 14px;
        text-align: center;
        color: var(--color-primary);
      }
    }
  }

  &::after {
    content: '';
    pointer-events: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: transparent;

    transition-duration: 0.2s;
    transition-property: background-color;
  }

  &--loading::after {
    background-color: rgba(var(--color-secondary-rgb), 0.5);
  }
}
</style>