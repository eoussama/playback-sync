<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],

  props: {
    options: {
      default: [],
      type: Object as () => Array<string>
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
      :value="option"
      class="select__option"
      v-for="option in options"
    >
      x{{ option }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.select {}
</style>