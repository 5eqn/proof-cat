// Code action: wrap with app
import { Val } from "../model/value";
import { Ctx } from "../model/ctx";
import { TApp, Term } from "../model/term";
import { message } from "antd";
import { i18n } from "../../i18n";
import { unify } from "../unify";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

function _onWrapApp(ty: Val, ctx: Ctx, draft: Draft<Term>): void {
  // Make sure the applied term is a function
  if (ty.val !== 'pi') {
    message.error(i18n.err.callNonFunc)
    return
  }
  // Automatically find variable of same type in context
  const argID: string[] = ty.paramID
  const argIX: number[] = ty.param.map(firstTypeMatch(ctx))
  // Make sure variable of given type exists
  for (const ix of argIX) {
    if (ix === -1) {
      message.error(i18n.err.noVariable)
      return
    }
  }
  // Update term
  const copy: Term = { ...draft }
  const tm = draft as TApp
  deleteFields(tm)
  tm.term = 'app'
  tm.func = copy
  tm.argIX = argIX
  tm.argID = argID
}

export const onWrapApp = (ty: Val, ctx: Ctx) => (draft: Draft<Term>) =>
  _onWrapApp(ty, ctx, draft)

const firstTypeMatch = (ctx: Ctx) => (ty: Val) =>
  ctx.findIndex((t) => unify(ctx.length, t, ty) === null)
