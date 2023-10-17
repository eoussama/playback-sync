<script lang="ts">
import { defineComponent } from 'vue';
import type { TOption } from '@/utils/types/composition/option.type';

export default defineComponent({
  emits: ['update:modelValue'],

  props: {
    options: {
      default: [],
      type: Object as () => Array<TOption>
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

      this.$emit('update:modelValue', value);
    }
  }
});
</script>

<template>
  <select class="select">
    <option
      value=""
      v-if="placeholder"
      class="select__option select__option--default"
    >
      {{ placeholder }}
    </option>

    <option
      :value="option.value"
      class="select__option"
      v-for="option in options"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.select {}
</style>