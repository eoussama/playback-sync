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
    }
  },

  watch: {
    previewUrl() {
      const player = document.getElementById(this.previewPlayerId) as HTMLVideoElement;

      if (player) {
        player.onloadedmetadata = () => {
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
    {{ source }}
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
        v-show="previewLoaded"
        class="source__preview"
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
    </div>

    <div class="source__control">
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

<style scoped lang="scss"></style>