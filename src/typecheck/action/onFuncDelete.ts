// Code action: delete param
import { TFunc, TPi } from "../model/term";
import { assertNotOccur } from "./hasOccurrence";
import { deleteVar } from "./deleteVar";
import { Draft } from "immer";

export function onFuncDelete(
  ix: number,
  len: number,
  draft: Draft<TFunc | TPi>
): void {
  assertNotOccur(len, ix, draft.body)
  draft.param.splice(ix, 1)
  draft.paramID.splice(ix, 1)
  deleteVar(ix, 1, draft.body)
}
