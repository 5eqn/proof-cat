// Callback of code actions
import { Draft } from "immer";
import { ActionPack, mapAction } from "./action";
import { Term } from "./term";

export type Callback = (updater: ActionPack) => boolean

export function mapCallback(
  cb: Callback,
  f: (t: Draft<Term>) => Draft<Term>,
): Callback {
  return (pack: ActionPack) => cb(mapAction(pack, f))
}
