<script lang="ts">
import type { PropType } from "vue";

import type { TSourceDetailType } from "@/utils/types/components/sourceDetail.type";

import type { TSource } from "@/utils/types/composition/source.type";
import { defineComponent, ref } from "vue";
import { useAppStore } from "@/state/stores/app.store";
import { PageType } from "@/utils/enums/pageType.enum";

import { ReadyState } from "@/utils/enums/readyState.enum";
import { SourceType } from "@/utils/enums/sourceType.enum";
import { Validation } from "@/utils/enums/validation.enum";
import { DOMHelper } from "@/utils/helpers/dom.helper";
import { ModalHelper } from "@/utils/helpers/modal.helper";
import { SourceHelper } from "@/utils/helpers/source.helper";

import { TimeHelper } from "@/utils/helpers/time.helper";
import { UrlHelper } from "@/utils/helpers/url.helper";
import { ValidationHelper } from "@/utils/helpers/validation.helper";



export default defineComponent({

  props: {
    modalId: String,
    params: Object as PropType<{ type: PageType; source: TSource }>,
  },

  setup() {
    const elementRef = ref(null);

    return { elementRef };
  },

  data: (): TSourceDetailType => ({
    source: null,
    loading: false,
    submitted: false,
    initialized: false,
    previewLoaded: false,
  }),

  computed: {

    /**
     * @description
     * The label to display on the validation button
     *
     * @returns The validation button label string
     */
    validateLabel(): string {
      return this.params?.type === PageType.Creation ? "Add" : "Edit";
    },

    /**
     * @description
     * The preview player's ID on the DOM
     *
     * @returns The preview player element ID string
     */
    previewPlayerId(): string {
      return `preview-player-${this.source?.id}`;
    },

    /**
     * @description
     * The view source link (native video only)
     *
     * @returns The preview URL string
     */
    previewUrl(): string {
      return `${this.source?.url}#t=${this.source?.metadata?.start},${this.source?.metadata?.end}`;
    },

    /**
     * @description
     * The detected source type based on the URL
     *
     * @returns The SourceType enum value
     */
    sourceType(): SourceType {
      return UrlHelper.getType(this.source?.url ?? "");
    },

    /**
     * @description
     * Whether the source is a native video file
     *
     * @returns Whether the source is native
     */
    isNativeSource(): boolean {
      return this.sourceType === SourceType.Native;
    },

    /**
     * @description
     * The embed video ID extracted from the URL
     *
     * @returns The embed ID string or empty string
     */
    embedId(): string {
      return UrlHelper.getEmbedId(this.source?.url ?? "") ?? "";
    },

    /**
     * @description
     * The embed preview iframe URL
     *
     * @returns The embed preview URL string
     */
    previewEmbedUrl(): string {
      if (this.sourceType === SourceType.YouTube) {
        return `https://www.youtube-nocookie.com/embed/${this.embedId}`;
      }

      if (this.sourceType === SourceType.Vimeo) {
        return `https://player.vimeo.com/video/${this.embedId}`;
      }

      return "";
    },

    /**
     * @description
     * Checks if the loader should be forced into activation.
     * Only applicable to native video sources.
     *
     * @returns Whether the loader should be forced active
     */
    forceLoad(): boolean {
      if (!this.isNativeSource) {
        return false;
      }

      return Boolean(!this.previewLoaded && this.source && this.source.url.length > 0);
    },

    /**
     * @description
     * The title validation error string
     *
     * @returns The title validation error message
     */
    titleError(): string {
      const source = (this.source ?? {}) as Partial<TSource>;
      const error = ValidationHelper.isInvalid("title", source.title);

      return ValidationHelper.getErrorMessage(error);
    },

    /**
     * @description
     * The URL validation error string
     *
     * @returns The URL validation error message
     */
    urlError(): string {
      const source = (this.source ?? {}) as Partial<TSource>;
      const error = ValidationHelper.isInvalid("url", source.url);

      if (error !== false) {
        return ValidationHelper.getErrorMessage(error);
      }

      if (!this.isNativeSource) {
        return this.previewLoaded
          ? ""
          : ValidationHelper.getErrorMessage(Validation.URLInvalid);
      }

      return !this.previewLoaded
        ? ValidationHelper.getErrorMessage(Validation.URLInvalid)
        : "";
    },
  },

  watch: {
    source(): void {
      setTimeout(() => {
        const { elementRef } = this.$refs;

        DOMHelper.focus("input", elementRef as HTMLElement);
      });
    },

    "source.url": function (): void {
      if (!this.source) {
        return;
      }

      const sourceType = UrlHelper.getType(this.source.url);

      // For embedded URLs: validate by extracting the embed ID
      if (sourceType !== SourceType.Native) {
        const embedId = UrlHelper.getEmbedId(this.source.url);

        this.previewLoaded = Boolean(embedId);
        this.initialized = true;

        return;
      }

      // Native video: use the video element to load metadata
      const player = document.getElementById(this.previewPlayerId) as HTMLVideoElement;

      if (player) {
        player.onloadedmetadata = () => {
          if (this.source && !this.previewLoaded && !this.initialized) {
            if (this.params?.type === PageType.Creation) {
              this.source.metadata.start = 0;
              this.source.metadata.end = player.duration;
            }

            this.source.metadata.duration = player.duration;
          }

          this.initialized = true;
          this.previewLoaded = player.readyState > ReadyState.HaveNothing;
        };

        this.previewLoaded = false;
        player.load();
      }
    },
  },

  created() {
    this.initForm();
    useAppStore().$onAction(({ name, after }) => {
      after(() => {
        if (name === "onValidate") {
          this.onValidate();
        }
      });
    });
  },

  methods: {

    /**
     * @description
     * Initializes the source form
     *
     * @returns A promise that resolves when the form is initialized
     */
    async initForm(): Promise<void> {
      if (this.params) {
        if (this.params.type === PageType.Creation) {
          this.source = await SourceHelper.init();
        }
        else {
          this.source = this.params.source;
        }
      }
    },

    /**
     * @description
     * Formats value as time stamp
     *
     * @param value The numeric value to format
     * @returns The formatted time string
     */
    valueFormater(value: number): string {
      return TimeHelper.secondsToTime(value);
    },

    /**
     * @description
     * Checks if the form is valid
     *
     * @returns Whether the form is valid
     */
    isFormValid(): boolean {
      return this.isInputValid("title") && this.isInputValid("url") && (this.previewLoaded && !this.forceLoad);
    },

    /**
     * @description
     * Checks if an input is valid
     *
     * @param input The name of the input field to validate
     * @returns Whether the input is valid
     */
    isInputValid(input: keyof TSource): boolean {
      const source = (this.source ?? {}) as Partial<TSource>;

      return !ValidationHelper.isInvalid(input, source[input]);
    },

    /**
     * @description
     * Checks if the validation error can be shown for a specific input
     *
     * @param input The name of the input to check the error for
     * @returns Whether the validation error should be shown
     */
    canShowError(input: keyof TSource): boolean {
      if (input === "url") {
        return (!this.isInputValid(input) || !this.previewLoaded) && this.submitted;
      }
      else {
        return !this.isInputValid(input) && this.submitted;
      }
    },

    /**
     * @description
     * Resets the form
     *
     * @returns A promise that resolves when the form is cleared
     */
    async onClear(): Promise<void> {
      this.submitted = false;
      this.source = await SourceHelper.reset(this.source?.id ?? "");
    },

    /**
     * @description
     * Returns the source
     *
     * @returns A promise that resolves when validation completes
     */
    async onValidate(): Promise<void> {
      this.submitted = true;

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
     * @param start The start value in seconds
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
     * @param end The end value in seconds
     */
    onEndChanged(end: number): void {
      if (this.source) {
        this.source.metadata.end = end;
      }
    },

    /**
     * @description
     * Updates source loading state
     *
     * @param loading The loading state
     */
    onLoad(loading: boolean): void {
      this.loading = loading;
    },
  },
});
</script>

<template>
  <div
    v-if="source"
    ref="elementRef"
    class="source"
  >
    <div class="source__form">
      <div class="source__input">
        <InputComp
          v-model="source.title"
          type="text"
          label="Source Title"
          :autofocus="true"
          :error="titleError"
          :has-error="canShowError('title')"
          placeholder="Enter a title for the source"
        />
      </div>

      <div class="source__input">
        <InputComp
          v-model="source.url"
          type="text"
          label="Source URL"
          :error="urlError"
          :has-error="canShowError('url')"
          placeholder="Enter the URL of the source"
        />
      </div>

      <div
        v-show="source.url.length > 0"
        class="source__preview"
      >
        <!-- Native video preview -->
        <SourceLoader
          v-if="isNativeSource"
          :force-load="forceLoad"
          @load="onLoad"
        >
          <video
            :id="previewPlayerId"
            :controls="!loading"
            class="source__player"
          >
            <source
              type="video/mp4"
              :src="previewUrl"
            >
          </video>
        </SourceLoader>

        <!-- Embedded preview (YouTube / Vimeo) via iframe -->
        <div
          v-else-if="previewEmbedUrl"
          class="source__embed-preview"
        >
          <iframe
            :src="previewEmbedUrl"
            allowfullscreen
            class="source__player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>

      <!-- Crop range — only shown for native video sources -->
      <div
        v-if="isNativeSource"
        v-show="source.url.length > 0"
        class="source__crop"
      >
        <RangeComp
          :min="0"
          :start="source.metadata?.start"
          :end="source.metadata?.end"
          :max="source.metadata?.duration"
          :disabled="!previewLoaded"
          :value-formater="valueFormater"
          @end-changed="onEndChanged"
          @start-changed="onStartChanged"
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
  width: 620px;
  max-width: 100%;

  &__form {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(var(--color-secondary-rgb), 0.5);

    #{$root}__input {
      margin-bottom: 15px;
    }

    #{$root}__preview {
      width: 100%;
      height: 100%;
      margin: 0 auto 15px auto;

      #{$root}__player {
        display: block;

        width: 100%;
        height: 100%;
      }
    }

    #{$root}__embed-preview {
      width: 100%;
      margin: 0 auto 15px auto;
      aspect-ratio: 16 / 9;

      #{$root}__player {
        display: block;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
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
