<script setup lang="ts">

import { hookEffects } from './state/effects';
import { useModalStore } from './state/stores/modal.store';

import HeadSection from './components/layout/HeadSection.vue';
import BodySection from './components/layout/BodySection.vue';
import FootSection from './components/layout/FootSection.vue';



hookEffects();
const store = useModalStore();
</script>

<template>
  <div class="root">
    <div class="root__content">
      <HeadSection />
      <BodySection />
      <FootSection />
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