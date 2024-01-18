import { ErrorNumMismatch } from "../model/error"
import { VNum } from "../model/value"

export function unifyNum(x: VNum, y: VNum): void {
  if (x.num !== (y as VNum).num) throw new ErrorNumMismatch()
}
