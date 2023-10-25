import { v4 } from 'uuid';

import { ReadyState } from '../enums/readyState.enum';
import { useSourcesStore } from '@/state/stores/sources.store';

import { DragHelper } from './drag.helper';

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
   * @param title The title of the source
   */
  static async create(title: string, url: string, metadata?: Partial<TMetadata>): Promise<TSource> {
    const id = v4();
    const sourceMetadata = await this.loadSourceMetadata(url);

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

  /**
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
  static play(id: string): void {
    const player = this.getPlayer(id);

    if (player) {
      player.play();
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
      player.currentTime = time;
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
    const sanitizedVolume = Math.max(Math.min(1, volume), 0);

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
  static pin(id: string): void {
    const elementId = `#source-${id}`;
    const container = document.querySelector('#app .view') as HTMLDivElement;

    DragHelper.create(elementId, container);
  }

  /**
   * @description
   * Unpins a source
   *
   * @param id The ID of the source to unpin
   */
  static unpin(id: string): void {
    const elementId = `#source-${id}`;
    DragHelper.destroy(elementId);
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
  static hookPlayer(id: string): void {
    const target = document.getElementById('app') as HTMLDivElement;
    const options = { childList: true, subtree: true };
    const elementId = `#player-${id}`;
    const observer = new MutationObserver((mutationList, observer) => {
      const mutations = mutationList.flatMap(e => e.addedNodes);
      const nodes = mutations.flatMap(e => e.item(0)) as Array<HTMLDivElement>;
      const sources = nodes.filter(e => e?.classList?.contains('source'));
      const players = sources.map(e => e.querySelector(elementId)) as Array<HTMLVideoElement>;

      for (const player of players) {
        if (player && elementId.endsWith(player?.id ?? '')) {
          const store = useSourcesStore();

          player.ontimeupdate = () => {
            store.updateSourceMetadata(id, { currentTime: player.currentTime });
          }

          player.onpause = () => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: false });
            }
          }

          player.onplay = () => {
            if (!store.bufferPause) {
              store.updateSourceMetadata(id, { playing: true });
            }
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

          observer.disconnect();
        }
      }
    });

    observer.observe(target, options);
  }

  /**
   * @description
   * Loads metadata for video
   *
   * @param url The URL to load
   */
  private static loadSourceMetadata(url: string): Promise<TMetadata> {
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
}