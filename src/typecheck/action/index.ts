import { ActionPack } from "../model/action"
import { Term } from "../model/term";
import { onRemove } from "./onRemove";
import { onRevertRemove } from "./onRevertRemove";
import { onWrapApp } from "./onWrapApp";
import { onWrapFunc } from "./onWrapFunc";
import { onWrapLet } from "./onWrapLet";
import { onWrapPi } from "./onWrapPi";
import { overrideFields } from "./helper/overrideFields";
import { applyLens } from "../model/lens";

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
    case 'wrapPi':
      return onWrapPi(action.name, term)
    case 'wrapFunc':
      return onWrapFunc(action.name, term)
    case 'wrapApp':
      return onWrapApp(term)
    case 'wrapLet':
      return onWrapLet(action.name, term)
  }
}
