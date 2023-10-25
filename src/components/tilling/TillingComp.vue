<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

import { ModalHelper } from '@/utils/helpers/modal.helper';
import { TillingValue } from '@/utils/enums/tillingValue.enum';
import TillingCustom from '@/components/tilling/TillingCustom.vue';

export default defineComponent({

  data: () => ({
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
     * The value of the dropdown
     */
    value(): TillingValue {
      return Math.min(this.tilling, TillingValue.Custom);
    }
  },

  methods: {
    ...mapActions(useSourcesStore, ['setTilling']),

    /**
     * @description
     * Handles value change
     *
     * @param e The changed value
     */
    async onChanged(e: number): Promise<void> {
      let changedValue = parseInt(e?.toString());

      if (changedValue == TillingValue.Custom) {
        const customValue = await ModalHelper.open('Custom Tilling', TillingCustom, { tilling: this.tilling });
        changedValue = customValue.payload?.value ?? this.value;
      }

      this.setTilling(changedValue);
    }
  }
});
</script>

<template>
  <div class="tilling">
    <SelectComp
      :options="options"
      :modelValue="value"
      @changed="onChanged"
    />
  </div>
</template>

<style scoped lang="scss">
.tilling {}
</style>