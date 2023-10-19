<script setup lang="ts">

import { hookEffects } from './state/effects';
import { useModalStore } from './state/stores/modal.store';

import Head from './components/layout/Head.vue';
import Body from './components/layout/Body.vue';
import Foot from './components/layout/Foot.vue';



hookEffects();
const store = useModalStore();
</script>

<template>
  <div class="root">
    <div class="root__content">
      <Head />
      <BodySection />
      <Foot />
    </div>

    <div class="root__modals">
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

  &__content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  }
}
</style>