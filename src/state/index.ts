import { message } from "antd"
import { proxy } from "valtio"
import { i18n } from "../i18n"
import { runAction } from "../typecheck/action"
import { overrideFields } from "../typecheck/action/helper/overrideFields"
import { infer } from "../typecheck/infer"
import { ActionPack, revertAction } from "../typecheck/model/action"
import { CodeActionError } from "../typecheck/model/error"
import { InferResult } from "../typecheck/model/infer"
import { Term } from "../typecheck/model/term"

// Action tree
export type ActionTree = {
  action?: ActionPack
  next: ActionTree[]
  parent?: ActionTree
}

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

// Init state
export function initState(): void {
  overrideFields(state.actions, { next: [] })
  state.curr = state.actions
}

// Store an action
function storeAction(action: ActionPack): void {
  state.curr.action = action as any
  const nextAction = { next: [], parent: state.curr }
  state.curr.next.push(nextAction)
  state.curr = nextAction
}

// Undo an action
export function onUndo(): void {
  if (state.curr.parent === undefined) return message.error(i18n.err.noUndo) as any
  onUpdate(revertAction(state.curr.parent.action as any), false)
  state.curr = state.curr.parent as any
}

// Redo an action
export function onRedo(): void {
  if (state.curr.next.length === 0) return message.error(i18n.err.noRedo) as any
  onUpdate(state.curr.action as any, false)
  state.curr = state.curr.next[state.curr.next.length - 1]
}

// Dispatch an action
export function onUpdate(
  action: ActionPack,
  storeResult: boolean = true,
): boolean {
  let success = true
  try {
    // Run action
    runAction(action, state.term)
    try {
      // Check if new term is well-typed
      state.inferResult = infer({
        env: [],
        ctx: [],
        ns: [],
        tm: state.term,
      })
    } catch (e) {
      // If not, revert action and throw error
      runAction(revertAction(action), state.term)
      throw e;
    }
  } catch (e) {
    success = false
    if (e instanceof CodeActionError) {
      // Handle predefined error
      message.error(e.toString())
    } else {
      throw e;
    }
  }
  if (!success) {
    return false
  }
  if (storeResult) storeAction(action)
  return true;
}
