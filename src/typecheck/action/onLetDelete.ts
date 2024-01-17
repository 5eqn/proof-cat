// Code action: delete let if not referred
import { Term, TLet } from "../model/term";
import { hasOccurrence } from "./hasOccurrence";
import { message } from "antd";
import { i18n } from "../../i18n";
import { deleteVar } from "./deleteVar";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

function _onLetDelete(len: number, term: Term, draft: Draft<TLet>): void {
  if (hasOccurrence(len + 1, 0, term))
    message.error(i18n.err.referred)
  else {
    deleteVar(0, draft.next)
    const copy = { ...draft.next }
    deleteFields(draft)
    Object.assign(draft, copy)
  }
}

export const onLetDelete = (len: number, term: Term) => (draft: Draft<TLet>) =>
  _onLetDelete(len, term, draft)
