import { i18n } from "../../i18n"
import { apply } from "../closure"
import { unify } from "../unify"
import { VPi, VVar } from "../value"

export function unifyPi(len: number, x: VPi, y: VPi): string | null {
  const piLen = x.from.length
  if (piLen !== y.from.length)
    return i18n.err.fromLenMismatch(piLen, y.from.length)
  for (let i = 0; i < piLen; i++) {
    const res = unify(len, x.from[i], y.from[i])
    if (res !== null) return res
  }
  const piArgs = x.fromID.map<VVar>((id, i) => ({
    val: 'var',
    id: id,
    lvl: len + piLen - i - 1
  }))
  const piToRes = unify(
    len + piLen,
    apply(x.to, piArgs),
    apply(y.to, piArgs),
  )
  return piToRes
}
