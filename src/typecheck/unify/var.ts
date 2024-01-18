import { ErrorVariableMismatch } from "../model/error";
import { VVar } from "../model/value";

export function unifyVar(x: VVar, y: VVar) {
  if (x.lvl !== (y as VVar).lvl) throw new ErrorVariableMismatch()
}
