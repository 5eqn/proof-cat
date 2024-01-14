// Code action: delete let if not referred
import {Env} from "../env";
import {Term, TLet} from "../term";
import {Callback} from "../callback";
import {hasOccurrence} from "./hasOccurrence";
import {message} from "antd";
import {i18n} from "../../i18n";
import {deleteVar} from "./deleteVar";

export const onLetDelete = (env: Env, term: Term, onChange: Callback<TLet>) => {
    if (hasOccurrence(env.length + 1, 0, term))
        message.error(i18n.err.referred)
    else {
        onChange(draft => {
            deleteVar(0, draft.next)
            Object.assign(draft, draft.next)
        })
    }
}