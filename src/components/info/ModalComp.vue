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