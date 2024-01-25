import { ErrorNamespaceMismatch } from "../model/error";

export function unifyName(x: string, y: string) {
  if (x !== y) {
    throw new ErrorNamespaceMismatch()
  }
}
