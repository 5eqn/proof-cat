import { message } from "antd"
import { Updater } from "use-immer"
import { i18n } from "../../i18n"
import { runAction } from "../action"
import { infer } from "../infer"
import { ActionPack, revertAction } from "../model/action"
import { CodeActionError } from "../model/error"
import { Term } from "../model/term"

// Action tree
export type ActionTree = {
  action?: ActionPack<Term, Term>
  next: ActionTree[]
  parent?: ActionTree
}

// All actions
const actions: ActionTree = { next: [] }

// Current action, action should be undefined
let curr: ActionTree = actions

// Store an action
function storeAction(action: ActionPack<Term, Term>): void {
  curr.action = action
  const nextAction = { next: [], parent: curr }
  curr.next.push(nextAction)
  curr = nextAction
}

// Undo an action
export function undo(setState: Updater<Term>): void {
  if (curr.parent === undefined) return message.error(i18n.err.noUndo) as any
  onUpdate(curr.parent.action as any, setState, false)
  curr = curr.parent as any
}

// Redo an action
export function redo(setState: Updater<Term>): void {
  if (curr.next.length === 0) return message.error(i18n.err.noRedo) as any
  onUpdate(curr.next[curr.next.length - 1].action as any, setState, false)
  curr = curr.next[curr.next.length - 1]
}

// Dispatch an action
export function onUpdate(
  action: ActionPack<Term, Term>,
  setState: Updater<Term>,
  store: boolean = true,
): boolean {
  let success = true
  setState(draft => {
    try {
      // Run action
      runAction(action, draft)
      try {
        // Check if new term is well-typed
        infer({
          env: [],
          ctx: [],
          ns: [],
          depth: 0,
          term: draft,
          onChange: 0 as any,
        })
      } catch (e) {
        // If not, revert action and throw error
        runAction(revertAction(action), draft)
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
  })
  if (!success) {
    return false
  }
  if (store) storeAction(action)
  return true;
}
