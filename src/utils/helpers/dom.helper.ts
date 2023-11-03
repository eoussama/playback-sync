import { NodeType } from '@/utils/enums/nodeType.enum';



/**
 * @description
 * Helps with DOM manipulations
 */
export class DOMHelper {

  /**
   * @description
   * Fetches the matching elements inside of a select group of containers
   *
   * @param selector The selector to check for
   * @param parents The parent elements to check inside
   */
  static get<T extends Array<HTMLElement>>(selector: string, parents: Array<HTMLElement>): T {
    const containers = parents.filter(e => e.nodeType === NodeType.ElementNode);
    const matches = containers.map(e => e.querySelectorAll(selector));
    const targets = matches.map(e => [...e]).filter(e => e.length > 0).flat();

    return targets as T;
  }

  /**
   * @description
   * Observes the DOM for additions concerning a target ID
   *
   * @param selector The selector of the elemnt to watch for
   * @param container The container to watch the children of
   */
  static async watch<T extends Array<HTMLElement>>(selector: string, container?: HTMLElement): Promise<T> {
    return new Promise(resolve => {
      const root = container ?? document.getElementById('app') as HTMLElement;
      const targets = this.get(selector, [root]);

      if (targets.length > 0) {
        return resolve(targets as T);
      }

      const options = { childList: true, subtree: true };
      const observer = new MutationObserver((mutationList, observer) => {
        const mutations = mutationList.flatMap(e => e.addedNodes);
        const nodes = mutations.map(e => [...e]).flat() as Array<HTMLElement>;
        const targetNodes = this.get(selector, nodes) ?? [];

        if (targetNodes.length > 0) {
          observer.disconnect();
          resolve(targetNodes as T);
        }
      });

      observer.observe(root, options);
    });
  }

  /**
   * @description
   * Sets focus on a target element
   *
   * @param selector The target element's selector
   * @param container The parent container to look for the element in
   */
  static focus(selector: string, container?: HTMLElement): void {
    const parent = container ?? document.getElementById('app') as HTMLElement;
    const firstInput = parent.querySelector(selector) as HTMLElement;

    if (firstInput) {
      firstInput.focus();
    }
  }
}