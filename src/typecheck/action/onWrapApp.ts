// Code action: wrap with app
import { Val } from "../model/value";
import { TApp, Term } from "../model/term";
import { Draft } from "immer";
import { deleteFields } from "./helper/deleteFields";
import { ErrorCallNonFunc } from "../model/error";

export function onWrapApp(ty: Val, draft: Draft<Term>): void {
  // Make sure the applied term is a function
  if (ty.val !== 'pi' && ty.val !== 'any') {
    throw new ErrorCallNonFunc(ty)
  }
  // Update term
  const copy: Term = { ...draft }
  const tm = draft as TApp
  deleteFields(tm)
  tm.term = 'app'
  tm.func = copy
  tm.arg = { term: 'any' }
}
