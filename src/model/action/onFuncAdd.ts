// Code action: add param
import { Draft } from "immer";
import { TFunc, TPi } from "../term";
import { addVar } from "./addVar";

function onFuncAdd(name: string, draft: Draft<TFunc | TPi>): void {
  draft.param = [{ term: 'any' }, ...draft.param]
  draft.paramID = [name, ...draft.paramID]
  addVar(0, draft.body)
}

export const funcAddOf = (name: string) => (draft: Draft<TFunc | TPi>) =>
  onFuncAdd(name, draft)
