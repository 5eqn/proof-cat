import { InferRequest, InferResult } from "../model/infer";
import { TLet } from "../model/term";
import { evaluate } from "../evaluate";
import { infer } from "./index";

export function inferLet(req: InferRequest<TLet>): InferResult {
  const { env, ctx, ns, tm } = req
  const bodyInfer: InferResult = infer({
    env: env,
    ctx: ctx,
    ns: ns,
    tm: tm.body,
  })
  const nextInfer: InferResult = infer({
    env: [evaluate(env, tm.body), ...env],
    ctx: [bodyInfer.type, ...ctx],
    ns: [tm.id, ...ns],
    tm: tm.next,
  })
  return {
    ...req,
    type: nextInfer.type,
    term: 'let',
    body: bodyInfer,
    next: nextInfer,
  }
}
