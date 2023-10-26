import { useSourcesStore } from '../stores/sources.store';
import { SourceHelper } from '@/utils/helpers/source.helper';



/**
 * @description
 * Hooks in sources effects
 */
export function hookSourcesEffect() {
  const store = useSourcesStore();

  store.$onAction(({ name, store, args, after }) => {
    let cachedCurrentTime = 0;

    if (name === 'switchSources') {
      cachedCurrentTime = store.longestSource.metadata?.currentTime;
    }

    after(() => {
      switch (name) {
        case 'addSource': {
          const [{ id }] = args;
          SourceHelper.hook(id);

          break;
        }

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

        case 'setBufferPause': {
          for (const source of store.sources) {
            if (store.bufferPause) {
              SourceHelper.pause(source.id);
            } else {
              SourceHelper.play(source.id);
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

        case 'switchSources': {
          const [id1, id2] = args;

          setTimeout(() => {
            [id1, id2].forEach(id => {
              SourceHelper.hook(id);
              SourceHelper.setTime(id, cachedCurrentTime);
            })
          });

          break;
        }

        case 'toggleSourcePin': {
          const [id, pinned] = args;

          if (pinned) {
            SourceHelper.pin(id);
          } else {
            SourceHelper.unpin(id);
          }

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
            SourceHelper.mute(id, Boolean(metadata.muted));

            if (metadata.muted && store.sources.every(e => e.metadata.muted === metadata.muted)) {
              store.muted = true;
            } else if (!metadata.muted && store.sources.some(e => e.metadata.muted === metadata.muted)) {
              store.muted = false;
            }
          }

          if ('buffering' in metadata) {
            if (store.playing) {
              store.setBufferPause(store.sources.some(e => e.metadata.buffering));
            }
          }

          break;
        }
      }
    });
  });
}