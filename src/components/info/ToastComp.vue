<script lang="ts">
import type { PropType } from "vue";
import type { Theme } from "@/utils/enums/theme.enum";

import type { TToast } from "@/utils/types/composition/toast.type";
import { mapState } from "pinia";
import { defineComponent, ref } from "vue";

import { useAppStore } from "@/state/stores/app.store";

import { DOMHelper } from "@/utils/helpers/dom.helper";
import { ModalHelper } from "@/utils/helpers/modal.helper";

import { ThemeHelper } from "@/utils/helpers/theme.helper";



export default defineComponent({

  props: {
    modalId: String,
    params: Object as PropType<TToast>,
  },

  setup() {
    const elementRef = ref(null);
    const timer = ref<ReturnType<typeof setTimeout> | null>(null);

    return { elementRef, timer };
  },

  computed: {
    ...mapState(useAppStore, ["theme"]),

    /**
     * @description
     * Checks if dark theme is on
     *
     * @returns Whether the dark theme is active
     */
    isDark(): boolean {
      return ThemeHelper.isDark(this.theme as Theme);
    },

    /**
     * @description
     * Close button type
     *
     * @returns The button type string
     */
    closeType(): string {
      return this.isDark ? "plain" : "secondary";
    },
  },

  mounted(): void {
    const { elementRef } = this.$refs;

    DOMHelper.focus(".toast__action button", elementRef as HTMLElement);

    this.timer = setTimeout(() => {
      this.onClose();
    }, 3000);
  },

  beforeUnmount(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
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
