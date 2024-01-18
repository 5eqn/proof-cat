// Code action: wrap with app
import { Val } from "../model/value";
import { TApp, Term } from "../model/term";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";
import { ErrorCallNonFunc } from "../model/error";

export function onWrapApp(ty: Val, draft: Draft<Term>): void {
  // Make sure the applied term is a function
  if (ty.val !== 'pi') {
    throw new ErrorCallNonFunc(ty)
  }
  // Generate anies for argument
  const argID: string[] = ty.paramID
  const arg: Term[] = ty.paramID.map(() => ({ term: 'any' }))
  // Update term
  const copy: Term = { ...draft }
  const tm = draft as TApp
  deleteFields(tm)
  tm.term = 'app'
  tm.func = copy
  tm.arg = arg
  tm.argID = argID
}
