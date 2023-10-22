<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { TOption } from '@/utils/types/composition/option.type';

export default defineComponent({
  emits: ['update:modelValue', 'changed'],

  props: {
    options: {
      default: () => [],
      type: Array as PropType<Array<TOption>>
    },
    modelValue: String,
    placeholder: String
  },

  methods: {

    /**
     * @description
     * Handles model update
     *
     * @param e The event object
     */
    onChanged(e: Event): void {
      const target = e.target as HTMLSelectElement;
      const value = target.value ?? '';

      this.$emit('changed', value);
      this.$emit('update:modelValue', value);
    }
  }
});
</script>

<template>
  <select
    class="select"
    :value="modelValue"
    @change="onChanged"
  >
    <option
      value=""
      v-if="placeholder"
      class="select__option select__option--default"
    >
      {{ placeholder }}
    </option>

    <option
      :key="index"
      :value="option.value"
      class="select__option"
      v-for="(option, index) in options"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped lang="scss">
@use '@/style/mixins/selectable';

.select {
  font-size: 14px;
  color: var(--color-primary);
  font-family: var(--font-primary);

  width: 100%;
  height: 38px;
  padding: 0 10px;

  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid transparent;
  background-color: hsl(var(--color-secondary-hsl), 86%);

  transition-duration: 0.2s;
  transition-property: background-color;

  @extend %selectable;
}
</style>