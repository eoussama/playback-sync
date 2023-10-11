<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  props: {
    value: Number,
    duration: Number
  }
});
</script>

<template>
  <div class="timeline">
    <div class="timeline__label">
      {{ value }} / {{ duration }}
    </div>
    <div class="timeline__track">
      <input
        :min="0"
        :value="value"
        :max="duration"
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