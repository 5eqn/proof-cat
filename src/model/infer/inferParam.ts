import { InferRequest, InferResult } from "./model";
import { TFunc, TPi } from "../term";
import { hasOccurrence } from "../action/hasOccurrence";
import { i18n } from "../../i18n";
import { TermParam } from "../../view/TermParam";

import { infer } from "./index";
import { mapCallback } from "../callback";

export function inferParam(req: InferRequest<TFunc | TPi>): JSX.Element[] {
  // Construct element for params
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TFunc | TPi> = req
  const len: number = term.paramID.length + env.length
  const paramInfers: InferResult[] = term.param.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    onChange: mapCallback(
      onChange,
      draft => draft.param[i],
      hasOccurrence(len, i, term.body) ? i18n.err.referred : undefined
    )
  }))
  const paramElements: JSX.Element[] = paramInfers.map(({ element }, i) =>
    TermParam({
      req,
      paramID: term.paramID[i],
      paramIX: i,
      param: element,
      len,
      body: term.body,
    }))
  return paramElements
}
