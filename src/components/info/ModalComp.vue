<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ModalHelper } from '@/utils/helpers/modal.helper';

import { ModalAlignment } from '@/utils/enums/modalAlignment.enum';
import type { TModal } from '@/utils/types/composition/modal.type';
import type { TComponent } from '@/utils/types/composition/component.type';

export default defineComponent({

  props: {
    modal: Object as PropType<TModal<TComponent>>
  },

  computed: {

    /**
     * @description
     * Alignment enumerator
     */
    ModalAlignment(): typeof ModalAlignment {
      return ModalAlignment;
    }
  },

  methods: {

    /**
     * @description
     * Checks if alighments match
     *
     * @param alignment The alignment to check
     * @param mode The aligment to check against
     */
    isAlignment(alignment: ModalAlignment, mode: ModalAlignment): boolean {
      return alignment === mode;
    },

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
    :class="{
      'modal--dialog': modal.params.dialog,
      'modal--overlay': modal.params.overlay,
      'modal--top': isAlignment(modal.params.alignment, ModalAlignment.Top),
      'modal--center': isAlignment(modal.params.alignment, ModalAlignment.Center),
      'modal--bottom': isAlignment(modal.params.alignment, ModalAlignment.Bottom)
    }"
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

  overflow: auto;
  box-sizing: border-box;

  width: 100vw;
  height: 100vh;

  padding: $padding;

  display: grid;
  justify-items: center;

  z-index: 1000;
  pointer-events: none;

  &__element {
    overflow: hidden;
    pointer-events: all;

    border-radius: 10px;
    box-sizing: border-box;

    background-color: white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

    max-width: 100vw;
    height: min-content;

    animation-name: fadeIn;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;

    #{$root}__head {
      display: none;
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

  &--dialog {
    #{$root}__head {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: $padding;
      background: linear-gradient(to right, var(--color-secondary), hsl(var(--color-secondary-hsl), 95%));

      #{$root}__title {
        font-size: 20px;
        font-weight: var(--font-weight-bold);
        font-family: var(--font-family-primary);
      }
    }

    #{$root}__body {
      padding: $padding;
    }
  }

  &--overlay {
    pointer-events: all;
    background-color: rgba(var(--color-primary-rgb), 0.7);
  }

  &--top {
    align-items: start;
  }

  &--center {
    align-items: center;
  }

  &--bottom {
    align-items: end;
  }
}
</style>