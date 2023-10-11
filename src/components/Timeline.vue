<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({

});
</script>

<template>
  <div class="timeline">
    <div class="timeline__track">
      <input
        min="0"
        max="100"
        value="80"
        type="range"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  &__track {
    input {
      width: 100%;
    }
  }
}
</style>