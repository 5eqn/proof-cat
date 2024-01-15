import { InferRequest, InferResult } from "./model";
import { TNum } from "../term";
import { Val } from "../value";
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
