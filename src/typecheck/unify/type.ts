import { ErrorTypeMismatch } from "../model/error"
import { VType } from "../model/value"

export function unifyType(x: VType, y: VType): void {
  if (x.type !== y.type) throw new ErrorTypeMismatch()
}
