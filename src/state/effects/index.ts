import { hookModalEffect } from './modal.effect';
import { hookSourcesEffect } from './sources.effect';



/**
 * @description
 * Hooks in all effects
 */
export function hookEffects() {
  hookModalEffect();
  hookSourcesEffect();
}