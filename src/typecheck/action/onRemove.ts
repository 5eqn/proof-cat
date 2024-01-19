// Code action: wrap with app
import { Term } from "../model/term";
import { Draft } from "immer";
import { onOverride } from "./onOverride";
import { onLetDelete } from "./onLetDelete";
import { assertNotOccur } from "./hasOccurrence";
import { deleteVar } from "./deleteVar";

export function onRemove(envLen: number, draft: Draft<Term>): void {
  switch (draft.term) {
    case 'func':
    case 'pi':
      const size: number = draft.param.length
      for (let i = 0; i < size; i++)
        assertNotOccur(envLen + size, i, draft.body)
      deleteVar(0, size, draft.body)
      onOverride(draft, draft.body)
      return
    case 'app':
      return onOverride(draft, draft.func)
    case 'let':
      return onLetDelete(envLen, draft)
    default:
      return onOverride(draft, { term: 'any' })
  }
}
