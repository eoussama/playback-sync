import { Validation } from '../enums/validation.enum';
import type { TSource } from '../types/composition/source.type';



/**
 * @description
 * helps with form validation
 */
export class ValidationHelper {

  /**
   * @description
   * Validates a value
   *
   * @param input The input name
   * @param value The value to validate
   */
  static isInvalid(input: keyof TSource, value: any): false | Validation {
    switch (input) {
      case 'title': {
        return this.validateTitle(value);
        break;
      }

      case 'url': {
        return this.validateURL(value);
        break;
      }

      default: {
        return value != null ? Validation.Error : false;
      }
    }
  }

  /**
   * @description
   * Returns a proper message for an error
   *
   * @param error The error to get the message for
   */
  static getErrorMessage(error: false | Validation): string {
    switch (error) {
      case Validation.Error: {
        return 'Invalid value';
        break;
      }

      case Validation.TitleEmpty: {
        return 'The title is required';
        break;
      }

      case Validation.URLEmpty: {
        return 'The URL is required';
        break;
      }

      case Validation.URLInvalid: {
        return 'The URL is invalid';
        break;
      }

      default: {
        return '';
      }
    }
  }

  /**
   * @description
   * Validates titles
   *
   * @param title The title to validate
   */
  private static validateTitle(title: any): false | Validation {
    return title?.length > 0 ? false : Validation.TitleEmpty;
  }
  
  /**
   * @description
   * Validates URLs
  *
  * @param url The URL to validate
  */
 private static validateURL(url: any): false | Validation {
    return url?.length > 0 ? false : Validation.URLEmpty;
  }
}