<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';

import { useAppStore } from '@/state/stores/app.store';

export default defineComponent({

  computed: {
    ...mapState(useAppStore, ['fullscreen']),
  },
});
</script>

<template>
  <div
    class="body"
    :class="{ 'body--fullscreen': fullscreen }"
  >
    <ViewComp />
    <ControlsComp />
  </div>
</template>

<style scoped lang="scss">
.body {
  flex: 1;
  display: flex;
  flex-direction: column;

  &--fullscreen {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }
}
</style>