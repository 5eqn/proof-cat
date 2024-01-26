import { InferRequest, InferResult } from "../model/infer";
import { TType } from "../model/term";
import { Val } from "../model/value";

export function inferType(req: InferRequest<TType>): InferResult {
  // All types have type U
  const type: Val = {
    val: 'uni',
  }
  return {
    ...req,
    proc: 'infer',
    type: type,
    term: 'type',
  }
}
