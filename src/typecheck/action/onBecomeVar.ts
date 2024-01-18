import { Term } from "../model/term";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

export function onBecomeVar(id: string, ix: number, draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'var',
    id,
    ix,
  })
}
