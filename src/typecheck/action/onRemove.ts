// Code action: wrap with app
import {Term} from "../model/term";
import {Draft} from "immer";
import {overrideFields} from "./helper/overrideFields";
import {assertNotOccur} from "./helper/assertNotOccur";
import {deleteVar} from "./helper/deleteVar";

export function onRemove(envLen: number, draft: Draft<Term>): void {
  switch (draft.term) {
    case 'func':
    case 'pi':
      const size: number = draft.param.length
      for (let i = 0; i < size; i++)
        assertNotOccur(envLen + size, i, draft.body)
      deleteVar(0, size, draft.body)
      overrideFields(draft, draft.body)
      return
    case 'app':
      return overrideFields(draft, draft.func)
    case 'let':
      assertNotOccur(envLen + 1, 0, draft.next)
      deleteVar(0, 1, draft.next)
      overrideFields(draft, draft.next)
      return
    default:
      return overrideFields(draft, { term: 'any' })
  }
}
