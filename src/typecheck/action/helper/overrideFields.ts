import { deleteFields } from "./deleteFields";

export function overrideFields<T>(draft: T, to: T): void {
  const deleted = deleteFields(draft)
  Object.assign(deleted, to)
}
