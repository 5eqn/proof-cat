import { Draft } from "immer";
import { ActionPack } from "../model/action"
import { Term } from "../model/term";
import { onAnify } from "./onAnify";
import { onBecomeNum } from "./onBecomeNum";
import { onBecomeType } from "./onBecomeType";
import { onBecomeU } from "./onBecomeU";
import { onBecomeVar } from "./onBecomeVar";
import { onFuncAdd } from "./onFuncAdd";
import { onFuncDelete } from "./onFuncDelete";
import { onNumUpdate } from "./onNumUpdate";
import { onOverride } from "./onOverride";
import { onVarUpdate } from "./onVarUpdate";
import { onWrapApp } from "./onWrapApp";
import { onWrapFunc } from "./onWrapFunc";
import { onWrapLet } from "./onWrapLet";
import { onWrapPi } from "./onWrapPi";

export function run(pack: ActionPack, draft: Draft<Term>): void {
  const { undo }: ActionPack = pack
  if (undo) runUndo(pack, draft)
  else runDo(pack, draft)
}

function runUndo({ action, lens }: ActionPack, draft: Draft<Term>): void {
  const term = lens(draft) as any
  switch (action.action) {
    case 'updateVar':
      return onVarUpdate(
        action.oldID,
        action.oldIX,
        term,
      )
    case 'updateNum':
      return onNumUpdate(
        action.oldNum,
        term,
      )
    case 'addParam':
      return onFuncDelete(action.ix, action.len, term)
    case 'wrapPi':
      return onOverride(term, term.body)
    case 'wrapFunc':
      return onOverride(term, term.body)
    case 'wrapApp':
      return onOverride(term, term.func)
    case 'wrapLet':
      return onOverride(term, term.next)
    default:
      return onAnify(term)
  }
}

function runDo({ action, lens }: ActionPack, draft: Draft<Term>): void {
  const term = lens(draft) as any
  switch (action.action) {
    case 'updateVar':
      return onVarUpdate(
        action.newID,
        action.newIX,
        term,
      )
    case 'updateNum':
      return onNumUpdate(
        action.newNum,
        term,
      )
    case 'addParam':
      return onFuncAdd(action.ix, action.name, term)
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
      return onBecomeType(action.type, term)
    case 'becomeNum':
      return onBecomeNum(action.num, term)
    case 'becomeVar':
      return onBecomeVar(action.id, action.ix, term)
  }
}
