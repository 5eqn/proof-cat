// Undo an action
import { message } from "antd";
import { onUpdate } from "./onUpdate";
import { revertAction } from "../typecheck/model/action";
import { state } from "./index";
import i18n from "../i18n";

export function onUndo(): void {
  if (state.curr.type === 'root') {
    message.error(i18n.t('noUndo'))
    return
  }
  onUpdate(revertAction(state.curr.action), false)
  state.curr = state.curr.parent
}
