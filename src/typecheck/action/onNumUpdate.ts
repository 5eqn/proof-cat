import { Draft } from "immer";
import { TNum } from "../model/term";

export function onNumUpdate(
  num: number,
  draft: Draft<TNum>
): void {
  draft.num = num
}
