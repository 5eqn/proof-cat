import { Draft } from "immer";
import { TApp } from "../model/term";

function _onArgUpdate(
  name: string,
  newIX: number,
  localIX: number,
  draft: Draft<TApp>,
): void {
  // Incrementally update variable index and name
  draft.argIX[localIX] = newIX
  draft.argID[localIX] = name
}

export const onArgUpdate = (
  [name, newIX]: [string, number],
  localIX: number,
) => (draft: Draft<TApp>) =>
    _onArgUpdate(name, newIX, localIX, draft)
