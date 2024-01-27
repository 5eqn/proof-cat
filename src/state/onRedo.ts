// Redo an action
import { message } from "antd";
import { onUpdate } from "./onUpdate";
import { state } from "./index";
import i18n from "../i18n";

export function onRedo(): void {
  if (state.curr.next.length === 0) return message.error(i18n.t('noRedo')) as any
  onUpdate(state.curr.action as any, false)
  state.curr = state.curr.next[state.curr.next.length - 1]
}
