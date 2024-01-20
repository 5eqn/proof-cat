import { InferRequest, InferResult } from "../model/infer";
import { TApp, Term } from "../model/term";
import { TermArg } from "../../view/TermArg";

import { infer } from "./index";

export function inferArg(req: InferRequest<TApp>): InferResult[] {
  // Call infer on args
  const { env, ctx, ns, depth, term, lens }: InferRequest<TApp> = req
  const getArg = (i: number) => (t: Term) => lens(t).arg[i]
  const len: number = term.argID.length + env.length
  const argInfers: InferResult[] = term.arg.map((t, i) => infer({
    env, ctx, ns,
    depth: depth + 1,
    term: t,
    lens: getArg(i),
  }))
  // Construct element for args
  return argInfers.map(({ val, element }, i) => ({
    debug: getArg(i),
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
