<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ConfirmHelper } from '@/utils/helpers/confirm.helper';

import type { TSource } from '@/utils/types/composition/source.type';
import { getVolumeIcon } from '@/utils/helpers/fontawesome.helper';

export default defineComponent({
  emits: ['remove', 'edit', 'pin', 'unpin', 'toggleMute'],

  props: {
    source: Object as PropType<TSource>
  },

  computed: {

    /**
     * @description
     * The ID of the source's element on the DOM
     */
    sourceId(): string {
      return `source-${this.source?.id}`;
    },

    /**
     * @description
     * The ID of the source's player on the DOM
     */
    playerId(): string {
      return `player-${this.source?.id}`;
    },

    /**
     * @description
     * The cropped source URL
     */
    sourceUrl(): string {
      return `${this.source?.url}#t=${this.source?.metadata?.start},${this.source?.metadata?.end}`;
    },

    /**
     * @description
     * The icon to show on the button
     */
    volumeIcon(): string {
      const volume = this.source?.metadata?.volume ?? 1;
      const muted = this.source?.metadata?.muted ?? false;

      return getVolumeIcon(volume * 100, muted);
    }
  },

  methods: {

    /**
     * @description
     * Emits remove event
     */
    onRemove(): void {
      ConfirmHelper
        .open({
          title: 'Deletion',
          resolveLabel: 'Delete',
          icon: 'triangle-exclamation',
          message: 'Do you really want to delete this source?'
        })
        .then(confirm => {
          if (confirm) {
            this.$emit('remove', this.source?.id);
          }
        });
    },

    /**
     * @description
     * Emits the mute toggle event
     */
    onToggleMute(): void {
      this.$emit('toggleMute', this.source?.id, !this.source?.metadata.muted);
    },

    /**
     * @description
     * Emits edit event
     */
    onEdit(): void {
      this.$emit('edit', this.source?.id);
    },

    /**
     * @description
     * Emits the pin event
     */
    onPin(): void {
      this.$emit('pin', this.source?.id);
    },

    /**
     * @description
     * Emits the unpin event
     */
    onUnpin(): void {
      this.$emit('unpin', this.source?.id);
    }
  }
});
</script>

<template>
  <div
    v-if="source"
    class="source"
    :id="sourceId"
    :key="source.id"
    :class="{ 'source--pinned': source.pinned }"
  >
    <div class="source__head">
      <div class="source__title">
        <div class="source__icon">
          <font-awesome-icon icon="video" />
        </div>

        <a
          target="_blank"
          :href="source.url"
          class="source__link"
        >
          {{ source.title }}
        </a>
      </div>

      <div class="source__controls">
        <div class="source__control source__control--contextual">
          <ButtonComp
            icon="trash"
            type="secondary"
            @click="onRemove"
          />
        </div>

        <div class="source__control source__control--contextual">
          <ButtonComp
            icon="pen"
            type="secondary"
            @click="onEdit"
          />
        </div>

        <div class="source__control source__control--contextual">
          <ButtonComp
            icon="thumbtack"
            type="secondary"
            @click="onPin"
          />
        </div>

        <div class="source__control">
          <ButtonComp
            type="secondary"
            :icon="volumeIcon"
            @click="onToggleMute"
          />
        </div>
      </div>
    </div>

    <div class="source__body">
      <div class="source__controls">
        <div class="source__control">
          <ButtonComp
            type="secondary"
            :icon="volumeIcon"
            @click="onToggleMute"
          />
        </div>

        <div class="source__control">
          <ButtonComp
            icon="xmark"
            type="secondary"
            @click="onUnpin"
          />
        </div>
      </div>

      <video
        preload="auto"
        :id="playerId"
        class="source__player"
      >
        <source
          type="video/mp4"
          :src="sourceUrl"
        >
      </video>
    </div>
  </div>
</template>

<style scoped lang="scss">
.source {
  $root: &;

  height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid hsl(var(--color-secondary-hsl), 92%);

  background-color: hsl(var(--color-secondary-hsl), 96%);

  &__head {
    cursor: grab;

    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    padding: 10px 10px 10px 15px;
    background-color: hsl(var(--color-secondary-hsl), 94%);

    &:active {
      cursor: grabbing;
    }

    #{$root}__title {
      display: flex;
      flex-direction: row;

      #{$root}__icon {
        font-size: 14px;
        margin-right: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      #{$root}__link {
        text-decoration: none;
        color: var(--color-text);

        font-size: 16px;
        font-family: var(--primary-font);
        font-weight: var(--font-weight-regular);
      }
    }
  }

  &__body {
    position: relative;

    flex: 1;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    #{$root}__player {
      width: 100%;
    }

    #{$root}__controls {
      position: absolute;
      top: 5px;
      right: 5px;

      z-index: 1;
      opacity: 0;
      display: none;

      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      transition-duration: 0.2s;
      transition-property: opacity;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    #{$root}__control {
      &--contextual {
        opacity: 0;

        transition-duration: 0.2s;
        transition-property: opacity;
      }

      &:not(:last-of-type) {
        margin-right: 5px;
      }
    }
  }

  &--pinned {
    max-width: 400px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);

    #{$root}__head {
      display: none;
    }

    #{$root}__body {
      #{$root}__player {
        border-radius: 4px;
      }

      #{$root}__controls {
        display: flex;
      }

    }

    &:hover {
      #{$root}__controls {
        opacity: 1;
      }
    }
  }

  &:hover {
    #{$root}__controls #{$root}__control--contextual {
      opacity: 1;
    }
  }
}
</style>