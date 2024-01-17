// Code action: wrap with pi
import { Draft } from "immer";
import { Term, TPi } from "../model/term";
import { deleteFields } from "./deleteFields";

export function onWrapPi(draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = (draft as TPi)
  deleteFields(tm)
  tm.term = 'pi'
  tm.param = []
  tm.paramID = []
  tm.body = copy
}
