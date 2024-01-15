import { InferRequest, InferResult } from "./model";
import { TPi } from "../term";
import { Draft } from "immer";
import { Val } from "../value";
import { evalIn, makeSpineIn } from "../evaluate";

import { infer } from "./index";
import { mapCallback } from "../callback";
import { inferParam } from "./inferParam";
import { TermPi } from "../../view/TermPi";


export function inferPi(req: InferRequest<TPi>): InferResult {
  // Construct element for pi body
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TPi> = req
  const len: number = term.paramID.length + env.length
  const paramVars: Val[] = term.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = term.param.map(evalIn(env))
  const { element: bodyElement }: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    onChange: mapCallback(
      onChange,
      (draft: Draft<TPi>) => draft.body
    )
  })
  // Construct type for pi, which is always U
  const val: Val = {
    val: 'uni',
  }
  // Construct element for params
  const paramElements = inferParam(req)
  return {
    val: val,
    element: TermPi({
      req,
      type: val,
      params: paramElements,
      body: bodyElement,
    }),
  }
}
