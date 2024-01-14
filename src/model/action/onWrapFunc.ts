// Code action: wrap with func
import {Callback} from "../callback";
import {Term, TFunc} from "../term";

export const onWrapFunc = (onChange: Callback<Term>) => {
    onChange(draft => {
        const copy = {...draft}
        const tm = draft as TFunc
        tm.term = 'func'
        tm.param = []
        tm.paramID = []
        tm.body = copy
    })
}