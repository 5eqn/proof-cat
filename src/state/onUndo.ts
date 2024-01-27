// Undo an action
import {message} from "antd";
import {i18n} from "../i18n";
import {onUpdate} from "./onUpdate";
import {revertAction} from "../typecheck/model/action";
import {state} from "./index";

export function onUndo(): void {
    if (state.curr.parent === undefined) return message.error(i18n.err.noUndo) as any
    onUpdate(revertAction(state.curr.parent.action as any), false)
    state.curr = state.curr.parent as any
}