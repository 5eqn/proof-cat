import { TNum } from "../term";
import { Val } from "../value";

// Evaluate a term to a value
export function evaluateNum(term: TNum): Val {
  return {
    val: 'num',
    num: term.num
  }
}
