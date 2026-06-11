<script lang="ts">
import { mapState } from "pinia";
import { defineComponent, ref } from "vue";


import { useAppStore } from "@/state/stores/app.store";
import { Theme } from "@/utils/enums/theme.enum";



export default defineComponent({

  props: {
    type: {
      type: String,
      default: "plain",
    },
    icon: {
      type: String,
      default: "ellipsis-vertical",
    },
  },

  data: () => ({
    toggled: false,
  }),

  computed: {
    ...mapState(useAppStore, ["theme"]),

    /**
     * @description
     * Checks if dark theme is on
     */
    isDark(): boolean {
      return this.theme === Theme.Dark;
    },
  },

  mounted(): void {
    document.addEventListener("click", (e) => {
      const { elementRef } = this.$refs;

      if (!(elementRef as HTMLDivElement)?.contains(e.target as HTMLElement)) {
        this.close();
      }
    });
  },

  methods: {

    /**
     * @description
     * Toggles false the component
     */
    close(): void {
      if (this.toggled) {
        this.toggled = false;
      }
    },

    /**
     * @description
     * Toggles the elements' visibility
     */
    onToggle(): void {
      this.toggled = !this.toggled;
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
    class="more"
    :class="{ 'more--dark': isDark }"
  >
    <div class="more__trigger">
      <ButtonComp
        :icon="icon"
        :type="type"
        @click="onToggle"
      />
    </div>

    <div
      v-if="toggled"
      class="more__elements"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.more {
  $root: &;

  position: relative;

  &__elements {
    z-index: 1;
    display: flex;
    flex-direction: row;

    position: absolute;
    right: 0;
    top: calc(100% + 5px);

    width: auto;
    height: auto;
    padding: 5px;

    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    background-color: hsl(var(--color-primary-hsl), 89%);

    animation-name: fadeIn;
    animation-duration: 0.2s;
    animation-direction: normal;
    animation-fill-mode: forwards;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &--dark {
    #{$root}__elements {
      background-color: hsl(var(--color-secondary-hsl), 50%);
    }
  }
}
</style>
