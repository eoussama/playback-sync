import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';



/**
 * @description
 * Initializes GSAP plugins
 */
export function initGSAP(): void {
  gsap.registerPlugin(Draggable);
}