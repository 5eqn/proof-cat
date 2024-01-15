import { InferRequest, InferResult } from "../model/infer";
import { TAny } from "../model/term";
import { Val } from "../model/value";
import { TermAny } from "../../view/TermAny";

export function inferAny(req: InferRequest<TAny>): InferResult {
  // Any term has type any
  const val: Val = {
    val: 'any',
  }
  return {
    val: val,
    element: TermAny({
      req,
      type: val,
    })
  }
}
