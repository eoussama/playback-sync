<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSourcesStore } from '@/stores/sources.store'

export default defineComponent({
  data: () => ({
    url: '',
    title: ''
  }),
  methods: {
    ...mapActions(useSourcesStore, ['add']),
    onVideoAdd() {
      if (this.url.length > 0 && this.title.length > 0) {
        const source = { url: this.url, title: this.title };

        this.url = '';
        this.title = '';

        this.add(source);
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

  <button @click="onVideoAdd">Add Video</button>
</template>

<style scoped lang="scss"></style>