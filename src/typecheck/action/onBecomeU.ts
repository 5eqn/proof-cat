import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

export function onBecomeU(draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'uni',
  })
}
