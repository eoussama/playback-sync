<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({

  props: {
    value: Boolean
  },

  methods: {

    /**
     * @description
     * Toggle clicked
     */
    onClick(): void {
      this.$emit('valueUpdated');
    }
  }
});
</script>

<template>
  <button @click="onClick">
    <font-awesome-icon
      v-if="value"
      icon="pause"
    />

    <font-awesome-icon
      v-else
      icon="play"
    />
  </button>
</template>

<style scoped lang="scss"></style>