import type { TNullable } from "@eoussama/core";
import type { TSource } from "../composition/source.type";
import type { InputMode } from "@/utils/enums/inputMode.enum";



/**
 * @description
 * The local data of the SourceDetail component
 */
export type TSourceDetailType = {

  /**
   * @description
   * The source's loading state
   */
  loading: boolean;

  /**
   * @description
   * If the form has been initialized
   */
  initialized: boolean;

  /**
   * @description
   * The source to display
   */
  source: TNullable<TSource>;

  /**
   * @description
   * If the main form has been submitted
   */
  submitted: boolean;

  /**
   * @description
   * If the preview is loaded
   */
  previewLoaded: boolean;

  /**
   * @description
   * The active input mode — URL link or local file
   */
  inputMode: InputMode;

  /**
   * @description
   * The locally selected file (file mode only)
   */
  localFile: TNullable<File>;
};
