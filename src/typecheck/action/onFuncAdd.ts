// Code action: add param
import { Draft } from "immer";
import { TFunc, TPi } from "../model/term";
import { addVar } from "./addVar";

function _onFuncAdd(name: string, draft: Draft<TFunc | TPi>): void {
  draft.param = [{ term: 'any' }, ...draft.param]
  draft.paramID = [name, ...draft.paramID]
  addVar(0, draft.body)
}

export const onFuncAdd = (name: string) => (draft: Draft<TFunc | TPi>) =>
  _onFuncAdd(name, draft)
