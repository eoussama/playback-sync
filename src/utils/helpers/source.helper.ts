import type { TMetadata } from "../types/composition/metadata.type";

import type { TSource } from "@/utils/types/composition/source.type";
import { v4 } from "uuid";

import { useSourcesStore } from "@/state/stores/sources.store";
import { ReadyState } from "../enums/readyState.enum";
import { DOMHelper } from "./dom.helper";

import { DragHelper } from "./drag.helper";
import { MathHelper } from "./math.helper";



/**
 * @description
 * Helps with sources
 */
export class SourceHelper {
  /**
   * @description
   * Initializes a new source
   *
   * @returns A promise that resolves with the initialized source
   */
  static async init(): Promise<TSource> {
    const metadata: Partial<TMetadata> = {
      duration: 0,
      currentTime: 0,
      speed: 1,
      end: 0,
      start: 0,
      playing: false,
      buffering: false,
      // volume and muted are intentionally omitted so they inherit from
      // the global store values resolved inside load()
    };

    return this.create("", "", metadata);
  }

  /**
   * @description
   * Resets an existing source
   *
   * @param id The ID of the source to reset
   * @returns A promise that resolves with the reset source
   */
  static async reset(id: string): Promise<TSource> {
    const source = await this.init();

    return { ...source, id };
  }

  /**
   * @description
   * Creates a new source
   *
   * @param title The title of the source
   * @param url The URL of the source
   * @param metadata The metadata of the source
   * @returns A promise that resolves with the created source
   */
  static async create(title: string, url: string, metadata?: Partial<TMetadata>): Promise<TSource> {
    const id = v4();
    const { isAudio, ...sourceMetadata } = await this.load(url);

    return {
      id,
      url,
      title,
      pinned: false,
      isAudio,
      metadata: {
        ...sourceMetadata,
        ...metadata,
      },
    };
  }

  /**
   * @description
   * Refreshes the source's player
   *
   * @param id The ID of the source to refresh
   */
  static refresh(id: string): void {
    const player = this.getPlayer(id);

    if (player) {
      player.load();
    }
  }

  /**
   * @description
   * Plays the source
   *
   * @param id The ID of the source
   * @returns A promise that resolves when the source starts playing
   */
  static async play(id: string): Promise<void> {
    await this.sync();
    const player = this.getPlayer(id);
    const store = useSourcesStore();
    const source = store.getSource(id);

    if (player && source) {
      const end = source.metadata.end || player.duration;

      // Don't restart a source that has already reached its cropped end
      if (player.currentTime < end - 0.05) {
        player.play();
      }
    }
  }

  /**
   * @description
   * Pauses the source
   *
   * @param id The ID of the source
   */
  static pause(id: string): void {
    const player = this.getPlayer(id);

    if (player) {
      player.pause();
    }
  }

  /**
   * @description
   * Restarts the source
   *
   * @param id The ID of the source
   * @returns A promise that resolves when the source restarts
   */
  static async restart(id: string): Promise<void> {
    await this.sync();
    const player = this.getPlayer(id);
    const store = useSourcesStore();
    const source = store.getSource(id);

    if (player && source) {
      player.currentTime = source.metadata.start;
      player.play();
    }
  }

  /**
   * @description
   * Toggles the source's muted state
   *
   * @param id The ID of the source
   * @param state The muted state of the source
   */
  static mute(id: string, state: boolean): void {
    const player = this.getPlayer(id);

    if (player) {
      player.muted = state;
    }
  }

  /**
   * @description
   * Seeks a specific time on the timeline
   *
   * @param id The ID of the source
   * @param time The number of seconds to seek (delta)
   */
  static seek(id: string, time: number): void {
    const player = this.getPlayer(id);
    const store = useSourcesStore();
    const source = store.getSource(id);

    if (player && source) {
      const start = source.metadata.start;
      const end = (source.metadata.end || player.duration) - 0.1;

      player.currentTime = MathHelper.clamp(player.currentTime + time, start, end);
    }
  }

  /**
   * @description
   * Seeks to a specific time on the timeline
   *
   * @param id The ID of the source
   * @param time The relative time to seek to (offset from source start)
   */
  static setTime(id: string, time: number): void {
    const player = this.getPlayer(id);
    const store = useSourcesStore();
    const source = store.getSource(id);

    if (player && source) {
      const start = source.metadata.start;
      const end = source.metadata.end || player.duration;
      const absoluteTime = start + time;

      // Clamp to the source's valid range. Sources whose range has already
      // been exceeded snap to their end position so the scrubber accurately
      // reflects where each source sits on the global timeline.
      player.currentTime = MathHelper.clamp(absoluteTime, start, end - 0.1);
    }
  }

  /**
   * @description
   * Sets the volume of the sources
   *
   * @param id The ID of the source
   * @param volume The volume to set
   */
  static setVolume(id: string, volume: number): void {
    const player = this.getPlayer(id);
    const sanitizedVolume = MathHelper.clamp(volume, 0, 1);

    if (player) {
      player.volume = sanitizedVolume;
    }
  }

  /**
   * @description
   * Sets the speed of the sources
   *
   * @param id The ID of the source
   * @param speed The speed to set
   */
  static setSpeed(id: string, speed: number): void {
    const player = this.getPlayer(id);

    if (player) {
      player.playbackRate = speed;
    }
  }

  /**
   * @description
   * Pins a source
   *
   * @param id The ID of the source to pin
   * @returns A promise that resolves when the source is pinned
   */
  static async pin(id: string): Promise<void> {
    const elementId = `#source-${id}`;
    const container = document.querySelector("#app .view") as HTMLDivElement;

    await DragHelper.create(elementId, container);
    await this.hook(id);
    await this.sync();
  }

  /**
   * @description
   * Unpins a source
   *
   * @param id The ID of the source to unpin
   * @returns A promise that resolves when the source is unpinned
   */
  static async unpin(id: string): Promise<void> {
    const elementId = `#source-${id}`;

    await DragHelper.destroy(elementId);
    await this.hook(id);
    await this.sync();
  }

  /**
   * @description
   * Gets the player element on the DOM
   *
   * @param id The ID of the DOM element
   * @returns The video player element
   */
  static getPlayer(id: string): HTMLVideoElement {
    return document.getElementById(`player-${id}`) as HTMLVideoElement;
  }

  /**
   * @description
   * Hooks in to a player element
   *
   * @param id The ID of the player
   * @returns A promise that resolves when the hook is set up
   */
  static async hook(id: string): Promise<void> {
    return new Promise((resolve) => {
      const elementId = `#player-${id}`;

      DOMHelper
        .watch(elementId)
        .then(e => e[0] as HTMLVideoElement)
        .then((player) => {
          const store = useSourcesStore();
          const source = store.getSource(id);

          player.muted = source.metadata.muted;
          player.volume = source.metadata.volume;
          player.playbackRate = source.metadata.speed;

          const start = source.metadata.start;
          const end = source.metadata.end || MathHelper.sanitize(player.duration) || 0;
          const currTime = source.metadata.currentTime;

          player.currentTime = end > 0
            ? MathHelper.clamp(currTime, start, end - 0.1)
            : Math.max(currTime, start);

          if (source.metadata.playing) {
            player.play();
          }

          player.onplay = () => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: true });
            }
          };

          player.onpause = () => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: false });
            }
          };

          player.ontimeupdate = () => {
            const src = store.getSource(id);
            const end = src?.metadata?.end || player.duration;

            if (player.currentTime >= end) {
              player.pause();
              player.currentTime = end - 0.01;
            }
            else {
              store.updateSourceMetadata(id, { currentTime: player.currentTime });
            }
          };

          player.onvolumechange = () => {
            store.updateSourceMetadata(id, { muted: player.muted, volume: player.volume });
          };

          player.onratechange = () => {
            store.updateSourceMetadata(id, { speed: player.playbackRate });
          };

          player.onwaiting = () => {
            store.updateSourceMetadata(id, { buffering: true });
          };

          player.oncanplay = () => {
            store.updateSourceMetadata(id, { buffering: false });
          };

          resolve();
        });
    });
  }

  /**
   * @description
   * Loads metadata for a media source and detects whether it is audio-only
   *
   * @param url The URL to load
   * @returns A promise that resolves with the loaded metadata and isAudio flag
   */
  private static load(url: string): Promise<TMetadata & { isAudio: boolean }> {
    return new Promise((resolve) => {
      const store = useSourcesStore();
      const video = document.createElement("video");

      video.src = url;

      video.onerror = video.onloadedmetadata = () => {
        resolve({
          start: 0,
          speed: store.speed,
          muted: store.muted,
          volume: store.volume,
          playing: store.playing,
          end: video.duration ?? 0,
          duration: video.duration,
          buffering: video.readyState < ReadyState.HaveEnoughData,
          currentTime: store.longestSource.metadata?.currentTime ?? 0,
          isAudio: !video.error && video.videoWidth === 0 && video.videoHeight === 0 && !Number.isNaN(video.duration),
        });

        video.remove();
      };
    });
  }

  /**
   * @description
   * Checks if a player is fully loaded with no buffering
   *
   * @param player The player element to check
   * @returns A promise that resolves with the loaded state
   */
  private static isLoaded(player: HTMLVideoElement): Promise<boolean> {
    return new Promise((resolve) => {
      if (player.readyState === ReadyState.HaveEnoughData) {
        resolve(true);
      }
      else {
        const listener = () => {
          if (player.readyState === ReadyState.HaveEnoughData) {
            resolve(true);
            player.removeEventListener("canplay", listener);
            player.removeEventListener("canplaythrough", listener);
          }
        };

        player.addEventListener("canplay", listener);
        player.addEventListener("canplaythrough", listener);
      }
    });
  }

  /**
   * @description
   * Makes sure all sources are loaded
   *
   * @returns A promise that resolves when all sources are loaded
   */
  private static async sync(): Promise<void> {
    const store = useSourcesStore();
    const sources = store.sources.slice(0);

    const promises = sources.map(source => DOMHelper
      .watch(`#player-${source.id}`)
      .then(e => e[0] as HTMLVideoElement)
      .then(this.isLoaded),
    );

    await Promise.all(promises);
  }
}
