import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

function _onBecomeType(type: string, draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'type',
    type,
  })
}

export const onBecomeType = (type: string) => (draft: Draft<Term>) =>
  _onBecomeType(type, draft)
