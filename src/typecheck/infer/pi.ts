import { getDebugs, getElements, getVals, InferRequest, InferResult } from "../model/infer";
import { Term, TPi } from "../model/term";
import { Val } from "../model/value";
import { evalIn } from "../evaluate";
import { infer } from "./index";
import { inferParam } from "./param";
import { TermPi } from "../../view/TermPi";
import { makeSpineIn } from "../action/helper/makeSpineIn";
import { unify } from "../unify";


export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for pi body
  const { env, ctx, ns, depth, term, lens }: InferRequest<TPi> = req
  const getBody = (t: Term) => lens(t).body
  const len: number = term.paramID.length + env.length
  const paramVars: Val[] = term.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = term.param.map(evalIn(env))
  const { element: bodyElement }: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    lens: getBody,
  })
  // Construct type for pi, which is always U
  const val: Val = {
    val: 'uni',
  }
  // Construct element for params
  const paramInfers = inferParam(req)
  // Make sure params have type U
  getVals(paramInfers).forEach((ty: Val) => unify(env.length, ty, { val: 'uni' }))
  return {
    val: val,
    element: TermPi({
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
