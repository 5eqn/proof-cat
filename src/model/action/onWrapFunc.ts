// Code action: wrap with func
import { Draft } from "immer";
import { Term, TFunc } from "../term";

export function onWrapFunc(draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = draft as TFunc
  tm.term = 'func'
  tm.param = []
  tm.paramID = []
  tm.body = copy
}
