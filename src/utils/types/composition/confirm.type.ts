/**
 * @description
 * The confirmation object
 */
export type TConfirm = {

  /**
   * @description
   * The title of the confirmation
   */
  title: string

  /**
   * @description
   * The Icon of the confirmation dialog
   */
  icon: string

  /**
   * @description
   * The message to show on the confirmation dialog
   */
  message: string

  /**
   * @description
   * The label to display on the rejection button
   */
  rejectLabel: string

  /**
   * @description
   * The label to display on the confirmation button
   */
  resolveLabel: string
}