<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';

import { Theme } from '@/utils/enums/theme.enum';
import { useAppStore } from '@/state/stores/app.store';

export default defineComponent({
  emits: ['add'],

  props: {
    isEmpty: Boolean
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
     * Emits the addition event
     */
    onAdd(): void {
      this.$emit('add');
    }
  }
})
</script>

<template>
  <div
    class="empty"
    :class="{ 'empty--dark': isDark }"
  >
    <div
      v-if="isEmpty"
      class="empty__positive"
    >
      <div class="dialog">
        <div class="dialog__message">
          Add sources and sync them up
        </div>

        <div class="dialog__actions">
          <ButtonComp
            icon="plus"
            type="primary"
            label="Add Source"
            :autofocus="true"
            @click="onAdd"
          />
        </div>
      </div>
    </div>

    <div
      v-else
      class="empty__negative"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty {
  $root: &;

  display: grid;

  width: 100%;
  height: 100%;

  &__positive {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .dialog {
      margin: 5px;
      padding: 40px;

      border-radius: 5px;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
      background-color: hsl(var(--color-secondary-hsl), 95%);

      width: 350px;
      height: auto;

      &__message {
        color: var(--color-text);

        font-size: 14px;
        text-align: center;
        font-family: var(--font-primary);
      }

      &__actions {
        margin-top: 20px;
        text-align: center;
      }
    }
  }

  &--dark {
    #{$root}__positive {
      .dialog {
        background-color: hsl(var(--color-secondary-hsl), 50%);
      }
    }
  }
}
</style>