// Code action: wrap with let
import { Draft } from "immer";
import { Term, TLet } from "../term";
import { addVar } from "./addVar";

function onWrapLet(name: string, draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = draft as TLet
  tm.term = 'let'
  tm.id = name
  tm.body = {
    term: 'any',
  }
  tm.next = copy
  addVar(0, tm.next)
}

export const wrapLetOf = (name: string) => (draft: Draft<Term>) =>
  onWrapLet(name, draft)
