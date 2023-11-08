<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { mapState } from 'pinia';

import { useAppStore } from '@/state/stores/app.store';

import { Theme } from '@/utils/enums/theme.enum';
import type { TOption } from '@/utils/types/composition/option.type';

export default defineComponent({
  emits: ['update:modelValue', 'changed'],

  props: {
    placeholder: String,
    modelValue: [String, Number],
    options: {
      default: () => [],
      type: Array as PropType<Array<TOption>>
    }
  },

  computed: {
    ...mapState(useAppStore, ['theme']),

    /**
     * @description
     * Checks if dark theme is on
     */
    isDark(): boolean {
      return this.theme === Theme.Dark;
    }
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
  <div
    class="select-wrapper"
    :class="{ 'select-wrapper--dark': isDark }"
  >
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

    <div class="select-icon">
      <font-awesome-icon icon="chevron-down" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/mixins/selectable';


.select-wrapper {
  width: 100%;
  position: relative;

  .select {
    display: block;

    font-size: 14px;
    text-align: center;
    color: var(--color-primary);
    font-family: var(--font-family-primary);

    width: 100%;
    height: 38px;
    padding: 0 30px 0 10px;

    appearance: none;

    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid transparent;
    background-color: hsl(var(--color-secondary-hsl), 86%);

    transition-duration: 0.2s;
    transition-property: background-color outline;

    @extend %focusable;
    @extend %selectable;
  }

  .select-icon {
    pointer-events: none;

    position: absolute;
    top: 50%;
    right: 11px;
    transform: translateY(-50%);

    font-size: 12px;
  }

  &--dark {
    .select {
      background-color: hsl(var(--color-secondary-hsl), 40%);
    }
  }
}
</style>