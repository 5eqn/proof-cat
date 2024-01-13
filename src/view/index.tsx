import { DraftFunction } from "use-immer";

/*******
  MODEL
 *******/

// Props of a rendered component
export type CommonProps<T> = {
  value: T,
  level: number,
  onChange: (updater: DraftFunction<T>) => void,
}
