<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

import Source from '@/components/Source.vue';
import SourceDetail from '@/components/SourceDetail.vue';

import { ModalHelper } from '@/utils/helpers/modal.helper';
import { PageType } from '@/utils/enums/pageType.enum';

export default defineComponent({
  computed: {
    ...mapState(useSourcesStore, ['sources'])
  },

  methods: {
    ...mapActions(useSourcesStore, ['removeSource', 'editSource', 'getSource']),

    /**
     * @description
     * Removes a source
     *
     * @param id The ID of the source to remove
     */
    onRemove(id: string) {
      this.removeSource(id);
    },

    /**
     * @description
     * Edits a source
     *
     * @param id The ID of the source to edit
     */
    onEdit(id: string) {
      const source = this.getSource(id);

      ModalHelper
        .open('Edit Source', SourceDetail, { type: PageType.Edition, source: { ...source } })
        .then(modal => {
          if (modal.payload) {
            this.editSource(modal.payload);
          }
        });
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
        @edit="onEdit"
        @remove="onRemove"
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