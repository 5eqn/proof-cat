// Redo an action
import {message} from "antd";
import {i18n} from "../i18n";
import {onUpdate} from "./onUpdate";
import {state} from "./index";

export function onRedo(): void {
    if (state.curr.next.length === 0) return message.error(i18n.err.noRedo) as any
    onUpdate(state.curr.action as any, false)
    state.curr = state.curr.next[state.curr.next.length - 1]
}