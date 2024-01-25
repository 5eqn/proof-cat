import { InferRequest, InferResult } from "../model/infer";
import { TPi } from "../model/term";
import { Val } from "../model/value";
import { evaluate } from "../evaluate";

import { infer } from "./index";
import { unify } from "../unify";

export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for Pi body
  const { env, ctx, ns, tm }: InferRequest<TPi> = req
  const paramVar: Val = { val: 'var', lvl: env.length }
  const paramVal: Val = evaluate(env, tm.param)
  const paramInfer: InferResult = infer({
    env, ctx, ns, tm: tm.param,
  })
  const bodyInfer: InferResult = infer({
    env: [paramVar, ...env],
    ctx: [paramVal, ...ctx],
    ns: [tm.paramID, ...ns],
    tm: tm.body,
  })
  // Make sure param has type U
  unify(env.length, paramInfer.type, { val: 'uni' })
  // Construct type for Pi, which is U
  const type: Val = { val: 'uni' }
  return {
    ...req,
    type,
    term: 'pi',
    param: paramInfer,
    body: bodyInfer,
  }
}
