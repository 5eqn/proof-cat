import { unify } from "./index"
import { VApp } from "../model/value"
import { unifyNamespace } from "./namespace"
import { unifyArray } from "./array"

export function unifyApp(len: number, x: VApp, y: VApp): void {
  unifyNamespace(x.argID, y.argID)
  unifyArray(len, x.arg, y.arg)
  unify(len, x.func, y.func)
}
