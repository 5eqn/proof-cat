// Code action: wrap with func
import { Draft } from "immer";
import { Term, TFunc } from "../model/term";
import { deleteFields } from "./deleteFields";
import { onFuncAdd } from "./onFuncAdd";

export function onWrapFunc(name: string, draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = draft as TFunc
  deleteFields(tm)
  tm.term = 'func'
  tm.param = []
  tm.paramID = []
  tm.body = copy
  onFuncAdd(0, name, draft as TFunc)
}
