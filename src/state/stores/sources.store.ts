import { defineStore } from 'pinia';
import { TillingValue } from '@/utils/enums/tillingValue.enum';

import type { TSource } from '@/utils/types/composition/source.type';
import type { TMetadata } from '@/utils/types/composition/metadata.type';
import type { TSourcesStore } from '@/utils/types/store/sourceStore.type';



export const useSourcesStore = defineStore('sources', {
  state: (): TSourcesStore => ({
    speed: 1,
    volume: 1,
    muted: false,
    playing: false,
    bufferPause: false,
    tilling: TillingValue.Split,
    sources: [],
  }),

  getters: {

    /**
     * @description
     * Returns the longest source
     *
     * @param state The current state
     */
    longestSource: state => {
      const sortedByLength = state.sources.slice(0).sort((a, b) => b.metadata.duration - a.metadata.duration);
      return sortedByLength[0] ?? 0;
    }
  },

  actions: {

    /**
     * @description
     * Updates the tilling mode state
     *
     * @param tilling The new tilling mode
     */
    setTilling(tilling: TillingValue): void {
      this.tilling = tilling;
    },

    /**
     * @description
     * Updates the playing state
     *
     * @param playing The playing state to set
     */
    setPlaying(playing: boolean): void {
      this.playing = playing;
    },

    /**
     * @description
     * Updates the buffer pause state
     *
     * @param bufferPause The buffer pause state
     */
    setBufferPause(bufferPause: boolean): void {
      this.bufferPause = bufferPause;
    },

    /**
     * @description
     * Updates the muted state
     *
     * @param muted The muted state to set
     */
    setMuted(muted: boolean): void {
      this.muted = muted;
    },

    /**
     * @description
     * Updates the volume
     *
     * @param volume The volume to set
     */
    setVolume(volume: number): void {
      this.volume = volume;
    },

    /**
     * @description
     * Updates the speed
     *
     * @param speed The speed to set
     */
    setSpeed(speed: number): void {
      this.speed = speed;
    },

    /**
     * @description
     * Notify the sources that the timeline needs to be seeked
     * to a specific point relative to its current position.
     *
     * @param time The time to seek
     */
    seek(time: number): void { }, // eslint-disable-line

    /**
     * @description
     * Updates sources timeline's current time
     *
     * @param time The time to seek to
     */
    setTimeline(time: number): void { }, // eslint-disable-line

    /**
     * @description
     * Resets all sources
     */
    resetSources(): void {
      this.sources = [];
    },

    /**
     * @description
     * Returns a source object by ID
     *
     * @param id The ID of the source to get
     */
    getSource(id: string): TSource {
      const index = this.sources.findIndex(e => e.id === id);
      return this.sources[index];
    },

    /**
     * @description
     * Adds a new source
     *
     * @param source The source to add
     */
    addSource(source: TSource): void {
      this.sources.push(source);
    },

    /**
     * @description
     * Edits an existing source
     *
     * @param source The source to edit
     */
    updateSource(source: TSource): void {
      const index = this.sources.findIndex(e => e.id === source.id);
      this.sources[index] = { ...source };
    },

    /**
     * @description
     * Removes an existing source
     */
    removeSource(id: string): void {
      const index = this.sources.findIndex(s => s.id === id);
      this.sources.splice(index, 1);
    },

    /**
     * @description
     * Switches the order of two sources by ID
     *
     * @param sourceId1 The first source ID
     * @param sourceId2 The second source ID
     */
    switchSources(sourceId1: string, sourceId2: string): void {
      const index1 = this.sources.findIndex(e => e.id === sourceId1);
      const index2 = this.sources.findIndex(e => e.id === sourceId2);
      const tmp = this.sources[index1];

      this.sources[index1] = this.sources[index2];
      this.sources[index2] = tmp;
    },

    /**
     * @description
     * Toggles the pin state of a source
     *
     * @param id The ID of the source to toggle the pin state for
     * @param state The new state of the pin to update to
     */
    toggleSourcePin(id: string, state: boolean): void {
      const index = this.sources.findIndex(e => e.id === id);

      this.sources[index] = {
        ...this.sources[index],
        pinned: state
      }
    },

    /**
     * @description
     * Updates a singular source
     *
     * @param id The ID of the source to update
     * @param metadata The metadata updates
     */
    updateSourceMetadata(id: string, metadata: Partial<TMetadata>): void {
      const index = this.sources.findIndex(e => e.id === id);

      if (index >= 0) {
        this.sources[index] = {
          ...this.sources[index],
          metadata: {
            ...this.sources[index].metadata,
            ...metadata
          }
        }
      };
    }
  }
});