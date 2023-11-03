<script setup lang="ts">

import { useAppStore } from './state/stores/app.store';
import { useModalStore } from './state/stores/modal.store';

import HeadSection from './components/layout/HeadSection.vue';
import BodySection from './components/layout/BodySection.vue';
import FootSection from './components/layout/FootSection.vue';



const appStore = useAppStore();
const modalStore = useModalStore();
</script>

<template>
  <div
    class="root"
    :class="{ 'root--fullscreen': appStore.fullscreen }"
  >
    <div class="root__content">
      <HeadSection />
      <BodySection />
      <FootSection />
    </div>

    <div class="root__modals">
      <ModalComp
        :modal="modal"
        :key="modal.id"
        v-for="modal in modalStore.modals"
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

  &--fullscreen {
    overflow: hidden;
  }
}
</style>