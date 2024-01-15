// Code action: wrap with app
import { Val } from "../value";
import { Ctx } from "../ctx";
import { TApp, Term } from "../term";
import { message } from "antd";
import { i18n } from "../../i18n";
import { unify } from "../unify";
import { Draft } from "immer";

export function onWrapApp(ty: Val, ctx: Ctx, draft: Draft<TApp>): void {
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
  draft.term = 'app'
  draft.func = copy
  draft.argIX = argIX
  draft.argID = argID
}

const firstTypeMatch = (ctx: Ctx) => (ty: Val) =>
  ctx.findIndex((t) => unify(ctx.length, t, ty) === null)
