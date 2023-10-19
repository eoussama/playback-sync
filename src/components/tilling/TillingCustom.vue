<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { ModalHelper } from '@/utils/helpers/modal.helper';
import { TillingValue } from '@/utils/enums/tillingValue.enum';
import type { TillingCustomType } from '@/utils/types/components/tillingCustom.type';

export default defineComponent({

  data: (): TillingCustomType => ({
    tilling: TillingValue.Custom
  }),

  props: {
    modalId: String,
    params: {
      default: { tilling: TillingValue.Custom },
      type: Object as PropType<TillingCustomType>
    }
  },

  methods: {

    /**
     * @description
     * Validates the custom tilling value
     */
    onValidate(): void {
      if (this.modalId) {
        ModalHelper.close(this.modalId, { value: this.tilling });
      }
    }
  },

  mounted(): void {
    this.tilling = this.params.tilling ?? TillingValue.Custom;
  }
});
</script>

<template>
  <div class="tilling-custom">
    <div class="tilling-custom__body">
      Tilling Custom
      <InputComp
        min="1"
        type="number"
        v-model="tilling"
      />
    </div>

    <div class="tilling-custom__controls">
      <ButtonComp
        label="Apply"
        @click="onValidate"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tilling-custom {}
</style>