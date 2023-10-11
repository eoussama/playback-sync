import { v4 } from 'uuid';
import type { TMetadata } from '../types/composition/metadata.type';
import type { TSource } from '@/utils/types/composition/source.type';



/**
 * @description
 * Helps with sources
 */
export class SourceHelper {

  /**
   * @description
   * Creates a new source
   *
   * @param url The URL of the source
   * @param title The title of the source
   */
  static async create(title: string, url: string): Promise<TSource> {
    const id = v4();
    const metadata = await this.loadSourceMetadata(url);

    return { id, url, title, metadata };
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

    if (player) {
      player.volume = volume;
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
   * Gets the player element on the DOM
   *
   * @param id The ID of the DOM element
   */
  static getPlayer(id: string): HTMLVideoElement {
    return document.getElementById(id) as HTMLVideoElement;
  }

  /**
   * @description
   * Loads metadata for video
   *
   * @param url The URL to load
   */
  private static loadSourceMetadata(url: string): Promise<TMetadata> {
    return new Promise(resolve => {
      const video = document.createElement('video');
      video.src = url;

      video.onloadedmetadata = e => {
        resolve({
          duration: video.duration
        });

        video.remove();
      }
    });
  }
}