<script lang="ts">
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import TillingCustom from "@/components/tilling/TillingCustom.vue";

import { useSourcesStore } from "@/state/stores/sources.store";
import { TillingValue } from "@/utils/enums/tillingValue.enum";
import { ModalHelper } from "@/utils/helpers/modal.helper";



export default defineComponent({

  data: () => ({
    options: [
      { label: "Fill", value: TillingValue.Fill },
      { label: "Split", value: TillingValue.Split },
      { label: "Custom", value: TillingValue.Custom },
    ],
  }),

  computed: {
    ...mapState(useSourcesStore, ["tilling"]),

    /**
     * @description
     * The value of the dropdown
     */
    value(): TillingValue {
      return Math.min(this.tilling, TillingValue.Custom);
    },
  },

  methods: {
    ...mapActions(useSourcesStore, ["setTilling"]),

    /**
     * @description
     * Handles value change
     *
     * @param e The changed value
     */
    async onChanged(e: number): Promise<void> {
      let changedValue = Number.parseInt(e?.toString());

      if (changedValue === TillingValue.Custom) {
        const customValue = await ModalHelper.open("Custom Tilling", null, TillingCustom, { tilling: this.tilling });

        changedValue = (customValue.payload as { value: number } | undefined)?.value ?? this.value;
      }

      this.setTilling(changedValue);
    },
  },
});
</script>

<template>
  <div class="tilling">
    <SelectComp
      :options="options"
      :model-value="value"
      @changed="onChanged"
    />
  </div>
</template>
