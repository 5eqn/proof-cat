import { Term } from "../model/term";
import { VNum } from "../model/value";


// Quote a value to a term
export function quoteNum(val: VNum): Term {
  return {
    term: 'num',
    num: val.num,
  }
}
