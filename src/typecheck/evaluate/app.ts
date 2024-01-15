import { Env } from "../model/env";
import { TApp } from "../model/term";
import { Val } from "../model/value";
import { apply } from "../model/closure";
import { evaluate } from "./index";

// Evaluate a term to a value
export function evaluateApp(env: Env, term: TApp): Val {
  const func = evaluate(env, term.func)
  const arg = term.argIX.map((ix, i) => evaluate(env, {
    term: 'var',
    id: term.argID[i],
    ix: ix
  }))
  if (func.val === 'func') {
    return apply(func.func, arg)
  }
  return {
    val: 'app',
    func: func,
    arg: arg,
    argID: term.argID,
  }
}
