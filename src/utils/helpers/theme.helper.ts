import type { Theme } from '../enums/theme.enum';



/**
 * @description
 * Helps with theming
 */
export class ThemeHelper {


  /**
   * @description
   * Updates app theme
   *
   * @param theme The theme to update to
   */
  static updateTheme(theme: Theme): void {
    const root = document.querySelector(':root') as HTMLElement;

    if (theme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}