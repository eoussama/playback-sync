import { useAppStore } from '../stores/app.store';



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

  appStore.$onAction(({ name, store, after }) => {
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
      }
    });
  });
}