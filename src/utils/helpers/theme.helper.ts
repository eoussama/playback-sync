import { ref } from "vue";

import { Theme } from "../enums/theme.enum";



/**
 * @description
 * The media query string for detecting system dark mode preference
 */
const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * @description
 * The resolved media query list for system dark mode preference
 */
const systemDarkQuery = window.matchMedia(PREFERS_DARK_QUERY);

/**
 * @description
 * Reactive reference to the system's current dark mode preference.
 * Updating this ref triggers re-evaluation of any Vue computed
 * property that reads it (e.g., component-level isDark computeds).
 */
const systemDark = ref(systemDarkQuery.matches);



/**
 * @description
 * Helps with theming
 */
export class ThemeHelper {
  /**
   * @description
   * Returns whether the effective theme resolves to dark,
   * accounting for Auto mode via the reactive system preference ref.
   *
   * @param theme The theme setting to evaluate
   * @returns Whether the effective theme is dark
   */
  static isDark(theme: Theme): boolean {
    if (theme === Theme.Dark) {
      return true;
    }

    if (theme === Theme.Auto) {
      return systemDark.value;
    }

    return false;
  }

  /**
   * @description
   * Returns the system-preferred theme (Light or Dark)
   *
   * @returns The system-preferred theme
   */
  static getSystemTheme(): Theme {
    return systemDark.value ? Theme.Dark : Theme.Light;
  }

  /**
   * @description
   * Registers a listener on the system dark mode media query.
   * Returns a cleanup function to remove the listener.
   *
   * @param callback Optional callback invoked when the system preference changes
   * @returns A function that removes the registered listener
   */
  static setupAutoListener(callback?: () => void): () => void {
    const listener = (e: MediaQueryListEvent): void => {
      systemDark.value = e.matches;
      callback?.();
    };

    systemDarkQuery.addEventListener("change", listener);

    return () => {
      systemDarkQuery.removeEventListener("change", listener);
    };
  }

  /**
   * @description
   * Updates the DOM root class to reflect the effective theme
   *
   * @param theme The theme to apply
   */
  static updateTheme(theme: Theme): void {
    const root = document.querySelector(":root") as HTMLElement;

    if (ThemeHelper.isDark(theme)) {
      root.classList.add("dark");
    }
    else {
      root.classList.remove("dark");
    }
  }
}
