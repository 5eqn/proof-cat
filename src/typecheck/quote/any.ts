import { Term } from "../model/term";

// Quote a value to a term
export function quoteAny(): Term {
  return {
    term: 'any',
  }
}
