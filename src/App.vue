<script setup lang="ts">

import { hookEffects } from './state/effects';
import { useModalStore } from './state/stores/modal.store';

import View from './components/View.vue';

import Foot from './components/layout/Foot.vue';
import Head from './components/layout/Head.vue';

import Controls from './components/Controls.vue';

hookEffects();
const store = useModalStore();
</script>

<template>
  <div class="root">
    <div class="head">

      <Head />
    </div>

    <div class="body">
      <div class="view">
        <View />
      </div>

      <div class="controls">
        <Controls />
      </div>
    </div>

    <div class="foot">
      <Foot />
    </div>

    <div class="modals">
      <Modal
        :modal="modal"
        :key="modal.id"
        v-for="modal in store.modals"
      />
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