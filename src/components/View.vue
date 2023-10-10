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
  View {{ sources }}
</template>

<style scoped lang="scss"></style>