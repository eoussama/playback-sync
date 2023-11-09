import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import config from './package.json';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/playback-sync',
  plugins: [
    vue(),
  ],
  define: {
    __CONFIG__: {
      version: config.version
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
