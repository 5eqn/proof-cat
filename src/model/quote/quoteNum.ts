import { Term } from "../term";
import { VNum } from "../value";


// Quote a value to a term
export function quoteNum(val: VNum): Term {
  return {
    term: 'num',
    num: val.num,
  }
}
