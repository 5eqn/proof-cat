import { Draft } from "immer";
import { ActionPack } from "../model/action"
import { Term } from "../model/term";
import { onBecomeAny } from "./onBecomeAny";
import { onBecomeNum } from "./onBecomeNum";
import { onBecomeType } from "./onBecomeType";
import { onBecomeU } from "./onBecomeU";
import { onBecomeVar } from "./onBecomeVar";
import { onParamAdd } from "./onParamAdd";
import { onParamDelete } from "./onParamDelete";
import { onUpdateNum } from "./onUpdateNum";
import { onRemove } from "./onRemove";
import { onRevertRemove } from "./onRevertRemove";
import { onUpdateType } from "./onUpdateType";
import { onUpdateVar } from "./onUpdateVar";
import { onWrapApp } from "./onWrapApp";
import { onWrapFunc } from "./onWrapFunc";
import { onWrapLet } from "./onWrapLet";
import { onWrapPi } from "./onWrapPi";

// All actions, if throw error, should not change state
export function runAction(pack: ActionPack<Term, Term>, draft: Draft<Term>): void {
  const { undo }: ActionPack<Term, Term> = pack
  if (undo) runUndo(pack, draft)
  else runDo(pack, draft)
}

function runUndo(
  { action, lens }: ActionPack<Term, Term>,
  draft: Draft<Term>
): void {
  const term = lens(draft) as any
  switch (action.action) {
    case 'remove':
      return onRevertRemove(action.backup, term)
    case 'updateVar':
      return onUpdateVar(action.oldID, action.oldIX, term)
    case 'updateNum':
      return onUpdateNum(action.oldNum, term)
    case 'updateType':
      return onUpdateType(action.oldType, term)
    case 'addParam':
      return onParamDelete(action.ix, action.envLen, term)
    case 'wrapPi':
    case 'wrapFunc':
    case 'wrapApp':
    case 'wrapLet':
      return onRemove(action.envLen, term)
    default:
      return onBecomeAny(term)
  }
}

function runDo(
  { action, lens }: ActionPack<Term, Term>,
  draft: Draft<Term>
): void {
  const term = lens(draft) as any
  switch (action.action) {
    case 'remove':
      return onRemove(action.envLen, term)
    case 'updateVar':
      return onUpdateVar(action.newID, action.newIX, term)
    case 'updateNum':
      return onUpdateNum(action.newNum, term)
    case 'updateType':
      return onUpdateType(action.newType, term)
    case 'addParam':
      return onParamAdd(action.ix, action.id, term)
    case 'wrapPi':
      return onWrapPi(action.name, term)
    case 'wrapFunc':
      return onWrapFunc(action.name, term)
    case 'wrapApp':
      return onWrapApp(action.funcType, term)
    case 'wrapLet':
      return onWrapLet(action.name, term)
    case 'becomeU':
      return onBecomeU(term)
    case 'becomeType':
      return onBecomeType(action.name, term)
    case 'becomeNum':
      return onBecomeNum(action.num, term)
    case 'becomeVar':
      return onBecomeVar(action.id, action.ix, term)
  }
}
