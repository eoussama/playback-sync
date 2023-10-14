<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    icon: String,
    label: String,
    outline: Boolean,
    primary: Boolean
  }
});
</script>

<template>
  <button
    class="button"
    :class="{ 'button--primary': primary, 'button--outline': outline }"
  >
    <div
      v-if="icon"
      class="button__icon"
    >
      <font-awesome-icon :icon="icon" />
    </div>

    <div
      v-if="label"
      class="button__label"
    >
      {{ label }}
    </div>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__label {}

  &__icon {}
}
</style>