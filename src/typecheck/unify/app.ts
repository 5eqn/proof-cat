import { unify } from "./index"
import { VApp } from "../model/value"

export function unifyApp(len: number, x: VApp, y: VApp): void {
  unify(len, x.arg, y.arg)
  unify(len, x.func, y.func)
}
