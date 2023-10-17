/**
 * @description
 * Individual select option
 */
export type TOption<T = number> = {

  /**
   * @description
   * The label of the option
   */
  label: string

  /**
   * @description
   * The value of the option
   */
  value: T
}