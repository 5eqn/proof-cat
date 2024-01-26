import { InferRequest, InferResult } from "../model/infer";
import { TNum } from "../model/term";
import { Val } from "../model/value";

export function inferNum(req: InferRequest<TNum>): InferResult {
  // All numbers have type number
  const type: Val = {
    val: 'type',
    type: 'number',
  }
  return {
    ...req,
    proc: 'infer',
    type,
    term: 'num',
  }
}
