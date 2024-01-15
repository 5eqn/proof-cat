// Make sure variable name don't duplicate in actions
import { i18n } from "../../i18n";

export function validate(name: string, ns: string[]): string | null {
  const containName = ns.map((n) => name === n).reduce((x, y) => x || y, false)
  return containName ? i18n.err.nameDup : null
}
