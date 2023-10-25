<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { PageType } from '@/utils/enums/pageType.enum';
import { ReadyState } from '@/utils/enums/readyState.enum';

import { TimeHelper } from '@/utils/helpers/time.helper';
import { ModalHelper } from '@/utils/helpers/modal.helper';
import { SourceHelper } from '@/utils/helpers/source.helper';

import type { TSource } from '@/utils/types/composition/source.type';
import type { TSourceDetailType } from '@/utils/types/components/sourceDetail.type';

export default defineComponent({

  data: (): TSourceDetailType => ({
    source: null,
    previewLoaded: false
  }),

  props: {
    modalId: String,
    params: Object as PropType<{ type: PageType, source: TSource }>
  },

  methods: {

    /**
     * @description
     * Initializes the source form
     */
    async initForm(): Promise<void> {
      if (this.params) {
        if (this.params.type === PageType.Creation) {
          this.source = await SourceHelper.init();
        } else {
          this.source = this.params.source;
        }
      }
    },

    /**
     * @description
     * Formats value as time stamp
     *
     * @param value The value to format
     */
    valueFormater(value: number): string {
      return TimeHelper.secondsToTime(value);
    },

    /**
     * @description
     * Checks if the form is valid
     */
    isFormValid(): boolean {
      return (this.source?.title?.length ?? 0) > 0 && (this.source?.url?.length ?? 0) > 0;
    },

    /**
     * @description
     * Resets the form
     */
    async onClear(): Promise<void> {
      this.source = await SourceHelper.reset(this.source?.id ?? '');
    },

    /**
     * @description
     * Returns the source
     */
    async onValidate(): Promise<void> {
      if (this.isFormValid()) {
        if (this.modalId) {
          ModalHelper.close(this.modalId, this.source);
        }
      }
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

          this.previewLoaded = player.readyState > ReadyState.HaveNothing;
        }

        this.previewLoaded = false;
        player.load();
      }
    }
  },

  computed: {

    /**
     * @description
     * The label to display on the validation button
     */
    validateLabel(): string {
      return this.params?.type === PageType.Creation ? 'Add' : 'Edit';
    },

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
    <div class="source__form">
      <div class="source__input">
        <InputComp
          type="text"
          label="Source Title"
          v-model="source.title"
          placeholder="Enter a title for the source"
        />
      </div>

      <div class="source__input">
        <InputComp
          type="text"
          label="Source URL"
          v-model="source.url"
          placeholder="Enter the URL of the source"
        />
      </div>

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

      <div class="source__crop">
        <RangeComp
          :min="0"
          :start="source.metadata?.start"
          :end="source.metadata?.end"
          :max="source.metadata?.duration"
          :disabled="!previewLoaded"
          :valueFormater="valueFormater"
          @endChanged="onEndChanged"
          @startChanged="onStartChanged"
        />
      </div>

    </div>

    <div class="source__controls">
      <div class="source__clear">
        <ButtonComp
          label="Clear"
          type="outline"
          @click="onClear"
        />
      </div>

      <div class="source__resolve">
        <ButtonComp
          icon="check"
          type="primary"
          :label="validateLabel"
          @click="onValidate"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.source {
  $root: &;

  &__form {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(var(--color-secondary-rgb), 0.5);

    #{$root}__input {
      margin-bottom: 15px;
    }

    #{$root}__preview {
      height: 450px;
      width: 600px;
      margin-bottom: 15px;

      visibility: hidden;

      #{$root}__player {
        display: block;

        width: 100%;
        height: 100%;
      }

      &--show {
        visibility: visible;
      }
    }
  }

  &__controls {
    display: flex;
    align-content: center;
    justify-content: flex-end;

    #{$root}__clear {
      margin-right: 12px;
    }
  }
}
</style>