// Store an action
import { ActionBranch, ActionPack, revertAction } from "../typecheck/model/action";
import { runAction } from "../typecheck/action";
import { infer } from "../typecheck/infer";
import { CodeActionError } from "../typecheck/model/error";
import { message } from "antd";
import { state } from "./index";

function storeAction(action: ActionPack): void {
  const nextAction: ActionBranch = {
    type: 'branch',
    next: [],
    action,
    parent: state.curr
  }
  state.curr.next.push(nextAction)
  state.curr = nextAction
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
