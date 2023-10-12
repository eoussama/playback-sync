<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

import Source from '@/components/Source.vue';

export default defineComponent({
  computed: {
    ...mapState(useSourcesStore, ['sources'])
  },

  methods: {
    ...mapActions(useSourcesStore, ['removeSource']),

    /**
     * @description
     * Removes a source
     */
    onRemove(id: string) {
      this.removeSource(id);
    }
  },

  components: {
    Source
  }
});
</script>

<template>
  <div class="sources">
    <div
      class="source"
      v-for="source in sources"
    >
      <Source
        :source="source"
        @removed="onRemove"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sources {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>