export function deleteFields<T>(draft: T): {} {
  for (const key in draft) delete draft[key]
  // Reason for casting: `delete` does not change type signature
  return draft as {}
}
