import { Draft } from "immer";
import { TApp } from "../model/term";

function onArgUpdate(
  name: string,
  newIX: number,
  localIX: number,
  draft: Draft<TApp>,
): void {
  // Incrementally update variable index and name
  draft.argIX[localIX] = newIX
  draft.argID[localIX] = name
}

export const argUpdateTo = (
  [name, newIX]: [string, number],
  localIX: number,
) => (draft: Draft<TApp>) =>
    onArgUpdate(name, newIX, localIX, draft)
