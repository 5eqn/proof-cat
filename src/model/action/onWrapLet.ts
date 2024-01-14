// Code action: wrap with let
import {Callback} from "../callback";
import {Term, TLet} from "../term";
import {addVar} from "./addVar";

export const onWrapLet = (name: string, onChange: Callback<Term>) => {
    onChange(draft => {
        const copy = {...draft}
        const tm = draft as TLet
        tm.term = 'let'
        tm.id = name
        tm.body = {
            term: 'any',
        }
        tm.next = copy
        addVar(0, tm.next)
    })
}