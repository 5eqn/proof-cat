import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

// Code action: anify
export function onAnify(draft: Draft<Term>): void {
  deleteFields(draft)
  draft.term = 'any'
}
