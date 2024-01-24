import { InferRequest, InferResult, getVals } from "../model/infer";
import { TApp, Term } from "../model/term";
import { evaluate } from "../evaluate";
import { Val } from "../model/value";
import { apply } from "../model/closure";

import { infer } from "./index";
import { ErrorCallNonFunc } from "../model/error";
import { inferArg } from "./arg";
import { unifyNamespace } from "../unify/namespace";
import { unifyArray } from "../unify/array";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get function type
  const { env, ctx, ns, tm }: InferRequest<TApp> = req
  const funcInfer: InferResult = infer({
    env, ctx, ns, tm: tm.func,
  })
  const funcType = funcInfer.type
  // Make sure function's type is Pi
  if (funcType.val !== 'pi') {
    throw new ErrorCallNonFunc(funcType)
  }
  // Make sure application namespace match
  unifyNamespace(tm.argID, funcType.paramID)
  // Make sure arguments' type match
  const argInfers = inferArg(req)
  unifyArray(env.length, getVals(argInfers), funcType.param)
  // Apply arguments to function type to get applied type
  const argVals: Val[] = tm.arg.map((v: Term) => evaluate(env, v))
  const type: Val = apply(funcType.func, argVals)
  return {
    ...req,
    type,
    term: 'app',
    arg: argInfers,
    func: funcInfer,
  }
}
