// Callback of code actions
import { Draft } from "immer";
import { ActionPack, mapAction } from "./action";

export type Callback<T, U> = (action: ActionPack<T, U>) => boolean

export function mapCallback<T, U, V>(
  cb: Callback<T, V>,
  f: (t: Draft<T>) => Draft<U>,
): Callback<U, V> {
  return (pack: ActionPack<U, V>) => cb(mapAction(pack, f))
}
