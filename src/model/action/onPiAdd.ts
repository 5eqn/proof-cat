// Code action: add param
import {Callback} from "../callback";
import {TPi} from "../term";
import {addVar} from "./addVar";

export const onPiAdd = (name: string, onChange: Callback<TPi>) => {
    onChange(draft => {
        draft.from = [{term: 'any'}, ...draft.from]
        draft.fromID = [name, ...draft.fromID]
        addVar(0, draft.to)
    })
}