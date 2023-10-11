<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

export default defineComponent({
  computed: {
    ...mapState(useSourcesStore, ['sources'])
  },

  methods: {
    ...mapActions(useSourcesStore, ['removeSource']),

    /**
     * @description
     * Removes a source
     */
    onRemove(id: string) {
      this.removeSource(id);
    }
  }
});
</script>

<template>
  <div class="sources">
    <div
      class="source"
      :key="source.id"
      v-for="source in sources"
    >
      <div class="source__head">
        <div class="source_title">
          <a
            target="_blank"
            :href="source.url"
          >{{ source.title }}</a>
          <button @click="onRemove(source.id)">x</button>
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
  </div>
</template>

<style scoped lang="scss">
.sources {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .source {
    max-width: 100%;

    &__player {
      width: 100%;
    }
  }
}
</style>