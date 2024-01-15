import { InferRequest, InferResult } from "../model/infer";
import { TType } from "../model/term";
import { Val } from "../model/value";
import { TermType } from "../../view/TermType";

export function inferType(req: InferRequest<TType>): InferResult {
  // All types have type U
  const val: Val = {
    val: 'uni',
  }
  return {
    val: val,
    element: TermType({
      req,
      type: val,
    })
  }
}
