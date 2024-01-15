import { TNum } from "../model/term";
import { Val } from "../model/value";

// Evaluate a term to a value
export function evaluateNum(term: TNum): Val {
  return {
    val: 'num',
    num: term.num
  }
}
