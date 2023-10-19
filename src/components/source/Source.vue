<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ConfirmHelper } from '@/utils/helpers/confirm.helper';

import type { TSource } from '@/utils/types/composition/source.type';

export default defineComponent({
  emits: ['remove', 'edit', 'pin', 'unpin'],

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
    }
  },

  methods: {

    /**
     * @description
     * Emits remove event
     */
    onRemove() {
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
     * Emits edit event
     */
    onEdit() {
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
      <div class="source_title">
        <a
          target="_blank"
          :href="source.url"
        >
          {{ source.title }}
        </a>

        <Button
          icon="trash"
          @click="onRemove"
        />

        <Button
          icon="pen"
          @click="onEdit"
        />

        <Button
          icon="thumbtack"
          @click="onPin"
        />
      </div>

    </div>

    <div class="source__body">
      <div class="source__controls">
        <Button
          icon="xmark"
          @click="onUnpin"
        />
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
  max-width: 100%;

  &__player {
    width: 100%;
  }

  &__controls {
    display: none;
  }

  &--pinned {
    .source__head {
      display: none;
    }

    .source__controls {
      display: block;
    }
  }
}</style>