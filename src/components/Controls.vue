<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSourcesStore } from '@/stores/sources.store'
import { SourceHelper } from '@/utils/helpers/source.helper'

export default defineComponent({
  data: () => ({
    url: '',
    title: ''
  }),

  methods: {
    ...mapActions(useSourcesStore, ['addSource']),

    /**
     * @description
     * Checks if source is filled
     */
    isSourceFilled() {
      return this.url.length > 0 && this.title.length > 0;
    },

    /**
     * @description
     * Resets the source entry form
     */
    reset() {
      this.url = '';
      this.title = '';
    },

    /**
     * @description
     * Adds a new source
     */
    onSourceAdd() {
      if (this.isSourceFilled()) {
        const source = SourceHelper.create(this.url, this.title);

        this.reset();
        this.addSource(source);
      }
    },

    onPlay() {
      for (const source of this.sources) {
        SourceHelper.play(source.id);
      }
    }
  },

  computed: {
    ...mapState(useSourcesStore, ['sources'])
  }
})
</script>

<template>
  Controls

  <input
    type="text"
    placeholder="Video Title..."
    v-model="title"
  >

  <input
    type="url"
    placeholder="Video URL..."
    v-model="url"
  >

  <button @click="onSourceAdd">Add Video</button>

  <hr>

  <button @click="onPlay">Play</button>
</template>

<style scoped lang="scss"></style>