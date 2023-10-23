import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faThumbTack, faTrash, faChevronDown, faVideo,
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
    faVideo,
    faThumbTack, faTrash, faGithub, faChevronDown,
    faPlay, faPause, faRepeat, faBackward, faForward,
    faVolumeOff, faVolumeLow, faVolumeHigh, faVolumeXmark,
    faPlus, faXmark, faCheck, faPen, faTriangleExclamation
  );
}