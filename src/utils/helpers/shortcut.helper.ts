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
    const detectShortcut = document.activeElement?.nodeName.toLocaleLowerCase() !== 'input';

    switch (code) {
      case Key.ToggleFullscreen: {
        if (detectShortcut) {
          appStore.toggleFullscreen();
        }

        break;
      }

      case Key.Close: {
        modalStore.closeModal();
        break;
      }

      case Key.Add: {
        const addButton = document.getElementById('button-add-modal');
        addButton?.click();

        break;
      }

      case Key.ToggleMute: {
        sourceStore.setMuted(!sourceStore.muted);
        break;
      }

      case Key.TogglePlay: {
        sourceStore.setPlaying(!sourceStore.playing);
        break;
      }

      case Key.Forward: {
        sourceStore.onSeek(appStore.seekStep);
        break;
      }

      case Key.Backward: {
        sourceStore.onSeek(-appStore.seekStep);
        break;
      }

      case Key.VolumeUp: {
        sourceStore.setVolume(sourceStore.volume + appStore.volumeStep);
        break;
      }

      case Key.VolumeDown: {
        sourceStore.setVolume(sourceStore.volume - appStore.volumeStep);
        break;
      }

      case Key.SpeedUp: {
        const speedIndex = speed.indexOf(sourceStore.speed);
        const index = MathHelper.clamp(speedIndex + 1, 0, speed.length - 1);

        sourceStore.setSpeed(speed[index]);
        break;
      }

      case Key.SpeedDown: {
        const speedIndex = speed.indexOf(sourceStore.speed);
        const index = MathHelper.clamp(speedIndex - 1, 0, speed.length - 1);

        sourceStore.setSpeed(speed[index]);
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