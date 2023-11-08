import { useAppStore } from '../stores/app.store';

import { Theme } from '@/utils/enums/theme.enum';

import { ToastHelper } from '@/utils/helpers/toast.helper';
import { ThemeHelper } from '@/utils/helpers/theme.helper';



/**
 * @description
 * Hooks in app effects
 */
export function hookAppEffect() {
  const appStore = useAppStore();

  document.documentElement.onfullscreenchange = () => {
    const fullscreen = Boolean(document.fullscreenElement);
    appStore.updateFullscreen(fullscreen);
  }

  appStore.$onAction(({ name, store, after, args }) => {
    after(() => {
      switch (name) {
        case 'updateFullscreen': {
          if (store.fullscreen && !document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else if (!store.fullscreen && document.fullscreenElement) {
            document.exitFullscreen();
          }

          break;
        }

        case 'updateTheme': {
          const [theme] = args;
          const message = theme === Theme.Light ? 'Light Theme On' : 'Dark Theme On';

          ThemeHelper.updateTheme(theme);
          ToastHelper.show({ message });

          break;
        }
      }
    });
  });
}