import { Term } from "../model/term";
import { VVar } from "../model/value";

// Quote a value to a term
export function quoteVar(len: number, val: VVar): Term {
  return {
    term: 'var',
    ix: len - val.lvl - 1
  }
}
