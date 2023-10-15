<script lang="ts">
import { defineComponent } from 'vue';
import { SourceHelper } from '@/utils/helpers/source.helper';
import type { TSourceDetailType } from '@/utils/types/components/sourceDetail.type';

export default defineComponent({

  data: (): TSourceDetailType => ({
    source: null,
    previewLoaded: false
  }),

  methods: {

    /**
     * @description
     * Initializes the source form
     */
    async initForm(): Promise<void> {
      this.source = this.source ?? await SourceHelper.init();
    },

    /**
     * @description
     * Handles start update
     *
     * @param start The start value
     */
    onStartChanged(start: number): void {
      if (this.source) {
        this.source.metadata.start = start;
      }
    },

    /**
     * @description
     * Handles end update
     *
     * @param end The end value
     */
    onEndChanged(end: number): void {
      if (this.source) {
        this.source.metadata.end = end;
      }
    }
  },

  watch: {
    previewUrl(): void {
      const player = document.getElementById(this.previewPlayerId) as HTMLVideoElement;

      if (player) {
        player.load();
      }
    },

    'source.url'(): void {
      const player = document.getElementById(this.previewPlayerId) as HTMLVideoElement;

      if (player) {
        player.onloadedmetadata = () => {
          if (this.source && !this.previewLoaded) {
            this.source.metadata.start = player.currentTime;
            this.source.metadata.end = player.duration;
            this.source.metadata.duration = player.duration;
          }

          this.previewLoaded = player.readyState > 0;
        }

        this.previewLoaded = false;
        player.load();
      }
    }
  },

  computed: {

    /**
     * @description
     * The preview player's ID on the DOM
     */
    previewPlayerId(): string {
      return `preview-player-${this.source?.id}`;
    },

    /**
     * @description
     * The view source link
     */
    previewUrl(): string {
      return `${this.source?.url}#t=${this.source?.metadata?.start},${this.source?.metadata?.end}`;
    }
  },

  created() {
    this.initForm();
  }
});
</script>

<template>
  <div
    v-if="source"
    class="source"
  >
    {{ previewUrl }}
    <div class="source__form">
      <Input
        type="text"
        label="Source Title"
        v-model="source.title"
        placeholder="Enter a title for the source"
      />

      <Input
        type="text"
        label="Source URL"
        v-model="source.url"
        placeholder="Enter the URL of the source"
      />

      <div
        class="source__preview"
        :class="{ 'source__preview--show': previewLoaded }"
      >
        <video
          controls
          :id="previewPlayerId"
          class="source__player"
        >
          <source
            type="video/mp4"
            :src="previewUrl"
          >
        </video>

      </div>

      <Range
        :min="0"
        :start="source.metadata.start"
        :end="source.metadata.end"
        :max="source.metadata.duration"
        :disabled="!previewLoaded"
        @endChanged="onEndChanged"
        @startChanged="onStartChanged"
      />

    </div>

    <div class="source__controls">
      <Button
        label="Reset"
        type="outline"
      />

      <Button
        label="Add"
        icon="check"
        type="primary"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.source {
  padding: 50px;

  &__preview {
    height: 450px;
    width: 600px;

    visibility: hidden;

    &--show {
      visibility: visible;
    }
  }

  &__player {
    display: block;

    width: 100%;
    height: 100%;
  }

  &__controls {}
}
</style>