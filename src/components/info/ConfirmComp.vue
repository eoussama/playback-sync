<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ModalHelper } from '@/utils/helpers/modal.helper';

import type { TConfirm } from '@/utils/types/composition/confirm.type';

export default defineComponent({

  props: {
    modalId: String,
    params: Object as PropType<TConfirm>
  },

  methods: {

    /**
     * @description
     * Rejects the request
     */
    onReject(): void {
      if (this.modalId) {
        ModalHelper.close(this.modalId, false);
      }
    },

    /**
     * @description
     * Resolves the request
     */
    onResolve(): void {
      if (this.modalId) {
        ModalHelper.close(this.modalId, true);
      }
    }
  }
});
</script>

<template>
  <div class="confirm">
    <div class="confirm__body">
      <div
        v-if="params?.icon"
        class="confirm__icon"
      >
        <font-awesome-icon :icon="params.icon" />
      </div>

      <div
        v-if="params?.message"
        class="confirm__message"
      >
        {{ params.message }}
      </div>
    </div>

    <div class="confirm__controls">
      <div class="confirm__reject">
        <ButtonComp
          @click="onReject"
          :label="params?.rejectLabel"
        />
      </div>

      <div class="confirm__resolve">
        <ButtonComp
          @click="onResolve"
          :label="params?.resolveLabel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirm {
  &__body {}

  &__controls {}
}
</style>