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
   */
  static async watch<T extends Array<HTMLElement>>(selector: string): Promise<T> {
    return new Promise(resolve => {
      const root = document.getElementById('app') as HTMLElement;
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
}