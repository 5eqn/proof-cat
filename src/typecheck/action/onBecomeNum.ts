import { Draft } from "immer";
import { Term } from "../model/term";

function onBecomeNum(num: number, draft: Draft<Term>): void {
  Object.assign(draft, {
    term: 'num',
    num,
  })
}

export const becomeNumOf = (num: number) => (draft: Draft<Term>) =>
  onBecomeNum(num, draft)
