import { Draft } from "immer";
import { TType } from "../model/term";

export function onUpdateType(
  type: string,
  draft: Draft<TType>
): void {
  draft.type = type
}
