import { InferRequest, InferResult } from "../model/infer";
import { TApp, Term } from "../model/term";
import { evaluate } from "../evaluate";
import { Val, VPi } from "../model/value";
import { apply } from "../model/closure";
import { TermApp } from "../../view/TermApp";

import { infer } from "./index";
import { inferArg } from "./arg";
import { ErrorChangeApply } from "../model/error";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get type from function's Pi type's destination type
  const { env, ctx, ns, depth, term }: InferRequest<TApp> = req
  const { val: funcVal, element: funcElement }: InferResult = infer({
    env, ctx, ns,
    depth: depth + 1,
    term: term.func,
    onChange: () => {
      // Applied term should not change
      throw new ErrorChangeApply()
    }
  })
  const funcType: VPi = funcVal as VPi
  // Apply arguments to function type to get applied type
  const argVals: Val[] = term.arg.map((v: Term) => evaluate(env, v))
  const val: Val = apply(funcType.func, argVals)
  // Generate argument elements
  const argElements = inferArg(req, funcType)
  return {
    val: val,
    element: TermApp({
      req,
      type: val,
      args: argElements,
      func: funcElement,
    }),
  }
}
