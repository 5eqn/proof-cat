import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

function onBecomeNum(num: number, draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'num',
    num,
  })
}

export const becomeNumOf = (num: number) => (draft: Draft<Term>) =>
  onBecomeNum(num, draft)
