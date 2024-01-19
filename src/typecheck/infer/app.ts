import { InferRequest, InferResult, getElements, getDebugs, getVals } from "../model/infer";
import { TApp, Term } from "../model/term";
import { evaluate } from "../evaluate";
import { Val, VPi } from "../model/value";
import { apply } from "../model/closure";
import { TermApp } from "../../view/TermApp";

import { infer } from "./index";
import { ErrorCallNonFunc } from "../model/error";
import { inferArg } from "./arg";
import { unifyNamespace } from "../unify/namespace";
import { unifyArray } from "../unify/array";
import { mapCallback } from "../model/callback";
import { Draft } from "immer";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get function type
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TApp> = req
  const onFuncChange = mapCallback(
    onChange,
    (draft: Draft<TApp>) => draft.func
  )
  const { val: funcVal, element: funcElement }: InferResult = infer({
    env, ctx, ns,
    depth: depth + 1,
    term: term.func,
    onChange: onFuncChange
  })
  const funcType: VPi = funcVal as VPi
  // Make sure function's type is Pi
  if (funcType.val !== 'pi') {
    throw new ErrorCallNonFunc(funcType)
  }
  // Make sure application namespace match
  unifyNamespace(term.argID, funcType.paramID)
  // Make sure arguments' type match
  const argInfers = inferArg(req)
  unifyArray(env.length, getVals(argInfers), funcType.param)
  // Apply arguments to function type to get applied type
  const argVals: Val[] = term.arg.map((v: Term) => evaluate(env, v))
  const val: Val = apply(funcType.func, argVals)
  return {
    val: val,
    element: TermApp({
      req,
      type: val,
      args: getElements(argInfers),
      func: funcElement,
    }),
    debug: {
      onFuncChange,
      onArgChange: getDebugs(argInfers),
    }
  }
}
