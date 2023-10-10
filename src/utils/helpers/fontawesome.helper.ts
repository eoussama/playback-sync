import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faBackward } from '@fortawesome/free-solid-svg-icons'



/**
 * @description
 * Loads Font Awesome icons
 */
export function loadIcons(): void {
  library.add(faPlay, faPause, faBackward);
}