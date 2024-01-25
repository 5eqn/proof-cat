export function isPrefix(prefix: string[], arr: string[]): boolean {
  const len = prefix.length
  if (len >= arr.length) return false
  for (let i = 0; i < len; i++) if (prefix[i] !== arr[i]) return false
  return true
}
