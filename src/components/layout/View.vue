<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

import Source from '@/components/source/Source.vue';
import SourceDetail from '@/components/source/SourceDetail.vue';

import { PageType } from '@/utils/enums/pageType.enum';
import { ModalHelper } from '@/utils/helpers/modal.helper';

export default defineComponent({

  computed: {
    ...mapState(useSourcesStore, ['sources', 'tilling']),

    /**
     * @description
     * The grid columns template
     */
    gridTemplateColumns(): string {
      return `repeat(${this.tilling}, 1fr)`;
    }
  },

  methods: {
    ...mapActions(useSourcesStore, [
      'getSource',
      'setPlaying',
      'updateSource',
      'removeSource',
      'switchSources',
      'toggleSourcePin'
    ]),

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
            this.updateSource(modal.payload);
          }
        });
    },

    /**
     * @description
     * Pins a source
     *
     * @param id The ID of the source to pin
     */
    onPin(id: string): void {
      this.toggleSourcePin(id, true);
    },

    /**
     * @description
     * Unpins a source
     *
     * @param id The ID of the source to unpin
     */
    onUnpin(id: string): void {
      this.toggleSourcePin(id, false);
    },

    /**
     * @description
     * Handles dragging
     *
     * @param id The ID of the source to drag
     * @param e The drag event object
     */
    onDrag(id: string, e: DragEvent): void {
      e.dataTransfer?.setData('sourceId', id);
    },

    /**
     * @description
     * Handles dropping
     *
     * @param id The ID of the source to drop on
     * @param e The Drop event object
     */
    onDrop(id: string, e: DragEvent): void {
      const sourceId = e.dataTransfer?.getData('sourceId');

      if (sourceId && id !== sourceId) {
        this.switchSources(sourceId, id);
      }

      e.dataTransfer?.clearData();
      this.setPlaying(false);
    },

    /**
     * @description
     * Checks the drag permission
     *
     * @param id The ID of the source drag on
     * @param e The drag event object
     */
    onDragOver(id: string, e: DragEvent): void {
      const source = this.getSource(id);

      if (!source.pinned) {
        e.preventDefault();
      }
    }
  }
});
</script>

<template>
  <div class="view">
    <div
      class="sources"
      :style="{ gridTemplateColumns }"
    >
      <div
        v-for="source in sources"
        class="source"
        :draggable="!source.pinned"
        @drop="e => onDrop(source.id, e)"
        @dragstart="e => onDrag(source.id, e)"
        @dragover="e => onDragOver(source.id, e)"
      >
        <Source
          :source="source"
          @pin="onPin"
          @edit="onEdit"
          @unpin="onUnpin"
          @remove="onRemove"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view {
  flex: 1;
  height: 100%;

  .sources {
    display: grid;
  }
}
</style>