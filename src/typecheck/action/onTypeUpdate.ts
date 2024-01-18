import { Draft } from "immer";
import { TType } from "../model/term";

export function onTypeUpdate(
  type: string,
  draft: Draft<TType>
): void {
  draft.type = type
}
