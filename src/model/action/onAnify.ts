/********
 RENDER
 ********/
import {Callback} from "../callback";
import {Term} from "../term";

// Code action: anify
export const onAnify = (onChange: Callback<Term>) => {
    onChange(draft => {
        switch (draft.term) {
            case 'app':
                Object.assign(draft, draft.func)
                return
            default:
                draft.term = 'any'
        }
    })
}