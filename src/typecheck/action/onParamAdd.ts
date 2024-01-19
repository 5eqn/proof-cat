// Code action: add param
import { Draft } from "immer";
import { TFunc, TPi } from "../model/term";
import { addVar } from "./helper/addVar";

export function onParamAdd(ix: number, name: string, draft: Draft<TFunc | TPi>): void {
  draft.param.splice(ix, 0, { term: 'any' })
  draft.paramID.splice(ix, 0, name)
  addVar(0, 1, draft.body)
}
