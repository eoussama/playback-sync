import { useModalStore } from "../stores/modal.store";
import { useSourcesStore } from "../stores/sources.store";



/**
 * @description
 * Hooks in modal effects
 */
export function hookModalEffect() {
  const modalStore = useModalStore();
  const sourcesStore = useSourcesStore();

  modalStore.$onAction(({ name, args, after }) => {
    after(() => {
      switch (name) {
        case "addModal": {
          const [modal] = args;

          if (modal.params?.interrupting) {
            sourcesStore.setPlaying(false);
          }

          break;
        }
      }
    });
  });
}
