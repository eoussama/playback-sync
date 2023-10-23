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
@use '@/style/mixins/selectable';

.input {
  $root: &;

  &__wrapper {
    #{$root}__label {
      margin-bottom: 5px;

      font-size: 14px;
      font-weight: var(--font-weight-light);

      transition-duration: 0.2s;
      transition-property: color;
    }

    #{$root}__input {
      width: 100%;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid var(--color-secondary);

      color: var(--color-primary);
      font-size: 16px;
      font-family: var(--font-family-primary);
      font-weight: var(--font-weight-regular);

      &::placeholder {
        color: hsl(var(--color-secondary-hsl), 80%);
      }

      @extend %focusable;
    }

    &:focus-within {
      #{$root}__label {
        color: hsl(var(--color-secondary-hsl), 60%);
      }
    }
  }
}
</style>