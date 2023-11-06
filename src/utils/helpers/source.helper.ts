import { v4 } from 'uuid';

import { ReadyState } from '../enums/readyState.enum';
import { useSourcesStore } from '@/state/stores/sources.store';

import { DOMHelper } from './dom.helper';
import { DragHelper } from './drag.helper';
import { MathHelper } from './math.helper';

import type { TMetadata } from '../types/composition/metadata.type';
import type { TSource } from '@/utils/types/composition/source.type';



/**
 * @description
 * Helps with sources
 */
export class SourceHelper {

  /**
   * @description
   * Initializes a new source
   */
  static async init(): Promise<TSource> {
    const metadata: TMetadata = {
      duration: 0, currentTime: 0,
      speed: 1, end: 0, start: 0, volume: 1,
      muted: false, playing: false, buffering: false
    };

    return this.create('', '', metadata);
  }

  /**
   * @description
   * Resets an existing source
   *
   * @param id The ID of the source to reset
   */
  static async reset(id: string): Promise<TSource> {
    const source = await this.init();
    return { ...source, id };
  }

  /**
   * @description
   * Creates a new source
   *
   * @param url The URL of the source
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
        ...metadata
      }
    };
  }

  /**k
   * @description
   * refreshes the source's player
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
   */
  static async play(id: string): Promise<void> {
    await this.sync();
    const player = this.getPlayer(id);

    if (player) {
      if (player.currentTime < player.duration) {
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
   * @param time The number of seconds to seek to
   */
  static seek(id: string, time: number): void {
    const player = this.getPlayer(id);

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
    const player = this.getPlayer(id);

    if (player) {
      player.currentTime = Math.min(time, player.duration - 0.1);
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
   */
  static async pin(id: string): Promise<void> {
    const elementId = `#source-${id}`;
    const container = document.querySelector('#app .view') as HTMLDivElement;

    await DragHelper.create(elementId, container);
    await this.hook(id);
    await this.sync();
  }

  /**
   * @description
   * Unpins a source
  *
  * @param id The ID of the source to unpin
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
   */
  static getPlayer(id: string): HTMLVideoElement {
    return document.getElementById(`player-${id}`) as HTMLVideoElement;
  }

  /**
   * @description
   * Hooks in to a player element
   *
   * @param id The ID of the player
   */
  static async hook(id: string): Promise<void> {
    return new Promise(resolve => {
      const elementId = `#player-${id}`;

      DOMHelper
        .watch(elementId)
        .then(e => e[0] as HTMLVideoElement)
        .then(player => {
          const store = useSourcesStore();
          const source = store.getSource(id);

          player.muted = source.metadata.muted;
          player.volume = source.metadata.volume;
          player.playbackRate = source.metadata.speed;

          const currTime = source.metadata.currentTime;
          const maxTime = MathHelper.sanitize(player.duration) ?? 0 - 0.1;
          player.currentTime = maxTime > 0 ? Math.min(currTime, maxTime) : currTime;

          player.onplay = () => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: true });
            }
          }

          player.onpause = () => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: false });
            }
          }

          player.ontimeupdate = () => {
            store.updateSourceMetadata(id, { currentTime: player.currentTime });
          }

          player.onvolumechange = () => {
            store.updateSourceMetadata(id, { muted: player.muted, volume: player.volume });
          }

          player.onratechange = () => {
            store.updateSourceMetadata(id, { speed: player.playbackRate });
          }

          player.onwaiting = () => {
            store.updateSourceMetadata(id, { buffering: true });
          }

          player.oncanplay = () => {
            store.updateSourceMetadata(id, { buffering: false });
          }

          resolve();
        });
    });
  }

  /**
   * @description
   * Loads metadata for video
   *
   * @param url The URL to load
   */
  private static load(url: string): Promise<TMetadata> {
    return new Promise(resolve => {
      const store = useSourcesStore();
      const video = document.createElement('video');
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
          currentTime: store.longestSource.metadata?.currentTime ?? 0
        });

        video.remove();
      }
    });
  }

  /**
   * @description
   * Checks if a player is fully loaded with no buffering
   *
   * @param player The player element to check
   */
  private static isLoaded(player: HTMLVideoElement): Promise<boolean> {
    return new Promise(resolve => {
      if (player.readyState === ReadyState.HaveEnoughData) {
        resolve(true);
      } else {
        const listener = () => {
          if (player.readyState === ReadyState.HaveEnoughData) {
            resolve(true);
            player.removeEventListener('canplay', listener);
            player.removeEventListener('canplaythrough', listener);
          }
        };

        player.addEventListener('canplay', listener);
        player.addEventListener('canplaythrough', listener);
      }
    });
  }

  /**
   * @description
   * Makes sure all sources are loaded
   */
  private static async sync(): Promise<void> {
    const store = useSourcesStore();
    const sources = store.sources.slice(0);

    const promises = sources.map(source => DOMHelper
      .watch(`#player-${source.id}`)
      .then(e => e[0] as HTMLVideoElement)
      .then(this.isLoaded)
    );

    await Promise.all(promises);
  }
}