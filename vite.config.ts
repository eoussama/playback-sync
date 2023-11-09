import { fileURLToPath, URL } from 'node:url';

import pkg from './package.json';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/playback-sync',
  plugins: [
    vue(),
  ],
  define: {
    __CONFIG__: {
      version: pkg.version
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
