<script lang="ts">
import { defineComponent } from 'vue';

import View from './View.vue';
import Controls from './Controls.vue';

export default defineComponent({});
</script>

<template>
  <div class="body">
    <div class="view__wrapper">
      <View />
    </div>

    <div class="controls__wrapper">
      <Controls />
    </div>
  </div>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;

  height: 100%;

  .view__wrapper {
    flex: 100%;
  }
}
</style>