import { InferRequest, InferResult } from "./model";
import { TType } from "../term";
import { Val } from "../value";
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
