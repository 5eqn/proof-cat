// Code action: delete param
import { Term, TFunc, TPi } from "../term";
import { Callback } from "../callback";
import { hasOccurrence } from "./hasOccurrence";
import { message } from "antd";
import { i18n } from "../../i18n";
import { deleteVar } from "./deleteVar";

export const onFuncDelete = (
  ix: number,
  len: number,
  term: Term,
  onChange: Callback<TFunc | TPi>
) => {
  if (hasOccurrence(len, ix, term))
    message.error(i18n.err.referred)
  else {
    onChange(draft => {
      draft.param.splice(ix, 1)
      draft.paramID.splice(ix, 1)
      deleteVar(ix, draft.body)
    })
  }
}
