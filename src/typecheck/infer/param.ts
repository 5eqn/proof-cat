import { InferRequest, InferResult } from "../model/infer";
import { TFunc, TPi } from "../model/term";
import { TermParam } from "../../view/TermParam";

import { infer } from "./index";
import { mapCallback } from "../model/callback";
import { Draft } from "immer";

export function inferParam(req: InferRequest<TFunc | TPi>): InferResult[] {
  // Call infer on params
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TFunc | TPi> = req
  function onParamChange(i: number) {
    return mapCallback(
      onChange,
      (draft: Draft<TFunc | TPi>) => draft.param[i],
    )
  }
  const paramInfers: InferResult[] = term.param.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    onChange: onParamChange(i)
  }))
  // Construct element for params
  const paramElements: InferResult[] = paramInfers.map(({ val, element }, i) => ({
    debug: onParamChange(i),
    val,
    element: TermParam({
      req,
      paramID: term.paramID[i],
      paramIX: i,
      param: element,
    })
  }))
  return paramElements
}
