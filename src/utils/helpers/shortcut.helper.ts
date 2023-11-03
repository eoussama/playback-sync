import { Key } from '../enums/key.enum';
import { speed } from '../const/speed.const';

import { MathHelper } from './math.helper';

import { useAppStore } from '@/state/stores/app.store';
import { useModalStore } from '@/state/stores/modal.store';
import { useSourcesStore } from '@/state/stores/sources.store';



/**
 * @description
 * Initializes the shortcut manager
 */
export function initShortcuts(): void {
  const appStore = useAppStore();
  const modalStore = useModalStore();
  const sourceStore = useSourcesStore();

  window.onkeydown = ({ code }) => {
    if (code === Key.Fullscreen) {
      return false;
    }
  }

  window.onkeyup = ({ code }) => {
    const focusedElementName = document.activeElement?.nodeName.toLocaleLowerCase();
    const noButtonFocused = focusedElementName !== 'button';
    const notInputFocused = focusedElementName !== 'input';

    switch (code) {
      case Key.Close: {
        modalStore.closeModal();
        break;
      }

      case Key.Validate: {
        appStore.onValidate();
        break;
      }

      case Key.ToggleFullscreen: {
        if (notInputFocused) {
          appStore.toggleFullscreen();
        }

        break;
      }

      case Key.Add: {
        if (notInputFocused) {
          const addButton = document.getElementById('button-add-modal');
          addButton?.click();
        }

        break;
      }

      case Key.Shortcuts: {
        if (notInputFocused) {
          const addButton = document.getElementById('button-shortcuts');
          addButton?.click();
        }

        break;
      }

      case Key.ToggleMute: {
        if (notInputFocused) {
          sourceStore.setMuted(!sourceStore.muted);
          break;
        }
      }

      case Key.TogglePlay: {
        if (noButtonFocused && notInputFocused) {
          sourceStore.setPlaying(!sourceStore.playing);
        }

        break;
      }

      case Key.Forward: {
        if (notInputFocused) {
          sourceStore.onSeek(appStore.seekStep);
        }

        break;
      }

      case Key.Backward: {
        if (notInputFocused) {
          sourceStore.onSeek(-appStore.seekStep);
        }

        break;
      }

      case Key.VolumeUp: {
        if (notInputFocused) {
          sourceStore.setVolume(sourceStore.volume + appStore.volumeStep);
        }

        break;
      }

      case Key.VolumeDown: {
        if (notInputFocused) {
          sourceStore.setVolume(sourceStore.volume - appStore.volumeStep);
        }

        break;
      }

      case Key.SpeedUp: {
        if (notInputFocused) {
          const speedIndex = speed.indexOf(sourceStore.speed);
          const index = MathHelper.clamp(speedIndex + 1, 0, speed.length - 1);

          sourceStore.setSpeed(speed[index]);
        }

        break;
      }

      case Key.SpeedDown: {
        if (notInputFocused) {
          const speedIndex = speed.indexOf(sourceStore.speed);
          const index = MathHelper.clamp(speedIndex - 1, 0, speed.length - 1);

          sourceStore.setSpeed(speed[index]);
        }

        break;
      }
    }
  }
}

// /**
//  * @description
//  * Helps with shortcuts
//  */
// export class ShortcutHelper {

//   /**
//    * @description
//    * Listens for key events
//    *
//    * @param key The key to listen to
//    */
//   static async on(key: string): Promise<void> {
//     return new Promise(resolve => {
//       const listener = (e: KeyboardEvent) => {
//         if (e.code === key) {
//           resolve();
//           window.removeEventListener('keyup', listener);
//         }
//       }

//       window.addEventListener('keyup', listener);
//     });
//   }
// }