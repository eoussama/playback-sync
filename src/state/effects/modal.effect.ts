import { useModalStore } from '../stores/modal.store';
import { useSourcesStore } from '../stores/sources.store';



/**
 * @description
 * Hooks in modal effects
 */
export function hookModalEffect() {
  const modalStore = useModalStore();
  const sourcesStore = useSourcesStore();

  modalStore.$onAction(({ name, after }) => {
    after(() => {
      switch (name) {
        case 'addModal': {
          sourcesStore.setPlaying(false);
          break;
        }
      }
    });
  });
}