// Code action: add param
import {Callback} from "../callback";
import {TFunc} from "../term";
import {addVar} from "./addVar";

export const onFuncAdd = (name: string, onChange: Callback<TFunc>) => {
    onChange(draft => {
        draft.param = [{term: 'any'}, ...draft.param]
        draft.paramID = [name, ...draft.paramID]
        addVar(0, draft.body)
    })
}