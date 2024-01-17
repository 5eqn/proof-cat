import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

function onBecomeType(type: string, draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'type',
    type,
  })
}

export const becomeTypeOf = (type: string) => (draft: Draft<Term>) =>
  onBecomeType(type, draft)
