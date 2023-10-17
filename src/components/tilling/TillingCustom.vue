<script lang="ts">
import { defineComponent } from 'vue';
import { ModalHelper } from '@/utils/helpers/modal.helper';

export default defineComponent({

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
        ModalHelper.close(this.modalId, { value: 100 });
      }
    }
  }
});
</script>

<template>
  <div class="tilling-custom">
    <div class="tilling-custom__body">
      Tilling Custom
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