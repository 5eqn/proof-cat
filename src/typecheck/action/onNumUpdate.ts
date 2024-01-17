import { Draft } from "immer";
import { TNum } from "../model/term";

function _onNumUpdate(
  num: number,
  draft: Draft<TNum>
): void {
  draft.num = num
}

export const onNumUpdate = (num: number) => (draft: Draft<TNum>) =>
  _onNumUpdate(num, draft)
