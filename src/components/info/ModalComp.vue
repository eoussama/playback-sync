<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ModalHelper } from '@/utils/helpers/modal.helper';

import type { TModal } from '@/utils/types/composition/modal.type';
import type { TComponent } from '@/utils/types/composition/component.type';

export default defineComponent({

  props: {
    modal: Object as PropType<TModal<TComponent>>
  },

  methods: {

    /**
     * @description
     * Closes the modal
     */
    onClose(): void {
      if (this.modal) {
        ModalHelper.close(this.modal.id);
      }
    }
  }
});
</script>

<template>
  <div
    v-if="modal"
    class="modal"
    :id="`modal-${modal.id}`"
  >
    <div class="modal__element">
      <div class="modal__head">
        <div class="modal__title">{{ modal.title }}</div>

        <div class="modal__close">
          <ButtonComp
            icon="xmark"
            @click="onClose"
          />
        </div>
      </div>
      <div class="modal__body">
        <component
          :modalId="modal.id"
          :params="modal.props"
          :is="{...modal.component}"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  $root: &;
  $padding: 20px;

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
    overflow: hidden;

    border-radius: 10px;
    box-sizing: border-box;

    background-color: white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

    animation-name: fadeIn;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;

    #{$root}__head {

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: $padding;
      background: linear-gradient(to right, var(--color-secondary), hsl(var(--color-secondary-hsl), 95%));

      #{$root}__title {
        font-size: 20px;
        font-family: var(--font-primary);
        font-weight: var(--font-weight-bold);
      }
    }

    #{$root}__body {
      padding: $padding;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>