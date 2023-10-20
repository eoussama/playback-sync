<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<template>
  <div class="head">
    <TillingComp />
  </div>
</template>

<style scoped lang="scss">
.head {
  padding: 10px;
  max-height: 50px;

  box-sizing: border-box;
  background-color: hsl(var(--color-secondary-hsl), 92%);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
}
</style>