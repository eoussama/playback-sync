import PlyrLib from "plyr";

import { ReadyState } from "../enums/readyState.enum";
import { SourceType } from "../enums/sourceType.enum";



// ─── Minimal Plyr interface ────────────────────────────────────────────────────
// We define only the members we actually use, avoiding Plyr's export= type issues.

interface IPlyrEvent {
  type: string;
}

interface IPlyrOptions {
  controls?: string[];
  clickToPlay?: boolean;
  keyboard?: { focused?: boolean; global?: boolean };
  tooltips?: { controls?: boolean; seek?: boolean };
  youtube?: Record<string, unknown>;
  vimeo?: Record<string, unknown>;
  [key: string]: unknown;
}

interface IPlyr {
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  speed: number;
  media: HTMLVideoElement | HTMLAudioElement | HTMLIFrameElement | null;
  play: () => Promise<void> | void;
  pause: () => void;
  destroy: () => void;
  on: (event: string, callback: (e: IPlyrEvent) => void) => void;
  off: (event: string, callback: (e: IPlyrEvent) => void) => void;
}

interface IPlyrConstructor {
  new(target: HTMLElement | string, options?: IPlyrOptions): IPlyr;
}

const PlyrCtor = PlyrLib as unknown as IPlyrConstructor;



/**
 * @description
 * A duck-typed adapter around a Plyr instance that mimics the HTMLVideoElement API,
 * allowing SourceHelper to work uniformly across native and embedded sources.
 */
export class PlayerAdapter {
  private _plyr: IPlyr;
  private _sourceType: SourceType;
  private _ready: boolean = false;

  /**
   * @description
   * Creates a new PlayerAdapter wrapping a Plyr instance
   *
   * @param plyr The underlying Plyr instance
   * @param sourceType The type of source (native, YouTube, Vimeo, etc.)
   */
  constructor(plyr: IPlyr, sourceType: SourceType) {
    this._plyr = plyr;
    this._sourceType = sourceType;

    plyr.on("ready", () => {
      this._ready = true;
    });

    plyr.on("canplay", () => {
      this._ready = true;
    });
  }

  /**
   * @description
   * The underlying Plyr instance
   *
   * @returns The Plyr instance
   */
  get plyr(): IPlyr {
    return this._plyr;
  }

  /**
   * @description
   * The type of source being played
   *
   * @returns The SourceType enum value
   */
  get sourceType(): SourceType {
    return this._sourceType;
  }

  /**
   * @description
   * Whether this is a native (non-embedded) player
   *
   * @returns Whether the source is native
   */
  get isNative(): boolean {
    return this._sourceType === SourceType.Native;
  }

  // ─── HTMLVideoElement-compatible API ────────────────────────────────────────

  /**
   * @description
   * The current playback position in seconds
   *
   * @returns The current time in seconds
   */
  get currentTime(): number {
    return this._plyr.currentTime ?? 0;
  }

  /**
   * @description
   * Sets the current playback position in seconds
   */
  set currentTime(value: number) {
    try {
      this._plyr.currentTime = value;
    }
    catch {
      // Embedded players may reject seeks before ready
    }
  }

  /**
   * @description
   * The total duration of the media in seconds
   *
   * @returns The duration in seconds
   */
  get duration(): number {
    return this._plyr.duration ?? 0;
  }

  /**
   * @description
   * The current volume level (0–1)
   *
   * @returns The volume level
   */
  get volume(): number {
    return this._plyr.volume ?? 1;
  }

  /**
   * @description
   * Sets the volume level (0–1)
   */
  set volume(value: number) {
    try {
      this._plyr.volume = value;
    }
    catch {
      // Ignore
    }
  }

  /**
   * @description
   * Whether the player is currently muted
   *
   * @returns The muted state
   */
  get muted(): boolean {
    return this._plyr.muted ?? false;
  }

  /**
   * @description
   * Sets the muted state
   */
  set muted(value: boolean) {
    this._plyr.muted = value;
  }

  /**
   * @description
   * The current playback speed
   *
   * @returns The playback rate multiplier
   */
  get playbackRate(): number {
    return this._plyr.speed ?? 1;
  }

  /**
   * @description
   * Sets the playback speed
   */
  set playbackRate(value: number) {
    try {
      this._plyr.speed = value;
    }
    catch {
      // Some embeds don't support speed changes
    }
  }

  /**
   * @description
   * Approximate readyState — returns HaveEnoughData when the player is ready,
   * HaveNothing otherwise. Used for sync checks.
   *
   * @returns The readyState value
   */
  get readyState(): number {
    if (this.isNative) {
      const el = this._plyr.media as HTMLVideoElement;

      return el?.readyState ?? ReadyState.HaveNothing;
    }

    return this._ready ? ReadyState.HaveEnoughData : ReadyState.HaveNothing;
  }

  /**
   * @description
   * Starts playback
   *
   * @returns A promise that resolves when playback starts
   */
  play(): Promise<void> {
    return (this._plyr.play() as Promise<void> | undefined) ?? Promise.resolve();
  }

  /**
   * @description
   * Pauses playback
   */
  pause(): void {
    this._plyr.pause();
  }

  /**
   * @description
   * Reloads the media source (native only)
   */
  load(): void {
    if (this.isNative) {
      const el = this._plyr.media as HTMLVideoElement;

      el?.load();
    }
  }

  // ─── Event subscription ──────────────────────────────────────────────────────

  /**
   * @description
   * Subscribes to the play event
   *
   * @param fn The callback function
   */
  onPlay(fn: () => void): void {
    this._plyr.on("play", fn);
  }

  /**
   * @description
   * Subscribes to the pause event
   *
   * @param fn The callback function
   */
  onPause(fn: () => void): void {
    this._plyr.on("pause", fn);
  }

  /**
   * @description
   * Subscribes to the timeupdate event
   *
   * @param fn The callback function
   */
  onTimeUpdate(fn: () => void): void {
    this._plyr.on("timeupdate", fn);
  }

  /**
   * @description
   * Subscribes to the volumechange event
   *
   * @param fn The callback function
   */
  onVolumeChange(fn: () => void): void {
    this._plyr.on("volumechange", fn);
  }

  /**
   * @description
   * Subscribes to the ratechange event
   *
   * @param fn The callback function
   */
  onRateChange(fn: () => void): void {
    this._plyr.on("ratechange", fn);
  }

  /**
   * @description
   * Subscribes to the waiting event
   *
   * @param fn The callback function
   */
  onWaiting(fn: () => void): void {
    this._plyr.on("waiting", fn);
  }

  /**
   * @description
   * Subscribes to the canplay event
   *
   * @param fn The callback function
   */
  onCanPlay(fn: () => void): void {
    this._plyr.on("canplay", fn);
  }

  /**
   * @description
   * Subscribes to the loadedmetadata event
   *
   * @param fn The callback function
   */
  onLoadedMetadata(fn: () => void): void {
    this._plyr.on("loadedmetadata", fn);
  }

  // ─── Cleanup ─────────────────────────────────────────────────────────────────

  /**
   * @description
   * Destroys the Plyr instance and frees resources
   */
  destroy(): void {
    try {
      this._plyr.destroy();
    }
    catch {
      // Ignore errors on destroy
    }
  }
}



/**
 * @description
 * Registry that stores PlayerAdapter instances keyed by source ID
 */
export class PlayerHelper {
  private static _registry: Map<string, PlayerAdapter> = new Map();

  /**
   * @description
   * Stores a PlayerAdapter for a given source ID
   *
   * @param id The source ID
   * @param adapter The PlayerAdapter instance
   */
  static set(id: string, adapter: PlayerAdapter): void {
    const existing = this._registry.get(id);

    if (existing) {
      existing.destroy();
    }

    this._registry.set(id, adapter);
  }

  /**
   * @description
   * Retrieves a PlayerAdapter for a given source ID
   *
   * @param id The source ID
   * @returns The PlayerAdapter instance or undefined
   */
  static get(id: string): PlayerAdapter | undefined {
    return this._registry.get(id);
  }

  /**
   * @description
   * Destroys and removes a PlayerAdapter for a given source ID
   *
   * @param id The source ID
   */
  static destroy(id: string): void {
    const adapter = this._registry.get(id);

    if (adapter) {
      adapter.destroy();
      this._registry.delete(id);
    }
  }

  /**
   * @description
   * Waits until a PlayerAdapter is registered for the given source ID
   *
   * @param id The source ID
   * @returns A promise that resolves with the PlayerAdapter once available
   */
  static watch(id: string): Promise<PlayerAdapter> {
    return new Promise((resolve) => {
      const existing = this._registry.get(id);

      if (existing) {
        return resolve(existing);
      }

      const interval = setInterval(() => {
        const adapter = this._registry.get(id);

        if (adapter) {
          clearInterval(interval);
          resolve(adapter);
        }
      }, 50);
    });
  }

  /**
   * @description
   * Creates and registers a new Plyr instance for a given DOM element
   *
   * @param id The source ID
   * @param elementId The DOM element ID to initialize Plyr on
   * @param sourceType The type of source
   * @returns The created PlayerAdapter
   */
  static create(id: string, elementId: string, sourceType: SourceType): PlayerAdapter {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Player element #${elementId} not found`);
    }

    const plyrOptions: IPlyrOptions = {
      controls: [],
      clickToPlay: false,
      keyboard: { focused: false, global: false },
      tooltips: { controls: false, seek: false },
      youtube: {
        noCookie: false,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
      vimeo: {
        byline: false,
        portrait: false,
        title: false,
        speed: true,
        transparent: false,
      },
    };

    const plyr = new PlyrCtor(element as HTMLElement, plyrOptions);
    const adapter = new PlayerAdapter(plyr, sourceType);

    this.set(id, adapter);

    return adapter;
  }
}
