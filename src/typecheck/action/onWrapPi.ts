// Code action: wrap with func
import { Draft } from "immer";
import { Term, TPi } from "../model/term";
import { addVar } from "./helper/addVar";
import { deleteFields } from "./helper/deleteFields";

export function onWrapPi(name: string, draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = draft as TPi
  deleteFields(tm)
  tm.term = 'pi'
  tm.param = { term: 'any' }
  tm.paramID = name
  tm.body = copy
  addVar(0, 1, tm.body)
}
