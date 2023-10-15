import { useSourcesStore } from '../stores/sources.store';
import { SourceHelper } from '@/utils/helpers/source.helper';



/**
 * @description
 * Hooks in sources effects
 */
export function hookSourcesEffect() {
  const store = useSourcesStore();

  store.$onAction(({ name, store, args, after }) => {
    after(() => {
      switch (name) {
        case 'setPlaying': {
          for (const source of store.sources) {
            if (store.playing) {
              SourceHelper.play(source.id);
            } else {
              SourceHelper.pause(source.id);
            }
          }

          break;
        }

        case 'setMuted': {
          for (const source of store.sources) {
            SourceHelper.setVolume(source.id, store.volume);
            SourceHelper.mute(source.id, store.muted);
          }

          break;
        }

        case 'setVolume': {
          store.muted = false;

          for (const source of store.sources) {
            SourceHelper.mute(source.id, false);
            SourceHelper.setVolume(source.id, store.volume);
          }

          break;
        }

        case 'setSpeed': {
          for (const source of store.sources) {
            SourceHelper.setSpeed(source.id, store.speed);
          }

          break;
        }

        case 'seek': {
          for (const source of store.sources) {
            SourceHelper.seek(source.id, ...args);
          }

          break;
        }

        case 'setTimeline': {
          for (const source of store.sources) {
            SourceHelper.setTime(source.id, ...args);
          }

          break;
        }

        case 'updateSource': {
          const [source] = args;
          SourceHelper.refresh(source.id);

          break;
        }

        case 'updateSourceMetadata': {
          const [id, metadata] = args;

          if ('playing' in metadata) {
            if (store.sources.every(e => e.metadata.playing === metadata.playing)) {
              store.playing = metadata.playing ?? store.playing;
            }
          }

          if ('muted' in metadata) {
            if (metadata.muted && store.sources.every(e => e.metadata.muted === metadata.muted)) {
              store.muted = true;
            }

            else if (!metadata.muted && store.sources.some(e => e.metadata.muted === metadata.muted)) {
              store.muted = false;
            }
          }

          break;
        }
      }
    });
  });
}