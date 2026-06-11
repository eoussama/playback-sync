<script lang="ts">
import type { PropType } from "vue";
import type { TToast } from "@/utils/types/composition/toast.type";

import { mapState } from "pinia";
import { defineComponent, ref } from "vue";
import { useAppStore } from "@/state/stores/app.store";

import { Theme } from "@/utils/enums/theme.enum";
import { DOMHelper } from "@/utils/helpers/dom.helper";

import { ModalHelper } from "@/utils/helpers/modal.helper";



export default defineComponent({

  props: {
    modalId: String,
    params: Object as PropType<TToast>,
  },

  computed: {
    ...mapState(useAppStore, ["theme"]),

    /**
     * @description
     * Checks if dark theme is on
     */
    isDark(): boolean {
      return this.theme === Theme.Dark;
    },

    /**
     * @description
     * Close button type
     */
    closeType(): string {
      return this.isDark ? "plain" : "secondary";
    },
  },

  mounted(): void {
    const { elementRef } = this.$refs;

    DOMHelper.focus(".toast__action button", elementRef as HTMLElement);

    setTimeout(() => {
      this.onClose();
    }, 3000);
  },

  methods: {

    /**
     * @description
     * Handles closure
     */
    onClose(): void {
      if (this.modalId) {
        ModalHelper.close(this.modalId, false);
      }
    },
  },

  setup() {
    const elementRef = ref(null);

    return { elementRef };
  },
});
</script>

<template>
  <div
    ref="elementRef"
    class="toast"
    :class="{ 'toast--dark': isDark }"
  >
    <div class="toast__message">
      {{ params?.message }}
    </div>

    <div class="toast__action">
      <div class="toast__close">
        <ButtonComp
          icon="xmark"
          :type="closeType"
          @click="onClose"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toast {
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 400px;
  padding: 15px;

  background: linear-gradient(to right, hsl(var(--color-secondary-hsl), 90%), hsl(var(--color-secondary-hsl), 92%));

  &__message {
    margin-right: 10px;
    color: var(--color-text);

    font-size: 15px;
    font-family: var(--font-primary);
    font-weight: var(--font-weight-regular);
  }

  &__action {
    margin-left: auto;
  }

  &--dark {
    background: linear-gradient(to right, hsl(var(--color-secondary-hsl), 50%), hsl(var(--color-secondary-hsl), 55%));
  }
}
</style>
