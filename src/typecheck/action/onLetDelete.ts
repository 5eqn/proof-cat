// Code action: delete let if not referred
import { TLet } from "../model/term";
import { assertNotOccur } from "./hasOccurrence";
import { deleteVar } from "./deleteVar";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

export function onLetDelete(len: number, draft: Draft<TLet>): void {
  assertNotOccur(len + 1, 0, draft.next)
  deleteVar(0, 1, draft.next)
  const copy = { ...draft.next }
  deleteFields(draft)
  Object.assign(draft, copy)
}
