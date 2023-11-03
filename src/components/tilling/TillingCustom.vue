<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';

import { TillingValue } from '@/utils/enums/tillingValue.enum';
import type { TillingCustomType } from '@/utils/types/components/tillingCustom.type';

import { DOMHelper } from '@/utils/helpers/dom.helper';
import { ModalHelper } from '@/utils/helpers/modal.helper';

export default defineComponent({

  data: (): TillingCustomType => ({
    tilling: TillingValue.Custom
  }),

  props: {
    modalId: String,
    params: {
      default: () => { TillingValue.Custom },
      type: Object as PropType<TillingCustomType>
    }
  },

  methods: {

    /**
     * @description
     * Validates the custom tilling value
     */
    onValidate(): void {
      if (this.modalId && this.tilling > 0) {
        ModalHelper.close(this.modalId, { value: this.tilling });
      }
    }
  },

  mounted(): void {
    const { elementRef } = this.$refs;
    this.tilling = this.params.tilling ?? TillingValue.Custom;

    DOMHelper.focus('input', elementRef as HTMLElement);
  },

  setup() {
    const elementRef = ref(null);
    return { elementRef };
  }
});
</script>

<template>
  <div
    ref="elementRef"
    class="tilling-custom"
  >
    <div class="tilling-custom__body">
      Tilling Custom

      <InputComp
        :min="1"
        type="number"
        v-model="tilling"
      />
    </div>

    <div class="tilling-custom__controls">
      <ButtonComp
        icon="check"
        label="Apply"
        type="primary"
        @click="onValidate"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tilling-custom {
  width: 400px;

  &__body {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(var(--color-secondary-rgb), 0.5);
  }

  &__controls {
    text-align: right;
  }
}
</style>