import type { VitePWAOptions } from "vite-plugin-pwa";

import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json";
import pwa from "./src/utils/const/pwa.const";



export default defineConfig({
  base: `/${pkg.name}`,
  plugins: [
    vue(),
    VitePWA(pwa as Partial<VitePWAOptions>),
  ],
  define: {
    __CONFIG__: {
      version: pkg.version,
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
