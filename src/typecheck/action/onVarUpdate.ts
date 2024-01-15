import { Draft } from "immer";
import { TVar } from "../model/term";

function onVarUpdate(newIX: number, ns: string[], draft: Draft<TVar>): void {
  // Incrementally update variable index and name
  draft.ix = newIX
  draft.id = ns[newIX]
}

export const varUpdateIn = (newIX: number, ns: string[]) => (draft: Draft<TVar>) =>
  onVarUpdate(newIX, ns, draft)
