import {Callback} from "../callback";
import {Term} from "../term";
import {message} from "antd";
import {i18n} from "../../i18n";

export const onBecomeVar = (ns: string[], onChange: Callback<Term>) => {
    onChange(draft => {
        if (ns.length === 0) {
            message.error(i18n.err.noVariable)
            return
        }
        Object.assign(draft, {
            term: 'var',
            id: ns[0],
            ix: 0,
        })
    })
}