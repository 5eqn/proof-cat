// Code action: wrap with app
import { Val } from "../model/value";
import { TApp, Term } from "../model/term";
import { message } from "antd";
import { i18n } from "../../i18n";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

export function onWrapApp(ty: Val, draft: Draft<Term>): void {
  // Make sure the applied term is a function
  if (ty.val !== 'pi') {
    message.error(i18n.err.callNonFunc)
    return
  }
  // Automatically find variable of same type in context
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
