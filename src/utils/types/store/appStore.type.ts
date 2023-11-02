/**
 * @description
 * The app store structure
 */
export type TAppStore = {

  /**
   * @description
   * The state of the fullscreen mode
   */
  fullscreen: boolean

  /**
   * @description
   * If areas are hovered
   */
  hover: {

    /**
     * @description
     * The head area
     */
    head: boolean

    /**
     * @description
     * The foot area
     */
    foot: boolean
  }
}