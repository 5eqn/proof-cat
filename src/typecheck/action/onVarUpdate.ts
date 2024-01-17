import { Draft } from "immer";
import { TVar } from "../model/term";

export function onVarUpdate(id: string, ix: number, draft: Draft<TVar>): void {
  // Incrementally update variable index and name
  draft.ix = ix
  draft.id = id
}
