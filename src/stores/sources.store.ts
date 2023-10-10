import { defineStore } from 'pinia'
import type { TSource } from '@/utils/types/composition/source.type';
import type { TSourcesStore } from '@/utils/types/store/sourceStore.type';



export const useSourcesStore = defineStore('sources', {
  state: (): TSourcesStore => ({
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
    addSource(source: TSource) {
      this.sources.push(source);
    }
  }
});