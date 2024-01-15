// Code action: add param
import { Callback } from "../callback";
import { TPi } from "../term";
import { addVar } from "./addVar";

export const onPiAdd = (name: string, onChange: Callback<TPi>) => {
  onChange(draft => {
    draft.param = [{ term: 'any' }, ...draft.param]
    draft.paramID = [name, ...draft.paramID]
    addVar(0, draft.body)
  })
}
