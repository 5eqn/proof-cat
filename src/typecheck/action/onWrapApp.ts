// Code action: wrap with app
import { TApp, Term } from "../model/term";
import { Draft } from "immer";
import { deleteFields } from "./helper/deleteFields";

export function onWrapApp(draft: Draft<Term>): void {
  const copy: Term = { ...draft }
  const tm = draft as TApp
  deleteFields(tm)
  tm.term = 'app'
  tm.func = copy
  tm.arg = { term: 'any' }
}
