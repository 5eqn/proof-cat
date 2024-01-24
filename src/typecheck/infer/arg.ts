import { InferRequest, InferResult } from "../model/infer";
import { TApp } from "../model/term";
import { infer } from "./index";

export function inferArg(req: InferRequest<TApp>): InferResult[] {
  // Call infer on args
  const { env, ctx, ns, tm }: InferRequest<TApp> = req
  return tm.arg.map(t => infer({
    env, ctx, ns, tm: t,
  }))
}
