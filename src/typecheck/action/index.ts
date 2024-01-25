import { ActionPack } from "../model/action"
import { Term } from "../model/term";
import { onParamAdd } from "./onParamAdd";
import { onParamDelete } from "./onParamDelete";
import { onRemove } from "./onRemove";
import { onRevertRemove } from "./onRevertRemove";
import { onWrapApp } from "./onWrapApp";
import { onWrapFunc } from "./onWrapFunc";
import { onWrapLet } from "./onWrapLet";
import { onWrapPi } from "./onWrapPi";
import { overrideFields } from "./helper/overrideFields";
import { applyLens } from "../model/rec";
import { onParamRename } from "./onParamRename";

// All actions, if throw error, should not change state
export function runAction(
  pack: ActionPack,
  draft: Term
): void {
  const { undo }: ActionPack = pack
  if (undo) runUndo(pack, draft)
  else runDo(pack, draft)
}

function runUndo(
  { action, lens }: ActionPack,
  draft: Term
): void {
  const term = applyLens(draft, lens) as any
  switch (action.action) {
    case 'remove':
      return onRevertRemove(action.backup, term)
    case 'override':
      return overrideFields(term, action.backup)
    case 'addParam':
      return onParamDelete(action.ix, action.envLen, term)
    case 'renameParam':
      return onParamRename(action.ix, action.oldID, term)
    case 'wrapPi':
    case 'wrapFunc':
    case 'wrapApp':
    case 'wrapLet':
      return onRemove(action.envLen, term)
  }
}

function runDo(
  { action, lens }: ActionPack,
  draft: Term
): void {
  const term = applyLens(draft, lens) as any
  switch (action.action) {
    case 'remove':
      return onRemove(action.envLen, term)
    case 'override':
      return overrideFields(term, action.term)
    case 'addParam':
      return onParamAdd(action.ix, action.id, term)
    case 'renameParam':
      return onParamRename(action.ix, action.newID, term)
    case 'wrapPi':
      return onWrapPi(action.name, term)
    case 'wrapFunc':
      return onWrapFunc(action.name, term)
    case 'wrapApp':
      return onWrapApp(action.funcType, term)
    case 'wrapLet':
      return onWrapLet(action.name, term)
  }
}
