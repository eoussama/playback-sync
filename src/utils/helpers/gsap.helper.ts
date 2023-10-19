import { gsap } from 'gsap';

import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';



/**
 * @description
 * Initializes GSAP plugins
 */
export function initGSAP(): void {
  gsap.registerPlugin(Flip, Draggable);
}