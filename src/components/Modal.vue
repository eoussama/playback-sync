<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<template>
  <div class="modal">
    <div class="modal__element">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter: blur(5px);
  background-color: rgba(var(--color-primary-rgb), 0.5);

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  &__element {
    background-color: white;
  }
}
</style>