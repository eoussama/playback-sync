<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { TSource } from '@/utils/types/composition/source.type';

export default defineComponent({
  emits: ['removed'],

  props: {
    source: Object as PropType<TSource>
  },

  methods: {

    /**
     * @description
     * Emits remove event
     */
    onRemove() {
      this.$emit('removed', this.source?.id);
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
        >{{ source.title }}</a>
        <button @click="onRemove">x</button>
      </div>

    </div>

    <div class="source__body">
      <video
        controls
        class="source__player"
        :id="`player-${source.id}`"
      >
        <source
          type="video/mp4"
          :src="`${source.url}#t=${source.metadata.start},${source.metadata.end}`"
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