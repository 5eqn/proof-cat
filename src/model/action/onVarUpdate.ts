import {Callback} from "../callback";
import {TVar} from "../term";

export const onVarUpdate = (
    newIX: number,
    ns: string[],
    onChange: Callback<TVar>
) => {
    onChange(draft => {
        // Incrementally update variable index and name
        draft.ix = newIX
        draft.id = ns[newIX]
    })
}