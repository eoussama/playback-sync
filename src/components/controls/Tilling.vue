<script lang="ts">
import { defineComponent } from 'vue';
import { TillingValue } from '@/utils/enums/tillingValue.enum';

export default defineComponent({

  data: () => ({
    value: TillingValue.Fill,
    customValue: TillingValue.Custom + 1,
    options: [
      { label: 'Fill', value: TillingValue.Fill },
      { label: 'Split', value: TillingValue.Split },
      { label: 'Custom', value: TillingValue.Custom }
    ]
  }),

  computed: {

    /**
     * @description
     * The definitive selected tilling mode
     */
    tillingMode(): number {
      return this.value === TillingValue.Custom ? this.customValue : this.value;
    }
  },

  methods: {

    /**
     * @description
     * Handles value change
     */
    onChanged(): void {
      if (this.value == TillingValue.Custom) {
        this.customValue = 4;
      }

      alert(`tillingMode = ${this.tillingMode}`);
    }
  }
});
</script>

<template>
  <div class="tilling">
    <Select
      v-model="value"
      :options="options"
      @change="onChanged"
    />
  </div>
</template>

<style scoped lang="scss">
.tilling {}
</style>