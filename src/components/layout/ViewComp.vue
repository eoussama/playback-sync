<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSourcesStore } from '@/state/stores/sources.store';

import SourceDetail from '@/components/source/SourceDetail.vue';

import { PageType } from '@/utils/enums/pageType.enum';
import { ModalHelper } from '@/utils/helpers/modal.helper';
import type { TSource } from '@/utils/types/composition/source.type';

export default defineComponent({

  computed: {
    ...mapState(useSourcesStore, ['sources', 'tilling']),

    /**
     * @description
     * The grid columns template
     */
    gridTemplateColumns(): string {
      return `repeat(${this.tilling}, 1fr)`;
    },

    /**
     * @description
     * Pinned sources
     */
    pinnedSources(): Array<TSource> {
      return this.sources.filter(source => source.pinned);
    },

    /**
     * @description
     * Unpinned sources
     */
    unpinnedSources(): Array<TSource> {
      return this.sources.filter(source => !source.pinned);
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
      class="sources sources--unpinned"
      :style="{ gridTemplateColumns }"
    >
      <div
        v-for="source in unpinnedSources"
        class="source"
        :key="source.id"
        :draggable="!source.pinned"
        @drop="e => onDrop(source.id, e)"
        @dragstart="e => onDrag(source.id, e)"
        @dragover="e => onDragOver(source.id, e)"
      >
        <SourceComp
          :source="source"
          @pin="onPin"
          @edit="onEdit"
          @remove="onRemove"
        />
      </div>
    </div>

    <div class="sources sources--pinned">
      <div
        v-for="source in pinnedSources"
        class="source"
        :key="source.id"
      >
        <SourceComp
          :source="source"
          @unpin="onUnpin"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view {
  flex: 1;

  overflow: auto;
  box-sizing: border-box;
  max-height: calc(100vh - 208px);

  --dot-size: 2px;
  --dot-space: 22px;
  --dot-bg: #ffffff;
  --dot-color: hsl(var(--color-secondary-hsl), 94%);

  background:
    linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
    linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
    var(--dot-color);

  .sources {
    &--unpinned {
      $gap: 4px;

      height: 100%;
      display: grid;

      padding: $gap;
      row-gap: $gap;
      column-gap: $gap;
    }
  }
}
</style>