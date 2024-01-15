// Catch error in evaluation process
export function wrap(proc: () => string): string {
  try {
    const result = proc()
    return result
  } catch (e) {
    return `Error: ${e}`
  }
}

// Convert an array to an indexed array
export function index<T>(arr: T[]): [T, number][] {
  return arr.map((n, globalIX) => [n, globalIX])
}

// Invert an indexed array
export function invert<T>(arr: [T, number][]): number[] {
  let invSel = new Array(arr.length)
  arr.forEach(([_, globalIX], localIX) => {
    invSel[globalIX] = localIX
  })
  return invSel
}
