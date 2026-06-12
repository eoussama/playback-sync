import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBackward,
  faCheck,
  faChevronDown,
  faCircleCheck,
  faCircleHalfStroke,
  faCircleNotch,
  faCompress,
  faEllipsisVertical,
  faExpand,
  faFolderOpen,
  faForward,
  faHourglassHalf,
  faLink,
  faMoon,
  faMusic,
  faPause,
  faPen,
  faPlay,
  faPlus,
  faQuestion,
  faRepeat,
  faSun,
  faThumbTack,
  faTrash,
  faTriangleExclamation,
  faUpload,
  faVideo,
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
  faVolumeXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";



/**
 * @description
 * Loads Font Awesome icons
 */
export function initIcons(): void {
  library.add(
    faEllipsisVertical,
    faMoon,
    faSun,
    faExpand,
    faCompress,
    faQuestion,
    faVideo,
    faMusic,
    faCircleNotch,
    faHourglassHalf,
    faThumbTack,
    faTrash,
    faGithub,
    faChevronDown,
    faPlay,
    faPause,
    faRepeat,
    faBackward,
    faForward,
    faVolumeOff,
    faVolumeLow,
    faVolumeHigh,
    faVolumeXmark,
    faPlus,
    faXmark,
    faCheck,
    faPen,
    faCircleCheck,
    faCircleHalfStroke,
    faFolderOpen,
    faLink,
    faTriangleExclamation,
    faUpload,
  );
}

/**
 * @description
 * Gets a contextual volume icon
 *
 * @param volume The volume value
 * @param muted The mute state value
 * @returns The volume icon name
 */
export function getVolumeIcon(volume: number, muted: boolean): string {
  if (muted || volume === 0) {
    return "volume-xmark";
  }
  else if (volume < 30) {
    return "volume-off";
  }
  else if (volume < 60) {
    return "volume-low";
  }
  else {
    return "volume-high";
  }
}
