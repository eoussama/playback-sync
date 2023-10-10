import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'



/**
 * @description
 * Loads Font Awesome icons
 */
export function loadIcons(): void {
  library.add(faPlay, faPause);
}