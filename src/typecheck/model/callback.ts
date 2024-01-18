// Callback of code actions
import { Draft } from "immer";
import { DraftFunction } from "use-immer";

export type Callback<T> = (updater: DraftFunction<T>) => void

export function mapCallback<T, U>(
  cb: Callback<T>,
  f: (t: Draft<T>) => Draft<U>,
): Callback<U> {
  return (updater) => {
    cb(draft => {
      updater(f(draft))
    })
  }
}
