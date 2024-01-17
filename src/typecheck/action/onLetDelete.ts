// Code action: delete let if not referred
import { Env } from "../model/env";
import { Term, TLet } from "../model/term";
import { hasOccurrence } from "./hasOccurrence";
import { message } from "antd";
import { i18n } from "../../i18n";
import { deleteVar } from "./deleteVar";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

function onLetDelete(env: Env, term: Term, draft: Draft<TLet>): void {
  if (hasOccurrence(env.length + 1, 0, term))
    message.error(i18n.err.referred)
  else {
    deleteVar(0, draft.next)
    deleteFields(draft, 'next')
    Object.assign(draft, draft.next)
  }
}

export const letDeleteIn = (env: Env, term: Term) => (draft: Draft<TLet>) =>
  onLetDelete(env, term, draft)
