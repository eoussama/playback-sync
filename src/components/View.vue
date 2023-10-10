<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useSourcesStore } from '@/stores/sources.store'

export default defineComponent({
  computed: {
    ...mapState(useSourcesStore, ['sources'])
  }
})
</script>

<template>
  <div class="sources">
    <div
      class="source"
      v-for="source in sources"
    >
      <div class="source__head">
        <div class="source_title">
          <a
            target="_blank"
            :href="source.url"
          >{{ source.title }}</a>
        </div>
      </div>
      <div class="source__body">
        <video
          controls
          :id="source.id"
          class="source__player"
        >
          <source
            :src="source.url"
            type="video/mp4"
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