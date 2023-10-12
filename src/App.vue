<script setup lang="ts">

import { hookEffects } from './state/effects';
import { useModalStore } from './state/stores/modal.store';

import View from './components/View.vue';
import Controls from './components/Controls.vue';

hookEffects();

const store = useModalStore();
store.addModal({ id: 'dddd', title: 'testu' });
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

    <div class="modals">
      <Modal v-for="modal in store.modals">Modal {{ modal.title }}</Modal>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  position: relative;

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