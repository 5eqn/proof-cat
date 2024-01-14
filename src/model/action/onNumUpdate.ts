import {Callback} from "../callback";
import {TNum} from "../term";

export const onNumUpdate = (
    num: number,
    onChange: Callback<TNum>
) => {
    onChange(draft => {
        draft.num = num
    })
}