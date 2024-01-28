import { ErrorVariableMismatch } from "../model/error";
import { VVar } from "../model/value";

export function unifyVar(x: VVar, y: VVar) {
  if (x.lvl !== y.lvl) throw new ErrorVariableMismatch()
}
