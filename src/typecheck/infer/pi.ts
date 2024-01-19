import { getDebugs, getElements, InferRequest, InferResult } from "../model/infer";
import { TPi } from "../model/term";
import { Draft } from "immer";
import { Val } from "../model/value";
import { evalIn } from "../evaluate";
import { infer } from "./index";
import { mapCallback } from "../model/callback";
import { inferParam } from "./param";
import { TermPi } from "../../view/TermPi";
import { makeSpineIn } from "../action/helper/makeSpineIn";


export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for pi body
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TPi> = req
  const onBodyChange = mapCallback(
    onChange,
    (draft: Draft<TPi>) => draft.body
  )
  const len: number = term.paramID.length + env.length
  const paramVars: Val[] = term.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = term.param.map(evalIn(env))
  const { element: bodyElement }: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    onChange: onBodyChange,
  })
  // Construct type for pi, which is always U
  const val: Val = {
    val: 'uni',
  }
  // Construct element for params
  const paramInfers = inferParam(req)
  return {
    val: val,
    element: TermPi({
      req,
      type: val,
      params: getElements(paramInfers),
      body: bodyElement,
    }),
    debug: {
      onBodyChange,
      onParamChange: getDebugs(paramInfers),
    }
  }
}
