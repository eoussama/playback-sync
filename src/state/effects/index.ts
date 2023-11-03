import { hookAppEffect } from './app.effect';
import { hookModalEffect } from './modal.effect';
import { hookSourcesEffect } from './sources.effect';



/**
 * @description
 * Hooks in all effects
 */
export function initEffects() {
  hookAppEffect();
  hookModalEffect();
  hookSourcesEffect();
}