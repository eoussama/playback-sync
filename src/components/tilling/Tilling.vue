<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

import { ModalHelper } from '@/utils/helpers/modal.helper';
import { TillingValue } from '@/utils/enums/tillingValue.enum';
import TillingCustom from '@/components/tilling/TillingCustom.vue';

export default defineComponent({

  data: () => ({
    rawValue: TillingValue.Fill,
    customValue: TillingValue.Custom,
    options: [
      { label: 'Fill', value: TillingValue.Fill },
      { label: 'Split', value: TillingValue.Split },
      { label: 'Custom', value: TillingValue.Custom }
    ]
  }),

  computed: {
    ...mapState(useSourcesStore, ['tilling']),

    /**
     * @description
     * Parsed value
     */
    value(): TillingValue {
      return parseInt(this.rawValue?.toString());
    },

    /**
     * @description
     * The definitive selected tilling mode
     */
    tillingMode(): number {
      return (this.value === TillingValue.Custom && this.customValue !== TillingValue.Custom)
        ? this.customValue
        : this.value;
    }
  },

  methods: {
    ...mapActions(useSourcesStore, ['setTilling']),

    /**
     * @description
     * Handles value change
     */
    async onChanged(): Promise<void> {
      if (this.rawValue == TillingValue.Custom) {
        const value = await ModalHelper.open('Custom Tilling', TillingCustom);
        this.customValue = value.payload?.value ?? this.customValue;
      }

      this.setTilling(this.tillingMode);
    }
  }
});
</script>

<template>
  <div class="tilling">
    <Select
      v-model="rawValue"
      :options="options"
      @change="onChanged"
    />
  </div>
</template>

<style scoped lang="scss">
.tilling {}
</style>