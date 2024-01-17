import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

// Code action: anify
export function onAnify(draft: Draft<Term>): void {
  switch (draft.term) {
    case 'app':
      const copy = { ...draft.func }
      deleteFields(draft)
      Object.assign(draft, copy)
      return
    default:
      deleteFields(draft)
      draft.term = 'any'
  }
}
