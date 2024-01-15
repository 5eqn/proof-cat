import { i18n } from "../../i18n"
import { VNum } from "../model/value"

export function unifyNum(x: VNum, y: VNum): string | null {
  return x.num === (y as VNum).num ? null
    : i18n.err.numMismatch(x.num, (y as VNum).num)
}
