<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';

import { DOMHelper } from '@/utils/helpers/dom.helper';
import { ModalHelper } from '@/utils/helpers/modal.helper';

import type { TToast } from '@/utils/types/composition/toast.type';

export default defineComponent({

  props: {
    modalId: String,
    params: Object as PropType<TToast>
  },

  methods: {

    /**
     * @description
     * Handles closure
     */
    onClose(): void {
      if (this.modalId) {
        ModalHelper.close(this.modalId, false);
      }
    }
  },

  mounted(): void {
    const { elementRef } = this.$refs;
    DOMHelper.focus('.toast__action button', elementRef as HTMLElement);

    setTimeout(() => {
      this.onClose();
    }, 3000);
  },

  setup() {
    const elementRef = ref(null);
    return { elementRef };
  }
})
</script>

<template>
  <div
    class="toast"
    ref="elementRef"
  >
    <div class="toast__message">
      {{ params?.message }}
    </div>

    <div class="toast__action">
      <div class="toast__close">
        <ButtonComp
          icon="xmark"
          type="secondary"
          @click="onClose"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toast {
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 400px;
  padding: 15px;

  background: linear-gradient(to right, hsl(var(--color-secondary-hsl), 90%), hsl(var(--color-secondary-hsl), 92%));

  &__message {
    margin-right: 10px;
    color: var(--color-text);

    font-size: 15px;
    font-family: var(--font-primary);
    font-weight: var(--font-weight-regular);
  }

  &__action {
    margin-left: auto;
  }
}
</style>