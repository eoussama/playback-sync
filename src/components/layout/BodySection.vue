<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <div class="body">
    <View />
    <Controls />
  </div>
</template>

<style scoped lang="scss">
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>