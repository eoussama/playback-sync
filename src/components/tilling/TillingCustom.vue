<script lang="ts">
import { defineComponent } from 'vue';
import { ModalHelper } from '@/utils/helpers/modal.helper';
import { TillingValue } from '@/utils/enums/tillingValue.enum';

export default defineComponent({

  data: () => ({
    value: TillingValue.Custom
  }),

  props: {
    modalId: String
  },

  methods: {

    /**
     * @description
     * Validates the custom tilling value
     */
    onValidate(): void {
      if (this.modalId) {
        ModalHelper.close(this.modalId, { value: this.value });
      }
    }
  }
});
</script>

<template>
  <div class="tilling-custom">
    <div class="tilling-custom__body">
      Tilling Custom
      <Input
        min="1"
        type="number"
        v-model="value"
      />
    </div>

    <div class="tilling-custom__controls">
      <Button
        label="Apply"
        @click="onValidate"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tilling-custom {}
</style>