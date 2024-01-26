import { InferRequest, InferResult } from "../model/infer";
import { TPi } from "../model/term";
import { Val } from "../model/value";
import { evaluate } from "../evaluate";
import { check } from "../check";

export function inferPi(req: InferRequest<TPi>): InferResult {
  // Get param placeholder variable and type
  const { env, ctx, ns, tm }: InferRequest<TPi> = req
  const paramVar: Val = { val: 'var', lvl: env.length }
  const paramVal: Val = evaluate(env, tm.param)
  // Make sure applied body has type U
  const bodyInfer: InferResult = check({
    env: [paramVar, ...env],
    ctx: [paramVal, ...ctx],
    ns: [tm.paramID, ...ns],
    tm: tm.body,
    expected: { val: 'uni' }
  })
  // Make sure param has type U
  const paramInfer: InferResult = check({
    ...req,
    tm: tm.param,
    expected: { val: 'uni' }
  })
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
