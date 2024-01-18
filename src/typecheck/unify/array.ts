import { unify } from ".";
import { ErrorLengthMismatch } from "../model/error";
import { Val } from "../model/value";

export function unifyArray(envLen: number, x: Val[], y: Val[]) {
  const arrLen = x.length
  if (arrLen !== y.length) {
    throw new ErrorLengthMismatch()
  }
  for (let i = 0; i < arrLen; i++) {
    unify(envLen, x[i], y[i])
  }
}
