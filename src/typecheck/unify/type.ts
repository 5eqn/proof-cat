import { i18n } from "../../i18n"
import { VType } from "../model/value"

export function unifyType(x: VType, y: VType): string | null {
  return x.type === (y as VType).type ? null
    : i18n.err.typeMismatch(x.type, (y as VType).type)
}
