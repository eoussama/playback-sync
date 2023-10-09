<script setup lang="ts">
import View from './components/View.vue';
import Controls from './components/Controls.vue';
</script>

<template>
  <div class="root">
    <div class="body">
      <div class="videos">
        <View />
      </div>

      <div class="controls">
        <Controls />
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
}
</style>