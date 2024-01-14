import {Callback} from "../callback";
import {Term} from "../term";

export const onBecomeU = (onChange: Callback<Term>) => {
    onChange(draft => {
        Object.assign(draft, {
            term: 'uni',
        })
    })
}