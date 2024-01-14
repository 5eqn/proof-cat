// Code action: delete param
import {Term, TPi} from "../term";
import {Callback} from "../callback";
import {hasOccurrence} from "./hasOccurrence";
import {message} from "antd";
import {i18n} from "../../i18n";
import {deleteVar} from "./deleteVar";

export const onPiDelete = (
    ix: number,
    len: number,
    term: Term,
    onChange: Callback<TPi>
) => {
    if (hasOccurrence(len, ix, term))
        message.error(i18n.err.referred)
    else {
        onChange(draft => {
            draft.from.splice(ix, 1)
            draft.fromID.splice(ix, 1)
            deleteVar(ix, draft.to)
        })
    }
}