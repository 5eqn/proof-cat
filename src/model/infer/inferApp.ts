import { InferRequest, InferResult } from "./model";
import { TApp } from "../term";
import { message } from "antd";
import { i18n } from "../../i18n";
import { evaluate } from "../evaluate";
import { Val, VPi } from "../value";
import { apply } from "../closure";
import { TermApp } from "../../view/TermApp";

import { infer } from "./index";
import { inferArg } from "./inferArg";

export function inferApp(req: InferRequest<TApp>): InferResult {
  // Get type from function's Pi type's destination type
  const { env, ctx, ns, depth, term }: InferRequest<TApp> = req
  const { val: funcVal, element: funcElement }: InferResult = infer({
    env, ctx, ns,
    depth: depth + 1,
    term: term.func,
    onChange: () => {
      // Applied term should not change
      message.error(i18n.err.changeApply)
    }
  })
  const funcType: VPi = funcVal as VPi
  // Apply arguments to function type to get applied type
  const argVals: Val[] = term.argIX.map((ix: number, i: number) =>
    evaluate(env, {
      term: 'var',
      id: term.argID[i],
      ix: ix
    }))
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
