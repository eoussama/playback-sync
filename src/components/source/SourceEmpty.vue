<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['add'],

  props: {
    isEmpty: Boolean
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
  <div class="empty">
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
}
</style>