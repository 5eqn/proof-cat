// Code action: wrap with pi
import { Draft } from "immer";
import { Term, TPi } from "../term";

export function onWrapPi(draft: Draft<Term>): void {
  const copy = { ...draft }
  const tm = (draft as TPi)
  tm.term = 'pi'
  tm.param = []
  tm.paramID = []
  tm.body = copy
}
