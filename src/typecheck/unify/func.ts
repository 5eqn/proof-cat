import { apply } from "../model/closure"
import { unify } from "./index"
import { VFunc } from "../model/value"
import { unifyName as unifyName } from "./namespace"

export function unifyFunc(envLen: number, x: VFunc, y: VFunc): void {
  unifyName(x.paramID, y.paramID)
  unify(envLen, x.param, y.param)
  unify(
    envLen + 1,
    apply(x.func, { val: 'var', lvl: envLen }),
    apply(y.func, { val: 'var', lvl: envLen }),
  )
}
