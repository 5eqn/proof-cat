// Code action: wrap with app
import { Term } from "../model/term";
import { Draft } from "immer";
import { onOverride } from "./onOverride";
import { addVar } from "./addVar";

export function onRevertRemove(len: number, old: Term, draft: Draft<Term>): void {
  switch (old.term) {
    case 'func':
    case 'pi':
      const size: number = old.param.length
      addVar(len, size, old.body)
      onOverride(draft, old)
      return
    case 'let':
      addVar(len, 1, old.next)
      onOverride(draft, old)
      return
    default:
      return onOverride(draft, old)
  }
}
