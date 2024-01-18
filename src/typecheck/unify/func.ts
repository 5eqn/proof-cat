import { apply } from "../model/closure"
import { unify } from "./index"
import { VFunc, VVar } from "../model/value"
import { unifyNamespace } from "./namespace"
import { unifyArray } from "./array"

export function unifyFunc(envLen: number, x: VFunc, y: VFunc): void {
  unifyNamespace(x.paramID, y.paramID)
  unifyArray(envLen, x.param, y.param)
  const paramLen = x.param.length
  const piArgs = x.paramID.map<VVar>((id, i) => ({
    val: 'var',
    id: id,
    lvl: envLen + paramLen - i - 1
  }))
  unify(
    envLen + paramLen,
    apply(x.func, piArgs),
    apply(y.func, piArgs),
  )
}
