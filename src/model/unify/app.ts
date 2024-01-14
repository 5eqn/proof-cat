import { i18n } from "../../i18n"
import { unify } from "../unify"
import { VApp } from "../value"

export function unifyApp(len: number, x: VApp, y: VApp): string | null {
  const appLen = x.arg.length
  if (appLen !== y.arg.length)
    return i18n.err.argLenMismatch(appLen, y.arg.length)
  for (let i = 0; i < appLen; i++) {
    const res = unify(len, x.arg[i], y.arg[i])
    if (res !== null) return res
  }
  return unify(len, x.func, y.func)
}
