import { message } from "antd"
import { Updater } from "use-immer"
import { runAction } from "../action"
import { infer } from "../infer"
import { ActionPack, revertAction } from "../model/action"
import { CodeActionError } from "../model/error"
import { Term } from "../model/term"

export function onUpdate(
  action: ActionPack<Term, Term>,
  setState: Updater<Term>,
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
          onChange: (_) => true,
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
  return success;
}
