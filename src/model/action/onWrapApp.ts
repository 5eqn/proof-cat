// Code action: wrap with app
import { Val } from "../value";
import { Ctx } from "../ctx";
import { Env } from "../env";
import { Callback } from "../callback";
import { TApp, Term } from "../term";
import { message } from "antd";
import { i18n } from "../../i18n";
import { unify } from "../unify";

export const onWrapApp = (ty: Val, ctx: Ctx, env: Env, onChange: Callback<Term>) => {
  // Make sure the applied term is a function
  if (ty.val !== 'pi') message.error(i18n.err.callNonFunc)
  else {
    const argID = ty.fromID
    // Automatically find variable of same type in context
    const argIX = ty.from.map((v) => ctx.findIndex((t) =>
      unify(env.length, t, v) === null
    ))
    // Make sure variable of given type exists
    for (const ix of argIX) {
      if (ix === -1) {
        message.error(i18n.err.noVariable)
        return
      }
    }
    onChange(draft => {
      const copy = { ...draft }
      const tm = draft as TApp
      tm.term = 'app'
      tm.func = copy
      tm.argIX = argIX
      tm.argID = argID
    })
  }
}
