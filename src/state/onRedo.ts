// Redo an action
import { message } from "antd";
import { onUpdate } from "./onUpdate";
import { state } from "./index";
import i18n from "../i18n";

export function onRedo(): void {
  if (state.curr.next.length === 0) {
    message.error(i18n.t('noRedo'))
    return
  }
  state.curr = state.curr.next[state.curr.next.length - 1]
  onUpdate(state.curr.action, false)
}
