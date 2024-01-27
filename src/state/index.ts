import {proxy} from "valtio"
import {ActionTree} from "../typecheck/model/action"
import {InferResult} from "../typecheck/model/infer"
import {Term} from "../typecheck/model/term"

// Store
const tempActions: ActionTree = { next: [] }
export const state = proxy({
  actions: tempActions,
  curr: tempActions,
  term: { term: 'any' } as Term,
  inferResult: {
    type: { val: 'any' },
    env: [],
    ctx: [],
    ns: [],
    term: 'any'
  } as InferResult,
})