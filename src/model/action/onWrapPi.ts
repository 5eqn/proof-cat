// Code action: wrap with pi
import {Callback} from "../callback";
import {Term, TPi} from "../term";

export const onWrapPi = (onChange: Callback<Term>) => {
    onChange(draft => {
        const copy = {...draft}
        const tm = (draft as TPi)
        tm.term = 'pi'
        tm.from = []
        tm.fromID = []
        tm.to = copy
    })
}