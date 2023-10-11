<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  emits: ['toggled'],

  props: {
    value: Boolean,
    repeat: Boolean
  },

  methods: {

    /**
     * @description
     * Toggle clicked
     */
    onClick(): void {
      this.$emit('toggled');
    }
  }
});
</script>

<template>
  <button @click="onClick">
    <font-awesome-icon
      v-if="repeat"
      icon="repeat"
    />

    <font-awesome-icon
      v-else-if="value"
      icon="pause"
    />

    <font-awesome-icon
      v-else
      icon="play"
    />
  </button>
</template>

<style scoped lang="scss"></style>