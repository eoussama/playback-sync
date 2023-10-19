<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  emits: ['update:modelValue'],

  props: {
    min: Number,
    label: String,
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  methods: {

    /**
     * @description
     * Handles model update
     *
     * @param e The event obejct
     */
    onInput(e: Event): void {
      const target = e.target as HTMLInputElement;
      const value = target.value ?? '';

      this.$emit('update:modelValue', value);
    }
  }
});
</script>

<template>
  <div class="input">
    <label class="input__wrapper">
      <div
        v-if="label"
        class="input__label"
      >{{ label }}</div>

      <input
        :min="min"
        :type="type"
        :value="modelValue"
        class="input__input"
        :placeholder="placeholder"
        @input="onInput"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
.input {
  &__wrapper {}

  &__label {}

  &__input {}
}
</style>