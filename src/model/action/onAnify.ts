import { Draft } from "immer";
import { Term } from "../term";

// Code action: anify
export function onAnify(draft: Draft<Term>): void {
  switch (draft.term) {
    case 'app':
      Object.assign(draft, draft.func)
      return
    default:
      draft.term = 'any'
  }
}
