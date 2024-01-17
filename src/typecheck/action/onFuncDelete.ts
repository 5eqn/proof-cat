// Code action: delete param
import { TFunc, TPi } from "../model/term";
import { hasOccurrence } from "./hasOccurrence";
import { message } from "antd";
import { i18n } from "../../i18n";
import { deleteVar } from "./deleteVar";
import { Draft } from "immer";

export function onFuncDelete(
  ix: number,
  len: number,
  draft: Draft<TFunc | TPi>
): void {
  if (hasOccurrence(len, ix, draft.body))
    message.error(i18n.err.referred)
  else {
    draft.param.splice(ix, 1)
    draft.paramID.splice(ix, 1)
    deleteVar(ix, draft.body)
  }
}
