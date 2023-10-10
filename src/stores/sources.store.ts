import { defineStore } from 'pinia'
import type { TSource } from '@/utils/types/composition/source.type';
import type { TSourcesStore } from '@/utils/types/store/sourceStore.type';



export const useSourcesStore = defineStore('sources', {
  state: (): TSourcesStore => ({
    sources: [
      {
        title: 'Futari no Yakusoku',
        url: 'https://v.animethemes.moe/Basquash-ED3.webm'
      },
      {
        title: 'Brave',
        url: 'https://v.animethemes.moe/Kindaichi-OP4.webm'
      }
    ],
  }),
  actions: {
    addSource(source: TSource) {
      this.sources.push(source);
    }
  }
});