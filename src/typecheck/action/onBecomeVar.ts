import { Term } from "../model/term";
import { message } from "antd";
import { i18n } from "../../i18n";
import { Draft } from "immer";
import { deleteFields } from "./deleteFields";

function _onBecomeVar(ns: string[], draft: Draft<Term>): void {
  if (ns.length === 0) {
    message.error(i18n.err.noVariable)
    return
  }
  deleteFields(draft)
  Object.assign(draft, {
    term: 'var',
    id: ns[0],
    ix: 0,
  })
}

export const onBecomeVar = (ns: string[]) => (draft: Draft<Term>) =>
  _onBecomeVar(ns, draft)
