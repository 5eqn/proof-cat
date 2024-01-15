import { Draft } from "immer";
import { Term } from "../model/term";

export function onBecomeU(draft: Draft<Term>): void {
  Object.assign(draft, {
    term: 'uni',
  })
}