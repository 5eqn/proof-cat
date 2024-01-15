import { Term } from "../model/term";
import { VType } from "../model/value";

// Quote a value to a term
export function quoteType(val: VType): Term {
  return {
    term: 'type',
    type: val.type,
  }
}
