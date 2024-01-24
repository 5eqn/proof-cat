import { getVals, InferRequest, InferResult } from "../model/infer";
import { TPi } from "../model/term";
import { Val } from "../model/value";
import { evalIn } from "../evaluate";
import { infer } from "./index";
import { inferParam } from "./param";
import { makeSpineIn } from "../action/helper/makeSpineIn";
import { unify } from "../unify";


export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for pi body
  const { env, ctx, ns, tm }: InferRequest<TPi> = req
  const len: number = tm.paramID.length + env.length
  const paramVars: Val[] = tm.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = tm.param.map(evalIn(env))
  const bodyInfer: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...tm.paramID, ...ns],
    tm: tm.body,
  })
  // Construct type for pi, which is always U
  const type: Val = {
    val: 'uni',
  }
  // Construct element for params
  const paramInfers = inferParam(req)
  // Make sure params have type U
  getVals(paramInfers).forEach((ty: Val) => unify(env.length, ty, { val: 'uni' }))
  return {
    ...req,
    type: type,
    term: 'pi',
    param: paramInfers,
    body: bodyInfer,
  }
}
