import { InferRequest, InferResult } from "../model/infer";
import { TVar } from "../model/term";
import { TermVar } from "../../view/TermVar";

export function inferVar(req: InferRequest<TVar>): InferResult {
  // Infer type for variable
  const { ctx, term } = req
  const val = ctx[term.ix]
  return {
    val: val,
    element: TermVar({
      req,
      type: val,
    })
  }
}