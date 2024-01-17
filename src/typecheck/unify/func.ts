import { i18n } from "../../i18n"
import { apply } from "../model/closure"
import { unify } from "./index"
import { VFunc, VVar } from "../model/value"

export function unifyFunc(len: number, x: VFunc, y: VFunc): string | null {
  const funcLen = x.param.length
  if (funcLen !== y.param.length)
    return i18n.err.fromLenMismatch
  for (let i = 0; i < funcLen; i++) {
    const res = unify(len, x.param[i], y.param[i])
    if (res !== null) return res
  }
  const funcArgs = x.paramID.map<VVar>((id, i) => ({
    val: 'var',
    id: id,
    lvl: len + funcLen - i - 1
  }))
  const funcRes = unify(
    len + funcLen,
    apply(x.func, funcArgs),
    apply(y.func, funcArgs),
  )
  return funcRes
}
