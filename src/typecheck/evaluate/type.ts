import { TType } from "../model/term";
import { Val } from "../model/value";

// Evaluate a term to a value
export function evaluateType(term: TType): Val {
  return {
    val: 'type',
    type: term.type,
  }
}
