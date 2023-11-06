import { Draggable } from 'gsap/Draggable';



/**
 * @description
 * Helps with drag and drop
 */
export class DragHelper {

  /**
   * @description
   * Makes a DOM element draggable.
   *
   * @param id The ID of the element to drag
   * @param bound The parent bound element
   */
  static async create(id: string, bound: HTMLElement): Promise<void> {
    return new Promise(resolve => {
      const options = { bounds: bound };

      setTimeout(() => {
        Draggable.create(id, options);
        resolve();
      });
    });
  }

  /**
   * @description
   * Removes dragging functionality from a DOM element
   *
   * @param id The ID of the element to remove the drag from
   */
  static async destroy(id: string): Promise<void> {
    return new Promise(resolve => {
      const draggable = Draggable.get(id);
      const element = document.querySelector(id) as HTMLDivElement;

      setTimeout(() => {
        draggable.kill();
        element.style.transform = 'none';

        resolve();
      });
    });
  }

  /**
   * @description
   * Elables dragging for a source
   *
   * @param id The ID of the source to enable the drag for
   */
  static enable(id: string): void {
    const elementId = `#source-${id}`;
    const draggable = Draggable.get(elementId);

    draggable.enable();
  }

  /**
   * @description
   * Disables dragging for a source
   *
   * @param id The ID of the source to disable the drag for
   */
  static disable(id: string): void {
    const elementId = `#source-${id}`;
    const draggable = Draggable.get(elementId);

    draggable.disable();
  }
}