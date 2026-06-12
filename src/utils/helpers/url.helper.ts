import { SourceType } from "../enums/sourceType.enum";



/**
 * @description
 * Helps with URL parsing and source type detection
 */
export class UrlHelper {
  /**
   * @description
   * Determines the type of a source URL
   *
   * @param url The URL to check
   * @returns The detected source type
   */
  static getType(url: string): SourceType {
    if (!url || url.trim().length === 0) {
      return SourceType.Native;
    }

    if (this.isYouTube(url)) {
      return SourceType.YouTube;
    }

    if (this.isVimeo(url)) {
      return SourceType.Vimeo;
    }

    return SourceType.Native;
  }

  /**
   * @description
   * Checks if a URL is a YouTube link
   *
   * @param url The URL to check
   * @returns Whether the URL is a YouTube link
   */
  static isYouTube(url: string): boolean {
    return /youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\//.test(url);
  }

  /**
   * @description
   * Checks if a URL is a Vimeo link
   *
   * @param url The URL to check
   * @returns Whether the URL is a Vimeo link
   */
  static isVimeo(url: string): boolean {
    return /vimeo\.com\//.test(url);
  }

  /**
   * @description
   * Checks if a URL is a native video file
   *
   * @param url The URL to check
   * @returns Whether the URL is a native video file
   */
  static isNative(url: string): boolean {
    return this.getType(url) === SourceType.Native;
  }

  /**
   * @description
   * Extracts the YouTube video ID from a URL
   *
   * @param url The YouTube URL
   * @returns The extracted video ID or null
   */
  static getYouTubeId(url: string): string | null {
    const patterns = [
      /youtube\.com\/watch\?(?:.*&)?v=([^&]+)/,
      /youtube\.com\/shorts\/([^/?]+)/,
      /youtube\.com\/embed\/([^/?]+)/,
      /youtu\.be\/([^/?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);

      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * @description
   * Extracts the Vimeo video ID from a URL
   *
   * @param url The Vimeo URL
   * @returns The extracted video ID or null
   */
  static getVimeoId(url: string): string | null {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);

    return match ? match[1] : null;
  }

  /**
   * @description
   * Extracts the embed ID for a given URL based on its detected source type
   *
   * @param url The URL to extract the embed ID from
   * @returns The embed ID string or null
   */
  static getEmbedId(url: string): string | null {
    const type = this.getType(url);

    switch (type) {
      case SourceType.YouTube:
        return this.getYouTubeId(url);

      case SourceType.Vimeo:
        return this.getVimeoId(url);

      default:
        return null;
    }
  }
}
