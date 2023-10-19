import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbTack,
  faPlay, faPause, faRepeat, faBackward, faForward,
  faVolumeOff, faVolumeLow, faVolumeHigh, faVolumeXmark,
  faPlus, faXmark, faCheck, faPen, faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';



/**
 * @description
 * Loads Font Awesome icons
 */
export function loadIcons(): void {
  library.add(
    faThumbTack,
    faPlay, faPause, faRepeat, faBackward, faForward,
    faVolumeOff, faVolumeLow, faVolumeHigh, faVolumeXmark,
    faPlus, faXmark, faCheck, faPen, faTriangleExclamation
  );
}