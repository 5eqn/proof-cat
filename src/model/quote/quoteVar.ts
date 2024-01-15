import { Term } from "../term";
import { VVar } from "../value";

// Quote a value to a term
export function quoteVar(len: number, val: VVar): Term {
  return {
    term: 'var',
    id: val.id,
    ix: len - val.lvl - 1
  }
}
