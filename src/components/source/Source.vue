<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ConfirmHelper } from '@/utils/helpers/confirm.helper';

import type { TSource } from '@/utils/types/composition/source.type';

export default defineComponent({
  emits: ['remove', 'edit'],

  props: {
    source: Object as PropType<TSource>
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
    }
  }
});
</script>

<template>
  <div
    v-if="source"
    class="source"
    :key="source.id"
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
          icon="xmark"
          @click="onRemove"
        />

        <Button
          icon="pen"
          @click="onEdit"
        />
      </div>

    </div>

    <div class="source__body">
      <video
        preload="auto"
        class="source__player"
        :id="`player-${source.id}`"
      >
        <source
          type="video/mp4"
          :src="`${source.url}#t=${source.metadata?.start},${source.metadata?.end}`"
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
}
</style>