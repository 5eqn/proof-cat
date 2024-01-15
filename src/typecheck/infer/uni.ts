import { InferRequest, InferResult } from "../model/infer";
import { TUni } from "../model/term";
import { Val } from "../model/value";
import { TermUni } from "../../view/TermUni";

export function inferUni(req: InferRequest<TUni>): InferResult {
  // U has type U
  const val: Val = {
    val: 'uni',
  }
  return {
    val,
    element: TermUni({ req, type: val })
  }
}
