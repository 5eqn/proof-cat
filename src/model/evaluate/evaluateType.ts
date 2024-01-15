import { TType } from "../term";
import { Val } from "../value";

// Evaluate a term to a value
export function evaluateType(term: TType): Val {
  return {
    val: 'type',
    type: term.type,
  }
}
