import { InferRequest, InferResult } from "../model/infer";
import { Term, TFunc, TPi } from "../model/term";
import { TermParam } from "../../view/TermParam";

import { infer } from "./index";

export function inferParam(req: InferRequest<TFunc | TPi>): InferResult[] {
  // Call infer on params
  const { env, ctx, ns, depth, term, lens }: InferRequest<TFunc | TPi> = req
  const getParam = (i: number) => (t: Term) => lens(t).param[i]
  const paramInfers: InferResult[] = term.param.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    lens: getParam(i)
  }))
  // Construct element for params
  const paramElements: InferResult[] = paramInfers.map(({ val, element }, i) => ({
    debug: getParam(i),
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
