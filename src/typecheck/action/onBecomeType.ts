import { Draft } from "immer";
import { Term } from "../model/term";

function onBecomeType(type: string, draft: Draft<Term>): void {
  Object.assign(draft, {
    term: 'type',
    type,
  })
}

export const becomeTypeOf = (type: string) => (draft: Draft<Term>) =>
  onBecomeType(type, draft)
