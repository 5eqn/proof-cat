import { i18n } from "../../i18n";
import { VVar } from "../value";

export function unifyVar(x: VVar, y: VVar): string | null {
  return x.lvl === (y as VVar).lvl ? null : i18n.err.variableMismatch(
    x.id, (y as VVar).id,
    x.lvl, (y as VVar).lvl
  )
}
