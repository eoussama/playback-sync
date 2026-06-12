/// <reference types="vite/client" />
declare const __CONFIG__: { version: string };

// Plyr's bundled .d.ts uses both `export =` and `export default` which causes
// TypeScript to drop the default export under moduleResolution:"bundler".
// This augmentation re-adds a default export so that `import PlyrLib from "plyr"` works.
declare module "plyr" {
  const PlyrDefault: unknown;

  export default PlyrDefault;
}
