import { InferRequest, InferResult } from "../model/infer";
import { TNum } from "../model/term";
import { Val } from "../model/value";
import { TermNum } from "../../view/TermNum";

export function inferNum(req: InferRequest<TNum>): InferResult {
  // All numbers have type number
  const val: Val = {
    val: 'type',
    type: 'number',
  }
  return {
    val: val,
    element: TermNum({
      req,
      type: val,
    })
  }
}
