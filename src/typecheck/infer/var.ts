import { InferRequest, InferResult } from "../model/infer";
import { TVar } from "../model/term";

export function inferVar(req: InferRequest<TVar>): InferResult {
  // Infer type for variable
  const { ctx, tm } = req
  const type = ctx[tm.ix]
  return {
    ...req,
    type,
    term: 'var',
  }
}
