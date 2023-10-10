import { hookSourcesEffect } from './sources.effect'



/**
 * @description
 * Hooks in all effects
 */
export function hookEffects() {
  hookSourcesEffect();
}