import { InferRequest, InferResult } from "../model/infer";
import { TApp } from "../model/term";
import { evaluate } from "../evaluate";
import { Val } from "../model/value";
import { apply } from "../model/closure";

import { infer } from "./index";
import { ErrorCallNonFunc } from "../model/error";
import { unify } from "../unify";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get function type
  const { env, ctx, ns, tm }: InferRequest<TApp> = req
  const funcInfer: InferResult = infer({
    env, ctx, ns, tm: tm.func,
  })
  const funcType = funcInfer.type
  const argInfer: InferResult = infer({
    env, ctx, ns, tm: tm.arg,
  })
  // If function is any, return any
  if (funcType.val === 'any') {
    return {
      ...req,
      type: { val: 'any' },
      term: 'app',
      arg: argInfer,
      func: funcInfer,
    }
  }
  // Make sure function's type is Pi
  if (funcType.val !== 'pi') {
    throw new ErrorCallNonFunc(funcType)
  }
  // Make sure argument's type match
  unify(env.length, argInfer.type, funcType.param)
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
