import { Draft } from "immer";
import { TVar } from "../model/term";

function _onVarUpdate(newIX: number, ns: string[], draft: Draft<TVar>): void {
  // Incrementally update variable index and name
  draft.ix = newIX
  draft.id = ns[newIX]
}

export const onVarUpdate = (newIX: number, ns: string[]) => (draft: Draft<TVar>) =>
  _onVarUpdate(newIX, ns, draft)
