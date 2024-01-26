import { InferRequest, InferResult } from "../model/infer";
import { TFunc } from "../model/term";
import { Val } from "../model/value";
import { evaluate } from "../evaluate";

import { infer } from "./index";
import { quote } from "../quote";
import { check } from "../check";

export function inferFunc(req: InferRequest<TFunc>): InferResult {
  // Construct element for function body
  const { env, ctx, ns, tm }: InferRequest<TFunc> = req
  const paramVar: Val = { val: 'var', lvl: env.length }
  const paramVal: Val = evaluate(env, tm.param)
  const bodyInfer: InferResult = infer({
    env: [paramVar, ...env],
    ctx: [paramVal, ...ctx],
    ns: [tm.paramID, ...ns],
    tm: tm.body,
  })
  // Make sure param has type U
  const paramInfer: InferResult = check({
    ...req,
    tm: tm.param,
    type: { val: 'uni' }
  })
  // Construct type for func, which is Pi
  const type: Val = {
    val: 'pi',
    param: paramVal,
    paramID: tm.paramID,
    func: {
      env,
      body: quote(env.length + 1, bodyInfer.type),
    }
  }
  return {
    ...req,
    proc: 'infer',
    type,
    term: 'func',
    param: paramInfer,
    body: bodyInfer,
  }
}
