import { v4 } from 'uuid';
import { useModalStore } from '@/state/stores/modal.store';
import type { TModal } from '../types/composition/modal.type';
import type { TComponent } from '../types/composition/component.type';



/**
 * @description
 * Helpes with modals
 */
export class ModalHelper {

  /**
   * @description
   * Creates a new modal
   * 
   * @param title The title of the modal
   * @param component The component to show in the body of the modal
   */
  private static create<T extends TComponent>(title: string, component: InstanceType<T>): TModal<T> {
    const id = v4();
    return { id, title, component: component };
  }

  /**
   * @description
   * Opens a component as a modal
   *
   * @param title The title to show on top of the modal
   * @param component The component to show in the body of the modal
   */
  static open<T extends TComponent>(title: string, component: InstanceType<T>) {
    const store = useModalStore();
    const modal = this.create(title, component);

    store.addModal(modal);
  }

  /**
   * @description
   * Closes the modal
   *
   * @param id The ID of the modal to close
   */
  static close(id: string) {
    const store = useModalStore();
    store.removeModal(id);
  }
}