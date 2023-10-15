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
  },

  computed: {

    /**
     * @description
     * The icon to show on the button
     */
    icon(): string {
      if (this.repeat) {
        return 'repeat';
      } else if (this.value) {
        return 'pause';
      } else {
        return 'play'
      }
    }
  }
});
</script>

<template>
  <Button
    :icon="icon"
    type="radial"
    @click="onClick"
  />
</template>

<style scoped lang="scss"></style>