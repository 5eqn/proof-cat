import { InferRequest, InferResult } from "../model/infer";
import { TApp } from "../model/term";
import { evaluate } from "../evaluate";
import { Val } from "../model/value";
import { apply } from "../model/closure";

import { infer } from "./index";
import { check } from "../check";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Make sure function can unify with function
  const { env, ctx, ns, tm }: InferRequest<TApp> = req
  const funcInfer: InferResult = check({
    env, ctx, ns, tm: tm.func,
    expected: {
      val: 'pi',
      param: { val: 'any' },
      paramID: '_',
      func: {
        env: [],
        body: { term: 'any' },
      }
    }
  })
  const funcType = funcInfer.type
  // If function is not pi, return any
  if (funcType.val !== 'pi') {
    const argInfer: InferResult = infer({
      env, ctx, ns, tm: tm.arg,
    })
    return {
      ...req,
      type: { val: 'any' },
      term: 'app',
      arg: argInfer,
      func: funcInfer,
    }
  }
  // Make sure argument's type match
  const argInfer: InferResult = check({
    ...req,
    tm: tm.arg,
    expected: funcType.param
  })
  // Apply arguments to function type to get applied type
  const argVal: Val = evaluate(env, tm.arg)
  const type: Val = apply(funcType.func, argVal)
  return {
    ...req,
    type,
    term: 'app',
    arg: argInfer,
    func: funcInfer,
  }
}
