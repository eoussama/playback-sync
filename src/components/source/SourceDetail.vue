<script lang="ts">
import type { PropType } from "vue";

import type { TSourceDetailType } from "@/utils/types/components/sourceDetail.type";

import type { TSource } from "@/utils/types/composition/source.type";
import { defineComponent, ref } from "vue";
import { useAppStore } from "@/state/stores/app.store";
import { InputMode } from "@/utils/enums/inputMode.enum";

import { PageType } from "@/utils/enums/pageType.enum";
import { ReadyState } from "@/utils/enums/readyState.enum";
import { Validation } from "@/utils/enums/validation.enum";
import { DOMHelper } from "@/utils/helpers/dom.helper";
import { ModalHelper } from "@/utils/helpers/modal.helper";
import { SourceHelper } from "@/utils/helpers/source.helper";
import { TimeHelper } from "@/utils/helpers/time.helper";
import { ValidationHelper } from "@/utils/helpers/validation.helper";



export default defineComponent({

  props: {
    modalId: String,
    params: Object as PropType<{ type: PageType; source: TSource }>,
  },

  setup() {
    const elementRef = ref(null);

    return { elementRef, InputMode };
  },

  data: (): TSourceDetailType => ({
    source: null,
    loading: false,
    submitted: false,
    initialized: false,
    previewLoaded: false,
    inputMode: InputMode.URL,
    localFile: null,
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
     * The view source link
     *
     * @returns The preview URL string
     */
    previewUrl(): string {
      return `${this.source?.url}#t=${this.source?.metadata?.start},${this.source?.metadata?.end}`;
    },

    /**
     * @description
     * Checks if the loader should be forced into activation
     *
     * @returns Whether the loader should be forced active
     */
    forceLoad(): boolean {
      return Boolean(!this.previewLoaded && this.source && this.source.url.length > 0);
    },

    /**
     * @description
     * The placeholder of the title input
     *
     * @returns The title validation error string
     */
    titleError(): string {
      const source = (this.source ?? {}) as Partial<TSource>;
      const error = ValidationHelper.isInvalid("title", source.title);

      return ValidationHelper.getErrorMessage(error);
    },

    /**
     * @description
     * The placeholder of the URL input
     *
     * @returns The URL validation error string
     */
    urlError(): string {
      if (this.inputMode === InputMode.File) {
        return "";
      }

      const source = (this.source ?? {}) as Partial<TSource>;
      const error = ValidationHelper.isInvalid("url", source.url);

      return error !== false
        ? ValidationHelper.getErrorMessage(error)
        : !this.previewLoaded
            ? ValidationHelper.getErrorMessage(Validation.URLInvalid)
            : "";
    },

    /**
     * @description
     * The error message for the file picker
     *
     * @returns The file validation error string
     */
    fileError(): string {
      return this.localFile == null
        ? ValidationHelper.getErrorMessage(Validation.FileEmpty)
        : "";
    },

    /**
     * @description
     * The display name of the selected local file
     *
     * @returns The file name string or empty string
     */
    localFileName(): string {
      return this.localFile?.name ?? "";
    },

    /**
     * @description
     * Whether the previewed source has been identified as audio-only
     *
     * @returns Whether the source is audio-only
     */
    isAudioSource(): boolean {
      return this.source?.isAudio ?? false;
    },

    /**
     * @description
     * The label for the source type badge
     *
     * @returns The source type label string
     */
    sourceTypeBadgeLabel(): string {
      return this.isAudioSource ? "Audio" : "Video";
    },

    /**
     * @description
     * The icon for the source type badge
     *
     * @returns The source type badge icon name
     */
    sourceTypeBadgeIcon(): string {
      return this.isAudioSource ? "music" : "video";
    },

    /**
     * @description
     * Whether the source type badge should be shown
     *
     * @returns Whether the type badge is visible
     */
    showTypeBadge(): boolean {
      return this.previewLoaded && Boolean(this.source?.url);
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

          // Detect audio-only sources: no video dimensions means audio-only
          if (this.source && this.inputMode !== InputMode.File) {
            this.source.isAudio = !player.error
              && player.videoWidth === 0
              && player.videoHeight === 0
              && !Number.isNaN(player.duration);
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
     * @param value The value to format
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
      if (this.inputMode === InputMode.File) {
        return this.isInputValid("title") && this.localFile != null && this.previewLoaded;
      }

      return this.isInputValid("title") && this.isInputValid("url") && (this.previewLoaded && !this.forceLoad);
    },

    /**
     * @description
     * Checks if an input is valid
     *
     * @param input The name of the input
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
     * @param input The name of the input to show the error for
     * @returns Whether the validation error should be shown
     */
    canShowError(input: keyof TSource): boolean {
      if (input === "url") {
        if (this.inputMode === InputMode.File) {
          return false;
        }

        return (!this.isInputValid(input) || !this.previewLoaded) && this.submitted;
      }
      else {
        return !this.isInputValid(input) && this.submitted;
      }
    },

    /**
     * @description
     * Whether the file picker error should be shown
     *
     * @returns Whether the file error should be shown
     */
    canShowFileError(): boolean {
      return this.inputMode === InputMode.File && this.localFile == null && this.submitted;
    },

    /**
     * @description
     * Switches the input mode between URL and local file
     *
     * @param mode The mode to switch to
     * @returns A promise that resolves when the mode is switched
     */
    async setMode(mode: InputMode): Promise<void> {
      if (this.inputMode === mode) {
        return;
      }

      this.inputMode = mode;
      this.submitted = false;
      this.previewLoaded = false;
      this.initialized = false;

      this.revokeBlobUrl();
      this.localFile = null;

      if (this.source) {
        this.source.url = "";
      }
    },

    /**
     * @description
     * Handles local file selection from the file picker
     *
     * @param event The file input change event
     */
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (!file || !this.source) {
        return;
      }

      this.revokeBlobUrl();

      this.localFile = file;
      this.source.url = URL.createObjectURL(file);
      this.source.isAudio = file.type.startsWith("audio/");

      if (!this.source.title) {
        this.source.title = file.name.replace(/\.[^/.]+$/, "");
      }
    },

    /**
     * @description
     * Triggers the hidden file input
     */
    openFilePicker(): void {
      const fileInput = this.$refs.fileInput as HTMLInputElement;

      if (fileInput) {
        fileInput.click();
      }
    },

    /**
     * @description
     * Revokes any active blob URL to free memory
     */
    revokeBlobUrl(): void {
      if (this.source?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(this.source.url);
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
      this.revokeBlobUrl();
      this.localFile = null;
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

      <div class="source__mode">
        <button
          class="source__mode-btn"
          :class="{ 'source__mode-btn--active': inputMode === InputMode.URL }"
          type="button"
          @click="setMode(InputMode.URL)"
        >
          <font-awesome-icon icon="link" />
          Link
        </button>

        <button
          class="source__mode-btn"
          :class="{ 'source__mode-btn--active': inputMode === InputMode.File }"
          type="button"
          @click="setMode(InputMode.File)"
        >
          <font-awesome-icon icon="folder-open" />
          Local File
        </button>
      </div>

      <div
        v-if="inputMode === InputMode.URL"
        class="source__input"
      >
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
        v-else-if="inputMode === InputMode.File"
        class="source__input"
      >
        <div
          class="source__file"
          :class="{
            'source__file--error': canShowFileError(),
            'source__file--selected': localFile != null,
          }"
          @click="openFilePicker"
        >
          <input
            ref="fileInput"
            type="file"
            accept="video/*, audio/*"
            class="source__file-input"
            @change="onFileSelected"
          >

          <div class="source__file-label">
            <font-awesome-icon
              :icon="localFile ? 'circle-check' : 'upload'"
              class="source__file-icon"
            />
            <span class="source__file-text">
              {{ localFile ? localFileName : "Click to select a video or audio file" }}
            </span>
          </div>
        </div>

        <div
          v-if="canShowFileError()"
          class="source__file-error"
        >
          <font-awesome-icon
            icon="triangle-exclamation"
            class="source__file-error-icon"
          />
          <span class="source__file-error-message">{{ fileError }}</span>
        </div>
      </div>

      <div
        v-show="source.url.length > 0"
        class="source__preview"
      >
        <SourceLoader
          :force-load="forceLoad"
          :is-audio="isAudioSource"
          @load="onLoad"
        >
          <div
            v-if="showTypeBadge"
            class="source__type-badge"
            :class="{ 'source__type-badge--audio': isAudioSource }"
          >
            <font-awesome-icon
              :icon="sourceTypeBadgeIcon"
              class="source__type-badge-icon"
            />
            <span class="source__type-badge-label">{{ sourceTypeBadgeLabel }}</span>
          </div>

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
      </div>

      <div
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
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 auto 15px auto;

      #{$root}__player {
        display: block;

        width: 100%;
        height: 100%;
      }

      #{$root}__type-badge {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 2;

        display: inline-flex;
        align-items: center;
        gap: 5px;

        padding: 3px 8px;
        border-radius: 12px;

        font-size: 11px;
        font-weight: var(--font-weight-regular);
        letter-spacing: 0.03em;
        text-transform: uppercase;

        background-color: rgba(0, 0, 0, 0.55);
        color: #fff;
        backdrop-filter: blur(4px);

        animation-name: badgeFadeIn;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;

        &--audio {
          background-color: rgba(var(--color-accent-rgb, 99, 102, 241), 0.75);
        }

        #{$root}__type-badge-icon {
          font-size: 10px;
          opacity: 0.9;
        }

        @keyframes badgeFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }

  &__mode {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;

    &-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      padding: 6px 14px;
      border-radius: 4px;
      border: 1px solid var(--color-secondary);

      color: var(--color-primary);
      background: transparent;

      font-size: 13px;
      font-family: var(--font-family-primary);
      font-weight: var(--font-weight-light);

      cursor: pointer;
      opacity: 0.6;

      transition-duration: 0.2s;
      transition-property: opacity, border-color, background-color;

      &:hover {
        opacity: 0.85;
      }

      &--active {
        opacity: 1;
        border-color: var(--color-accent, var(--color-secondary));
        background-color: rgba(var(--color-secondary-rgb), 0.12);
        font-weight: var(--font-weight-regular);
      }
    }
  }

  &__file {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 20px;
    border-radius: 4px;
    border: 1px dashed var(--color-secondary);

    cursor: pointer;
    transition-duration: 0.2s;
    transition-property: border-color, background-color;

    &:hover {
      background-color: rgba(var(--color-secondary-rgb), 0.06);
    }

    &-input {
      display: none;
    }

    &-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      pointer-events: none;
    }

    &-icon {
      font-size: 22px;
      opacity: 0.5;
      transition-property: opacity;
      transition-duration: 0.2s;
    }

    &-text {
      font-size: 14px;
      font-weight: var(--font-weight-light);
      color: var(--color-primary);
      opacity: 0.7;
      word-break: break-all;
      text-align: center;
    }

    &-error {
      display: flex;
      align-items: center;

      margin-top: 5px;
      color: var(--color-error);

      animation-name: fadeIn;
      animation-duration: 0.2s;
      animation-fill-mode: forwards;

      &-message {
        font-size: 13px;
        font-weight: var(--font-weight-light);
      }

      &-icon {
        opacity: 0.7;
        margin-right: 5px;
        font-size: 11px;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(4px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    &--selected {
      border-style: solid;

      #{$root}__file-icon {
        opacity: 0.9;
      }

      #{$root}__file-text {
        opacity: 0.9;
      }
    }

    &--error {
      border-color: var(--color-error);
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
