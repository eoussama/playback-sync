/**
 * @description
 * The app store structure
 */
export type TAppStore = {

  /**
   * @description
   * The the number of seconds to seek by
   */
  seek: number

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
     * The head hover
     */
    head: boolean

    /**
     * @description
     * The controls hover
     */
    controls: boolean

    /**
     * @description
     * The foot hover
     */
    foot: boolean
  }
}