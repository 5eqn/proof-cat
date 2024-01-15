import { Draft } from "immer";
import { TNum } from "../term";

function onNumUpdate(
  num: number,
  draft: Draft<TNum>
): void {
  draft.num = num
}

export const numUpdateTo = (num: number) => (draft: Draft<TNum>) =>
  onNumUpdate(num, draft)
