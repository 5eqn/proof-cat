import { Draft } from "immer";
import { Term } from "../model/term";
import { deleteFields } from "./deleteFields";

function _onBecomeNum(num: number, draft: Draft<Term>): void {
  deleteFields(draft)
  Object.assign(draft, {
    term: 'num',
    num,
  })
}

export const onBecomeNum = (num: number) => (draft: Draft<Term>) =>
  _onBecomeNum(num, draft)
