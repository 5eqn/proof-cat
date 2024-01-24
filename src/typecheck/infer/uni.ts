import { InferRequest, InferResult } from "../model/infer";
import { TUni } from "../model/term";
import { Val } from "../model/value";

export function inferUni(req: InferRequest<TUni>): InferResult {
  // U has type U
  const type: Val = {
    val: 'uni',
  }
  return {
    ...req,
    type,
    term: 'uni',
  }
}
