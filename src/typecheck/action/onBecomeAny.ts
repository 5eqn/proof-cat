import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./helper/deleteFields";

export function onBecomeAny(draft: Draft<Term>): void {
    deleteFields(draft)
    draft.term = 'any'
}