import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus, faXmark,
  faPlay, faPause, faRepeat, faBackward, faForward,
  faVolumeOff, faVolumeLow, faVolumeHigh, faVolumeXmark
} from '@fortawesome/free-solid-svg-icons';



/**
 * @description
 * Loads Font Awesome icons
 */
export function loadIcons(): void {
  library.add(
    faPlus, faXmark,
    faPlay, faPause, faRepeat, faBackward, faForward,
    faVolumeOff, faVolumeLow, faVolumeHigh, faVolumeXmark
  );
}