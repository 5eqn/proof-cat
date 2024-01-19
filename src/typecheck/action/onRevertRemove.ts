// Code action: wrap with app
import { Term } from "../model/term";
import { Draft } from "immer";
import { overrideFields } from "./helper/overrideFields";
import { addVar } from "./helper/addVar";

export function onRevertRemove(old: Term, draft: Draft<Term>): void {
  switch (old.term) {
    case 'func':
    case 'pi':
      const size: number = old.param.length
      addVar(0, size, old.body)
      overrideFields(draft, old)
      return
    case 'let':
      addVar(0, 1, old.next)
      overrideFields(draft, old)
      return
    default:
      return overrideFields(draft, old)
  }
}
