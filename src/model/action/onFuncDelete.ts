// Code action: delete param
import { Term, TFunc, TPi } from "../term";
import { hasOccurrence } from "./hasOccurrence";
import { message } from "antd";
import { i18n } from "../../i18n";
import { deleteVar } from "./deleteVar";
import { Draft } from "immer";

function onFuncDelete(
  ix: number,
  len: number,
  term: Term,
  draft: Draft<TFunc | TPi>
): void {
  if (hasOccurrence(len, ix, term))
    message.error(i18n.err.referred)
  else {
    draft.param.splice(ix, 1)
    draft.paramID.splice(ix, 1)
    deleteVar(ix, draft.body)
  }
}

export const funcDeleteIn = (
  ix: number,
  len: number,
  term: Term,
) => (draft: Draft<TFunc | TPi>) =>
    onFuncDelete(ix, len, term, draft)
