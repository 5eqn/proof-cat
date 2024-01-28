// Init state
import { overrideFields } from "../typecheck/action/helper/overrideFields";
import { state } from "./index";

export function initState(): void {
  overrideFields(state.actions, {
    type: 'root',
    next: []
  })
  state.curr = state.actions
}
