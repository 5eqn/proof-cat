import {Callback} from "../callback";
import {Term} from "../term";

export const onBecomeNum = (num: number, onChange: Callback<Term>) => {
    onChange(draft => {
        Object.assign(draft, {
            term: 'num',
            num,
        })
    })
}