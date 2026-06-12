<script setup lang="ts">
import BodySection from "./components/layout/BodySection.vue";
import FootSection from "./components/layout/FootSection.vue";

import HeadSection from "./components/layout/HeadSection.vue";
import { useAppStore } from "./state/stores/app.store";
import { useModalStore } from "./state/stores/modal.store";



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
        v-for="modal in modalStore.modals"
        :key="modal.id"
        :modal="modal"
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
