import { Term } from "../term";
import { VType } from "../value";

// Quote a value to a term
export function quoteType(val: VType): Term {
  return {
    term: 'type',
    type: val.type,
  }
}
