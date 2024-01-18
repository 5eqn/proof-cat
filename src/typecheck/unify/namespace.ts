import { ErrorLengthMismatch, ErrorNamespaceMismatch } from "../model/error";

export function unifyNamespace(x: string[], y: string[]) {
  const len = x.length
  if (len !== y.length) {
    throw new ErrorLengthMismatch()
  }
  for (let i = 0; i < len; i++) {
    if (x[i] !== y[i]) {
      throw new ErrorNamespaceMismatch()
    }
  }
}
