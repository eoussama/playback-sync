<script>
import { mapState } from 'pinia'
import { useSourcesStore } from './../stores/sources.store.ts'

export default {
  computed: {
    ...mapState(useSourcesStore, ['sources'])
  }
}
</script>

<template>
  View {{ sources }}
</template>

<style scoped lang="scss"></style>