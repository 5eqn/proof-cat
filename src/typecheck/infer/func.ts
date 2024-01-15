import { Draft } from "immer";
import { InferRequest, InferResult } from "../model/infer";
import { TFunc } from "../model/term";
import { Val } from "../model/value";
import { evalIn } from "../evaluate";
import { TermFunc } from "../../view/TermFunc";

import { infer } from "./index";
import { mapCallback } from "../model/callback";
import { inferParam } from "./param";
import {quote} from "../quote";
import {makeSpineIn} from "../action/makeSpineIn";

export function inferFunc(req: InferRequest<TFunc>): InferResult {
  // Construct element for function body
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TFunc> = req
  const len: number = term.paramID.length + env.length
  const paramVars: Val[] = term.paramID.map(makeSpineIn(len))
  const paramVals: Val[] = term.param.map(evalIn(env))
  const { val: bodyVal, element: bodyElement }: InferResult = infer({
    env: [...paramVars, ...env],
    ctx: [...paramVals, ...ctx],
    ns: [...term.paramID, ...ns],
    depth: depth + 1,
    term: term.body,
    onChange: mapCallback(
      onChange,
      (draft: Draft<TFunc>) => draft.body
    )
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
  const paramElements = inferParam(req)
  return {
    val: val,
    element: TermFunc({
      req,
      type: val,
      params: paramElements,
      body: bodyElement,
    }),
  }
}