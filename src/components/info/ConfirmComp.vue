<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';

import { DOMHelper } from '@/utils/helpers/dom.helper';
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
  },

  mounted(): void {
    const { elementRef } = this.$refs;
    DOMHelper.focus('.confirm__resolve button', elementRef as HTMLElement);
  },

  setup() {
    const elementRef = ref(null);
    return { elementRef };
  }
});
</script>

<template>
  <div
    class="confirm"
    ref="elementRef"
  >
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
          type="outline"
          :label="params?.rejectLabel"
          @click="onReject"
        />
      </div>

      <div class="confirm__resolve">
        <ButtonComp
          icon="trash"
          type="primary"
          :label="params?.resolveLabel"
          @click="onResolve"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirm {
  $root: &;

  &__body {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(var(--color-secondary-rgb), 0.5);

    #{$root}__icon {
      font-size: 40px;
      margin-top: -10px;
      color: var(--color-primary);
    }

    #{$root}__message {
      font-size: 16px;
      color: var(--color-primary);
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    #{$root}__resolve {
      margin-left: 12px;
    }
  }
}
</style>