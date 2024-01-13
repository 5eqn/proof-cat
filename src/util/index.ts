// Catch error in evaluation process
export function wrap(proc: () => string): string {
  try {
    const result = proc()
    return result
  } catch (e) {
    return `Error: ${e}`
  }
}
