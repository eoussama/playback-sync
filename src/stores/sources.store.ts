import { defineStore } from 'pinia'

export const useSourcesStore = defineStore('sources', {
  state: () => ({
    sources: [{x: 'true'}],
  }),
});