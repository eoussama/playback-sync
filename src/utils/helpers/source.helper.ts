import type { TMetadata } from "../types/composition/metadata.type";
import type { TSource } from "@/utils/types/composition/source.type";

import { v4 } from "uuid";

import { useSourcesStore } from "@/state/stores/sources.store";
import { ReadyState } from "../enums/readyState.enum";
import { SourceType } from "../enums/sourceType.enum";

import { DragHelper } from "./drag.helper";
import { MathHelper } from "./math.helper";
import { PlayerHelper } from "./player.helper";
import { UrlHelper } from "./url.helper";



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
    const metadata: TMetadata = {
      duration: 0,
      currentTime: 0,
      speed: 1,
      end: 0,
      start: 0,
      volume: 1,
      muted: false,
      playing: false,
      buffering: false,
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
    const sourceMetadata = await this.load(url);

    return {
      id,
      url,
      title,
      pinned: false,
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
    const player = PlayerHelper.get(id);

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
    const player = PlayerHelper.get(id);

    if (player) {
      const duration = player.duration;

      // duration 0 means not loaded yet (e.g. embedded); allow play
      if (duration === 0 || player.currentTime < duration) {
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
    const player = PlayerHelper.get(id);

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
    const player = PlayerHelper.get(id);

    if (player) {
      player.currentTime = 0;
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
    const player = PlayerHelper.get(id);

    if (player) {
      player.muted = state;
    }
  }

  /**
   * @description
   * Seeks a specific time on the timeline
   *
   * @param id The ID of the source
   * @param time The number of seconds to seek to
   */
  static seek(id: string, time: number): void {
    const player = PlayerHelper.get(id);

    if (player) {
      player.currentTime += time;
    }
  }

  /**
   * @description
   * Seeks to a specific time on the timeline
   *
   * @param id The ID of the source
   * @param time The time to seek to
   */
  static setTime(id: string, time: number): void {
    const player = PlayerHelper.get(id);

    if (player) {
      const max = player.duration - 0.1;

      player.currentTime = max > 0 ? Math.min(time, max) : time;
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
    const player = PlayerHelper.get(id);
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
    const player = PlayerHelper.get(id);

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
   * Hooks in to a player adapter
   *
   * @param id The ID of the player
   * @returns A promise that resolves when the hook is set up
   */
  static async hook(id: string): Promise<void> {
    return new Promise((resolve) => {
      PlayerHelper
        .watch(id)
        .then((adapter) => {
          const store = useSourcesStore();
          const source = store.getSource(id);

          adapter.muted = source.metadata.muted;
          adapter.volume = source.metadata.volume;
          adapter.playbackRate = source.metadata.speed;

          const currTime = source.metadata.currentTime;
          const maxTime = MathHelper.sanitize(adapter.duration) ?? 0 - 0.1;

          adapter.currentTime = maxTime > 0 ? Math.min(currTime, maxTime) : currTime;

          if (source.metadata.playing) {
            adapter.play();
          }

          adapter.onPlay(() => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: true });
            }
          });

          adapter.onPause(() => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: false });
            }
          });

          adapter.onTimeUpdate(() => {
            store.updateSourceMetadata(id, { currentTime: adapter.currentTime });
          });

          adapter.onVolumeChange(() => {
            store.updateSourceMetadata(id, { muted: adapter.muted, volume: adapter.volume });
          });

          adapter.onRateChange(() => {
            store.updateSourceMetadata(id, { speed: adapter.playbackRate });
          });

          adapter.onWaiting(() => {
            store.updateSourceMetadata(id, { buffering: true });
          });

          adapter.onCanPlay(() => {
            store.updateSourceMetadata(id, { buffering: false });
          });

          // Update duration/end when metadata loads — important for embedded sources
          adapter.onLoadedMetadata(() => {
            const duration = adapter.duration;

            if (duration > 0) {
              store.updateSourceMetadata(id, {
                duration,
                end: store.getSource(id).metadata.end || duration,
              });
            }
          });

          resolve();
        });
    });
  }

  /**
   * @description
   * Loads metadata for video
   *
   * @param url The URL to load
   * @returns A promise that resolves with the loaded metadata
   */
  private static load(url: string): Promise<TMetadata> {
    const sourceType = UrlHelper.getType(url);

    // Embedded sources can't be loaded via a temp video element — return defaults
    if (sourceType !== SourceType.Native) {
      return new Promise((resolve) => {
        const store = useSourcesStore();

        resolve({
          start: 0,
          end: 0,
          duration: 0,
          speed: store.speed,
          muted: store.muted,
          volume: store.volume,
          playing: store.playing,
          buffering: false,
          currentTime: store.longestSource.metadata?.currentTime ?? 0,
        });
      });
    }

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
        });

        video.remove();
      };
    });
  }

  /**
   * @description
   * Checks if a player adapter is fully loaded
   *
   * @param id The source ID
   * @returns A promise that resolves when the player is ready
   */
  private static isLoaded(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const check = () => {
        const adapter = PlayerHelper.get(id);

        if (!adapter || adapter.readyState === ReadyState.HaveEnoughData) {
          resolve(true);
        }
        else {
          setTimeout(check, 100);
        }
      };

      check();
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

    const promises = sources.map(source => this.isLoaded(source.id));

    await Promise.all(promises);
  }
}
