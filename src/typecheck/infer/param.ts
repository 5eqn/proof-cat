import { InferRequest, InferResult } from "../model/infer";
import { TFunc, TPi } from "../model/term";
import { infer } from "./index";

export function inferParam(req: InferRequest<TFunc | TPi>): InferResult[] {
  // Call infer on params
  const { env, ctx, ns, tm }: InferRequest<TFunc | TPi> = req
  return tm.param.map(t => infer({
    env, ctx, ns, tm: t,
  }))
}
