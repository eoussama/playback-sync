import { Theme } from "@/utils/enums/theme.enum";

import { ThemeHelper } from "@/utils/helpers/theme.helper";
import { ToastHelper } from "@/utils/helpers/toast.helper";
import { useAppStore } from "../stores/app.store";



/**
 * @description
 * Hooks in app effects
 */
export function hookAppEffect() {
  const appStore = useAppStore();

  // Apply the initial theme on startup and register the system preference listener
  ThemeHelper.updateTheme(appStore.theme);

  ThemeHelper.setupAutoListener(() => {
    ThemeHelper.updateTheme(appStore.theme);
  });

  document.documentElement.onfullscreenchange = () => {
    const fullscreen = Boolean(document.fullscreenElement);

    appStore.updateFullscreen(fullscreen);
  };

  appStore.$onAction(({ name, after, args }) => {
    after(() => {
      switch (name) {
        case "updateFullscreen": {
          if (appStore.fullscreen && !document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          }
          else if (!appStore.fullscreen && document.fullscreenElement) {
            document.exitFullscreen();
          }

          break;
        }

        case "updateTheme": {
          const [theme] = args;

          ThemeHelper.updateTheme(theme);

          const messages: Record<Theme, string> = {
            [Theme.Auto]: "Auto Theme On",
            [Theme.Light]: "Light Theme On",
            [Theme.Dark]: "Dark Theme On",
          };

          ToastHelper.show({ message: messages[theme as Theme] });

          break;
        }
      }
    });
  });
}
