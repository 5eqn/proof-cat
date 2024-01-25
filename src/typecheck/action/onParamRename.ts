import { TFunc, TPi } from "../model/term";

export function onParamRename(ix: number, id: string, term: TFunc | TPi) {
  term.paramID[ix] = id
}
