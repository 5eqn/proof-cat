// Code action: wrap with app
import { Term } from "../model/term";
import { Draft } from "immer";
import { onOverride } from "./onOverride";
import { addVar } from "./addVar";

export function onRevertRemove(old: Term, draft: Draft<Term>): void {
  switch (old.term) {
    case 'func':
    case 'pi':
      const size: number = old.param.length
      addVar(0, size, old.body)
      onOverride(draft, old)
      return
    case 'let':
      addVar(0, 1, old.next)
      onOverride(draft, old)
      return
    default:
      return onOverride(draft, old)
  }
}
