import { i18n } from "../../i18n"
import { apply } from "../model/closure"
import { unify } from "./index"
import { VPi, VVar } from "../model/value"

export function unifyPi(len: number, x: VPi, y: VPi): string | null {
  const piLen = x.param.length
  if (piLen !== y.param.length)
    return i18n.err.fromLenMismatch(piLen, y.param.length)
  for (let i = 0; i < piLen; i++) {
    const res = unify(len, x.param[i], y.param[i])
    if (res !== null) return res
  }
  const piArgs = x.paramID.map<VVar>((id, i) => ({
    val: 'var',
    id: id,
    lvl: len + piLen - i - 1
  }))
  const piToRes = unify(
    len + piLen,
    apply(x.func, piArgs),
    apply(y.func, piArgs),
  )
  return piToRes
}
