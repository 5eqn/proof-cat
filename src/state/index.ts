import { proxy } from "valtio"
import { ActionBranch, ActionRoot } from "../typecheck/model/action"
import { InferResult } from "../typecheck/model/infer"
import { Term } from "../typecheck/model/term"

// Store
const tempActions: ActionRoot = { type: 'root', next: [] }
export interface State {
  actions: ActionRoot
  curr: ActionRoot | ActionBranch
  term: Term,
  inferResult: InferResult
}
export const state = proxy<State>({
  actions: tempActions,
  curr: tempActions,
  term: { term: 'any' },
  inferResult: {
    type: { val: 'any' },
    env: [],
    ctx: [],
    ns: [],
    term: 'any'
  },
})
