// Code action: wrap with let
import { Draft } from "immer";
import { Term, TLet } from "../model/term";
import { addVar } from "./addVar";
import { deleteFields } from "./deleteFields";

export function onWrapLet(name: string, draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = draft as TLet
  deleteFields(tm)
  tm.term = 'let'
  tm.id = name
  tm.body = {
    term: 'any',
  }
  tm.next = copy
  addVar(0, 1, tm.next)
}
