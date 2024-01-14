import {Callback} from "../callback";
import {Term} from "../term";

export const onBecomeType = (type: string, onChange: Callback<Term>) => {
    onChange(draft => {
        Object.assign(draft, {
            term: 'type',
            type,
        })
    })
}