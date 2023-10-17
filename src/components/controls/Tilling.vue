<script lang="ts">
import { defineComponent } from 'vue';
import { TillingValue } from '@/utils/enums/tillingValue.enum';

export default defineComponent({

  data: () => ({
    value: TillingValue.Fill,
    options: [
      { label: 'Fill', value: TillingValue.Fill },
      { label: 'Split', value: TillingValue.Split },
      { label: 'Custom', value: TillingValue.Custom }
    ]
  })
});
</script>

<template>
  <div class="tilling">
    <Select
      v-model="value"
      :options="options"
    />
  </div>
</template>

<style scoped lang="scss">
.tilling {}
</style>