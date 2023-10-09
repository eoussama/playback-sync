<script setup lang="ts">
import View from './components/View.vue';
import Controls from './components/Controls.vue';
</script>

<template>
  <div class="root">
    <div class="body">
      <div class="view">
        <View />
      </div>

      <div class="controls">
        <Controls />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  width: 100vw;
  height: 100vh;

  .body {
    display: flex;
    flex-direction: column;

    height: 100%;

    .view {
      flex: 100%;
    }
  }

}
</style>