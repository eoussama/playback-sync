<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    isEmpty: Boolean
  }
})
</script>

<template>
  <div class="empty">
    <div
      v-if="isEmpty"
      class="empty__positive"
    >
      No Sources
    </div>

    <div
      v-else
      class="empty__negative"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty {
  display: flex;

  width: 100%;
  height: 100%;
}
</style>