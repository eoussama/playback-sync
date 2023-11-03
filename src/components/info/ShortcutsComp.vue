<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({})
</script>

<template>
  <div class="shortcuts">
    <div class="shortcut">
      <kbd>ESC</kbd> Close Modals
    </div>

    <div class="shortcut">
      <kbd>Space</kbd> Toggle Play
    </div>

    <div class="shortcut">
      <kbd>N</kbd> Add Source
    </div>

    <div class="shortcut">
      <kbd>K</kbd> Display Shortcut Sheet
    </div>

    <div class="shortcut">
      <kbd>F</kbd> Toggle Fullscreen
    </div>

    <div class="shortcut">
      <kbd>M</kbd> Toggle Mute
    </div>

    <div class="shortcut">
      <kbd>←</kbd> Seek Backward
    </div>

    <div class="shortcut">
      <kbd>→</kbd> Seek Forward
    </div>

    <div class="shortcut">
      <kbd>↑</kbd> Volume Up
    </div>

    <div class="shortcut">
      <kbd>↓</kbd> Volume Down
    </div>

    <div class="shortcut">
      <kbd>+</kbd> Speed Up
    </div>

    <div class="shortcut">
      <kbd>-</kbd> Speed Down
    </div>
  </div>
</template>

<style scoped lang="scss">
.shortcuts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;

  .shortcut {
    font-size: 14px;
    font-family: var(--font-primary);
    font-weight: var(--font-weight-regular);

    kbd {
      margin-right: 5px;
      color: hsl(var(--color-secondary-hsl), 60%);

      font-size: 14px;
      padding: 2px 6px;
      background-color: var(--color-secondary);

      border-radius: 4px;
      border-bottom: 2px solid hsl(var(--color-secondary-hsl), 80%);
    }
  }
}
</style>