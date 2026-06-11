import type { TSource } from "../types/composition/source.type";
import { Validation } from "../enums/validation.enum";



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
   * @returns The validation error or false if valid
   */
  static isInvalid(input: keyof TSource, value: unknown): false | Validation {
    switch (input) {
      case "title": {
        return this.validateTitle(value);
        break;
      }

      case "url": {
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
   * @returns The error message string
   */
  static getErrorMessage(error: false | Validation): string {
    switch (error) {
      case Validation.Error: {
        return "Invalid value";
        break;
      }

      case Validation.TitleEmpty: {
        return "The title is required";
        break;
      }

      case Validation.URLEmpty: {
        return "The URL is required";
        break;
      }

      case Validation.URLInvalid: {
        return "The URL is invalid";
        break;
      }

      default: {
        return "";
      }
    }
  }

  /**
   * @description
   * Validates titles
   *
   * @param title The title to validate
   * @returns The validation result
   */
  private static validateTitle(title: unknown): false | Validation {
    return (title as string)?.length > 0 ? false : Validation.TitleEmpty;
  }

  /**
   * @description
   * Validates URLs
   *
   * @param url The URL to validate
   * @returns The validation result
   */
  private static validateURL(url: unknown): false | Validation {
    return (url as string)?.length > 0 ? false : Validation.URLEmpty;
  }
}
