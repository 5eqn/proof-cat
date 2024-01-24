import { getVals, InferRequest, InferResult } from "../model/infer";
import { TFunc } from "../model/term";
import { Val } from "../model/value";
import { evalIn } from "../evaluate";

import { infer } from "./index";
import { inferParam } from "./param";
import { quote } from "../quote";
import { makeSpineIn } from "../action/helper/makeSpineIn";
import { unify } from "../unify";

export function inferFunc(req: InferRequest<TFunc>): InferResult {
  // Construct element for function body
  const { env, ctx, ns, tm }: InferRequest<TFunc> = req
  const len: number = tm.paramID.length + env.length
  const paramVars: Val[] = tm.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = tm.param.map(evalIn(env))
  const bodyInfer: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...tm.paramID, ...ns],
    tm: tm.body,
  })
  // Construct type for func, which is Pi
  const type: Val = {
    val: 'pi',
    param: paramVals,
    paramID: tm.paramID,
    func: {
      env,
      body: quote(len, bodyInfer.type),
    }
  }
  // Construct element for params
  const paramInfers = inferParam(req)
  // Make sure params have type U
  getVals(paramInfers).forEach((ty: Val) => unify(env.length, ty, { val: 'uni' }))
  return {
    ...req,
    type,
    term: 'func',
    param: paramInfers,
    body: bodyInfer,
  }
}
