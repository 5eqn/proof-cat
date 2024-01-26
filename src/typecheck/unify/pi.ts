import { apply } from "../model/closure"
import { unify } from "./index"
import { VPi } from "../model/value"

export function unifyPi(envLen: number, x: VPi, y: VPi): void {
  unify(envLen, x.param, y.param)
  unify(
    envLen + 1,
    apply(x.func, { val: 'var', lvl: envLen }),
    apply(y.func, { val: 'var', lvl: envLen }),
  )
}
