import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

// Code action: anify
export function onAnify(draft: Draft<Term>): void {
  switch (draft.term) {
    case 'app':
      Object.assign(draft, draft.func)
      return
    default:
      deleteFields(draft)
      draft.term = 'any'
  }
}
