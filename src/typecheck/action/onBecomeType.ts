import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./helper/deleteFields";

export function onBecomeType(type: string, draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'type',
    type,
  })
}
