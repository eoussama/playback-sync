import { defineStore } from 'pinia'
import type { TSource } from '@/utils/types/composition/source.type'
import type { TSourcesStore } from '@/utils/types/store/sourceStore.type'



export const useSourcesStore = defineStore('sources', {
  state: (): TSourcesStore => ({
    speed: 1,
    volume: 1,
    playing: false,
    muted: false,
    sources: [],
  }),

  actions: {

    /**
     * @description
     * Updates the playing state
     *
     * @param playing The playing state to set
     */
    setPlaying(playing: boolean) {
      this.playing = playing;
    },

    /**
     * @description
     * Updates the muted state
     *
     * @param muted The muted state to set
     */
    setMuted(muted: boolean) {
      this.muted = muted;
    },

    /**
     * @description
     * Updates the volume
     *
     * @param volume The volume to set
     */
    setVolume(volume: number) {
      this.volume = volume;
    },

    /**
     * @description
     * Updates the speed
     *
     * @param speed The speed to set
     */
    setSpeed(speed: number) {
      this.speed = speed;
    },

    /**
     * @description
     * Notify the sources that the timeline needs to be seeked
     * to a specific point relative to its current position.
     *
     * @param time The speed to set
     */
    seek(time: number) { },

    /**
     * @description
     * Resets all sources
     */
    resetSources() {
      this.sources = [];
    },

    /**
     * @description
     * Adds a new source
     */
    addSource(source: TSource) {
      this.sources.push(source);
    },

    /**
     * @description
     * Removes an existing source
     */
    removeSource(id: string) {
      const index = this.sources.findIndex(s => s.id === id);
      this.sources.splice(index, 1);
    }
  }
});