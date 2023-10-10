import { defineStore } from 'pinia'
import type { TSource } from '@/utils/types/composition/source.type'
import type { TSourcesStore } from '@/utils/types/store/sourceStore.type'



export const useSourcesStore = defineStore('sources', {
  state: (): TSourcesStore => ({
    speed: 1,
    volume: 1,
    playing: false,
    sources: [
      {
        title: 'Futari no Yakusoku',
        id: 'fd848919-a91b-491b-a682-e1e2e7a27d46',
        url: 'https://v.animethemes.moe/Basquash-ED3.webm'
      },
      {
        title: 'Brave',
        id: 'dceb1b73-4029-4f29-8dce-f5ff693c4262',
        url: 'https://v.animethemes.moe/Kindaichi-OP4.webm'
      }
    ],
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
     * Adds a new source
     */
    addSource(source: TSource) {
      this.sources.push(source);
    }
  }
});