import { InferRequest, InferResult } from "../model/infer";
import { TApp } from "../model/term";
import { TermArg } from "../../view/TermArg";

import { infer } from "./index";
import { mapCallback } from "../model/callback";
import { Draft } from "immer";

export function inferArg(req: InferRequest<TApp>): InferResult[] {
  // Call infer on args
  const { env, ctx, ns, depth, term, onChange }: InferRequest<TApp> = req
  function onArgChange(i: number) {
    return mapCallback(
      onChange,
      (draft: Draft<TApp>) => draft.arg[i],
    )
  }
  const len: number = term.argID.length + env.length
  const argInfers: InferResult[] = term.arg.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    onChange: onArgChange(i),
  }))
  // Construct element for args
  return argInfers.map(({ val, element }, i) => ({
    debug: onArgChange(i),
    val,
    element: TermArg({
      req,
      argID: term.argID[i],
      argIX: i,
      arg: element,
      len,
    }),
  }))
}
