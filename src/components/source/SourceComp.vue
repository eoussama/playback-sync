<script lang="ts">
import type { PropType } from "vue";
import type { Theme } from "@/utils/enums/theme.enum";

import type { TSource } from "@/utils/types/composition/source.type";
import { mapState } from "pinia";

import { defineComponent, nextTick, ref } from "vue";

import { useAppStore } from "@/state/stores/app.store";

import { SourceType } from "@/utils/enums/sourceType.enum";
import { ConfirmHelper } from "@/utils/helpers/confirm.helper";
import { getVolumeIcon } from "@/utils/helpers/fontawesome.helper";
import { PlayerHelper } from "@/utils/helpers/player.helper";
import { ThemeHelper } from "@/utils/helpers/theme.helper";

import { UrlHelper } from "@/utils/helpers/url.helper";



export default defineComponent({

  props: {
    source: Object as PropType<TSource>,
  },
  emits: ["remove", "edit", "pin", "unpin", "toggleMute", "disableDrag", "enableDrag"],

  setup() {
    const resizerRef = ref(null);

    return { resizerRef };
  },

  computed: {
    ...mapState(useAppStore, ["theme"]),

    /**
     * @description
     * The ID of the source's element on the DOM
     *
     * @returns The source element ID string
     */
    sourceId(): string {
      return `source-${this.source?.id}`;
    },

    /**
     * @description
     * The ID of the source's player on the DOM
     *
     * @returns The player element ID string
     */
    playerId(): string {
      return `player-${this.source?.id}`;
    },

    /**
     * @description
     * The cropped source URL (native video only)
     *
     * @returns The cropped source URL string
     */
    sourceUrl(): string {
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
     * The embed provider string for Plyr (youtube / vimeo)
     *
     * @returns The provider string
     */
    embedProvider(): string {
      switch (this.sourceType) {
        case SourceType.YouTube: return "youtube";

        case SourceType.Vimeo: return "vimeo";

        default: return "";
      }
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
     * The icon to show on the button
     *
     * @returns The volume icon name string
     */
    volumeIcon(): string {
      const volume = this.source?.metadata?.volume ?? 1;
      const muted = this.source?.metadata?.muted ?? false;

      return getVolumeIcon(volume * 100, muted);
    },

    /**
     * @description
     * Checks if dark theme is on
     *
     * @returns Whether the dark theme is active
     */
    isDark(): boolean {
      return ThemeHelper.isDark(this.theme as Theme);
    },

    /**
     * @description
     * The button type
     *
     * @returns The button type string
     */
    buttonType(): string {
      return this.isDark ? "plain" : "secondary";
    },
  },

  mounted() {
    nextTick(() => {
      this.initPlayer();
    });
  },

  beforeUnmount() {
    if (this.source?.id) {
      PlayerHelper.destroy(this.source.id);
    }
  },

  methods: {

    /**
     * @description
     * Initializes the Plyr player for this source
     */
    initPlayer(): void {
      if (!this.source?.id) {
        return;
      }

      PlayerHelper.create(this.source.id, this.playerId, this.sourceType);
    },

    /**
     * @description
     * Emits remove event
     */
    onRemove(): void {
      ConfirmHelper
        .open({
          title: "Delete Source",
          resolveLabel: "Delete",
          icon: "triangle-exclamation",
          message: "Do you really want to delete this source?",
        })
        .then((confirm) => {
          if (confirm) {
            this.$emit("remove", this.source?.id);
          }
        });
    },

    /**
     * @description
     * Emits the mute toggle event
     */
    onToggleMute(): void {
      this.$emit("toggleMute", this.source?.id, !this.source?.metadata.muted);
    },

    /**
     * @description
     * Emits edit event
     */
    onEdit(): void {
      this.$emit("edit", this.source?.id);
    },

    /**
     * @description
     * Emits the pin event
     */
    onPin(): void {
      this.$emit("pin", this.source?.id);
    },

    /**
     * @description
     * Emits the unpin event
     */
    onUnpin(): void {
      this.$emit("unpin", this.source?.id);
    },

    /**
     * @description
     * Toggles draggability
     *
     * @param e The mouse move event object
     */
    onMouseMove(e: MouseEvent): void {
      if (this.source?.pinned) {
        const resizerEle = this.$refs.resizerRef as HTMLDivElement;
        const resizerRect = resizerEle.getClientRects().item(0);

        const startX = resizerRect?.left ?? 0;
        const endX = startX + (resizerRect?.width ?? 0);
        const startY = resizerRect?.top ?? 0;
        const endY = startY + (resizerRect?.height ?? 0);

        if (e.x >= startX && e.x <= endX && e.y >= startY && e.y <= endY) {
          this.$emit("disableDrag", this.source.id);
        }
        else {
          this.$emit("enableDrag", this.source.id);
        }
      }
    },
  },

});
</script>

<template>
  <div
    v-if="source"
    :id="sourceId"
    :key="source.id"
    class="source"
    :class="{
      'source--dark': isDark,
      'source--pinned': source.pinned,
    }"
    @mousemove="onMouseMove"
  >
    <div class="source__head">
      <div class="source__title">
        <div class="source__icon">
          <font-awesome-icon icon="video" />
        </div>

        <a
          target="_blank"
          :href="source.url"
          class="source__link"
        >
          {{ source.title }}
        </a>
      </div>

      <div class="source__controls">
        <div class="source__control source__control--contextual">
          <ButtonComp
            icon="trash"
            :type="buttonType"
            @click="onRemove"
          />
        </div>

        <div class="source__control source__control--contextual">
          <ButtonComp
            icon="pen"
            :type="buttonType"
            @click="onEdit"
          />
        </div>

        <div class="source__control source__control--contextual">
          <ButtonComp
            icon="thumbtack"
            :type="buttonType"
            @click="onPin"
          />
        </div>

        <div class="source__control">
          <ButtonComp
            :type="buttonType"
            :icon="volumeIcon"
            @click="onToggleMute"
          />
        </div>

        <div class="source__control source__control--more">
          <MoreComp :type="buttonType">
            <div class="source__control">
              <ButtonComp
                icon="trash"
                :type="buttonType"
                @click="onRemove"
              />
            </div>

            <div class="source__control">
              <ButtonComp
                icon="pen"
                :type="buttonType"
                @click="onEdit"
              />
            </div>

            <div class="source__control">
              <ButtonComp
                icon="thumbtack"
                :type="buttonType"
                @click="onPin"
              />
            </div>

            <div class="source__control">
              <ButtonComp
                :type="buttonType"
                :icon="volumeIcon"
                @click="onToggleMute"
              />
            </div>
          </MoreComp>
        </div>
      </div>
    </div>

    <div class="source__body">
      <div class="source__controls">
        <div class="source__control">
          <ButtonComp
            icon="trash"
            :type="buttonType"
            @click="onRemove"
          />
        </div>

        <div class="source__control">
          <ButtonComp
            icon="pen"
            :type="buttonType"
            @click="onEdit"
          />
        </div>

        <div class="source__control">
          <ButtonComp
            :type="buttonType"
            :icon="volumeIcon"
            @click="onToggleMute"
          />
        </div>

        <div class="source__control">
          <ButtonComp
            icon="xmark"
            :type="buttonType"
            @click="onUnpin"
          />
        </div>
      </div>

      <!-- Native video player wrapped with loading indicator -->
      <SourceLoader
        v-if="isNativeSource"
        :buffering="source.metadata.buffering"
      >
        <video
          :id="playerId"
          preload="auto"
          class="source__player"
        >
          <source
            type="video/mp4"
            :src="sourceUrl"
          >
        </video>
      </SourceLoader>

      <!-- Embedded player (YouTube / Vimeo) via Plyr -->
      <div
        v-else
        class="source__embed"
      >
        <div
          :id="playerId"
          :data-plyr-provider="embedProvider"
          :data-plyr-embed-id="embedId"
        />
      </div>
    </div>

    <div
      ref="resizerRef"
      class="source__resizer"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/style/utils/responsive' as utils;

.source {
  $root: &;

  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: column;

  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid hsl(var(--color-secondary-hsl), 92%);

  background-color: hsl(var(--color-secondary-hsl), 96%);

  &__head {
    cursor: grab;

    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    padding: 10px 10px 10px 15px;
    background-color: hsl(var(--color-secondary-hsl), 94%);

    &:active {
      cursor: grabbing;
    }

    #{$root}__title {
      display: flex;
      flex-direction: row;

      #{$root}__icon {
        font-size: 14px;
        margin-right: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      #{$root}__link {
        text-decoration: none;
        color: var(--color-text);

        white-space: nowrap;

        font-size: 16px;
        font-family: var(--primary-font);
        font-weight: var(--font-weight-regular);
      }
    }
  }

  &__body {
    position: relative;

    flex: 1;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    #{$root}__player {
      width: 100%;
    }

    #{$root}__embed {
      width: 100%;
      height: 100%;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;

      // Ensure Plyr's iframe fills the container
      :deep(.plyr) {
        width: 100%;
        height: 100%;
      }

      :deep(.plyr__video-embed) {
        width: 100%;
        height: 100%;
        padding-bottom: 0;
      }

      :deep(iframe) {
        width: 100%;
        height: 100%;
        min-height: 200px;
        border: none;
      }
    }

    #{$root}__controls {
      position: absolute;
      top: 5px;
      right: 5px;

      z-index: 1;
      opacity: 0;
      display: none;

      width: auto;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      transition-duration: 0.2s;
      transition-property: opacity;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    #{$root}__control {
      &--contextual {
        opacity: 0;

        transition-duration: 0.2s;
        transition-property: opacity;
      }

      &--more {
        display: none;
        margin-left: 10px;
      }

      &:not(:last-of-type) {
        margin-right: 5px;
      }
    }
  }

  &__resizer {
    cursor: nw-resize;
    display: none;

    position: absolute;
    bottom: 0;
    right: 0;

    width: 20px;
    height: 20px;

    z-index: 100;
  }

  &--pinned {
    overflow: auto;
    resize: horizontal;

    width: 400px;
    min-width: 172px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);

    #{$root}__head {
      display: none;
    }

    #{$root}__body {
      #{$root}__player {
        border-radius: 4px;
        margin-bottom: -7px;
      }

      #{$root}__controls {
        display: flex;
      }
    }

    #{$root}__resizer {
      display: block;
    }

    &:hover {
      #{$root}__controls {
        opacity: 1;
        padding: 5px;
        border-radius: 5px;
        background-color: rgba(var(--color-primary-rgb), 0.4);
      }
    }
  }

  &--dark {
    border-color: hsl(var(--color-secondary-hsl), 30%);
    background-color: hsl(var(--color-secondary-hsl), 55%);

    #{$root}__head {
      background-color: hsl(var(--color-secondary-hsl), 50%);
    }
  }

  &:hover {
    #{$root}__controls #{$root}__control--contextual {
      opacity: 1;
    }
  }

  @include utils.responsive('phone') {
    &__head {
      #{$root}__controls> {
        #{$root}__control {
          &--more {
            display: block;
          }

          &:not(#{$root}__control--more) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
