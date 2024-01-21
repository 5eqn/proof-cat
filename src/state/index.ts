import { message } from "antd"
import { proxy } from "valtio"
import { i18n } from "../i18n"
import { runAction } from "../typecheck/action"
import { infer } from "../typecheck/infer"
import { ActionPack, revertAction } from "../typecheck/model/action"
import { CodeActionError } from "../typecheck/model/error"
import { Term } from "../typecheck/model/term"

// Action tree
export type ActionTree<T extends Term> = {
  action?: ActionPack<T, Term>
  next: ActionTree<T>[]
  parent?: ActionTree<T>
}

// All actions
const actions: ActionTree<Term> = { next: [] }

// Current action, action should be undefined
let curr: ActionTree<Term> = actions

// Current term
export const term: Term = proxy({ term: 'any' })

// Store an action
function storeAction<T extends Term>(action: ActionPack<T, Term>): void {
  curr.action = action as any
  const nextAction = { next: [], parent: curr }
  curr.next.push(nextAction)
  curr = nextAction
}

// Undo an action
export function onUndo(): void {
  if (curr.parent === undefined) return message.error(i18n.err.noUndo) as any
  onUpdate(revertAction(curr.parent.action as any), false)
  curr = curr.parent as any
}

// Redo an action
export function onRedo(): void {
  if (curr.next.length === 0) return message.error(i18n.err.noRedo) as any
  onUpdate(curr.action as any, false)
  curr = curr.next[curr.next.length - 1]
}

// Dispatch an action
export function onUpdate<T extends Term>(
  action: ActionPack<T, Term>,
  store: boolean = true,
): boolean {
  let success = true
  try {
    // Run action
    runAction(action, term as T)
    try {
      // Check if new term is well-typed
      infer({
        env: [],
        ctx: [],
        ns: [],
        depth: 0,
        term,
        lens: 0 as any,
      })
    } catch (e) {
      // If not, revert action and throw error
      runAction(revertAction(action), term as T)
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
  if (store) storeAction(action)
  return true;
}
