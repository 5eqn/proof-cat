import { getDebugs, getElements, getVals, InferRequest, InferResult } from "../model/infer";
import { Term, TFunc } from "../model/term";
import { Val } from "../model/value";
import { evalIn } from "../evaluate";
import { TermFunc } from "../../view/TermFunc";

import { infer } from "./index";
import { inferParam } from "./param";
import { quote } from "../quote";
import { makeSpineIn } from "../action/helper/makeSpineIn";
import { unify } from "../unify";

export function inferFunc(req: InferRequest<TFunc>): InferResult {
  // Construct element for function body
  const { env, ctx, ns, depth, term, lens }: InferRequest<TFunc> = req
  const len: number = term.paramID.length + env.length
  const getBody = (t: Term) => lens(t).body
  const paramVars: Val[] = term.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = term.param.map(evalIn(env))
  const { val: bodyVal, element: bodyElement }: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    lens: getBody,
  })
  // Construct type for func, which is Pi
  const val: Val = {
    val: 'pi',
    param: paramVals,
    paramID: term.paramID,
    func: {
      env,
      body: quote(len, bodyVal),
    }
  }
  // Construct element for params
  const paramInfers = inferParam(req)
  // Make sure params have type U
  getVals(paramInfers).forEach((ty: Val) => unify(env.length, ty, { val: 'uni' }))
  return {
    val: val,
    element: TermFunc({
      req,
      type: val,
      params: getElements(paramInfers),
      body: bodyElement,
    }),
    debug: {
      getBody,
      getParam: getDebugs(paramInfers),
    }
  }
}
