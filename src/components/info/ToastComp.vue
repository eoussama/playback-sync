<script lang="ts">
import { defineComponent, type PropType } from 'vue';

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
  }
})
</script>

<template>
  <div class="toast">
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

<style scoped lang="scss"></style>