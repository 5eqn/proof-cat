export function mapRecord<T, U>(
  record: Record<string, T>,
  f: (id: string, t: T) => U,
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(record).map(
      ([id, t]) => [id, f(id, t)]
    )
  )
}

export function listRecord<T, U>(
  record: Record<string, T>,
  f: (id: string, t: T) => U,
): U[] {
  return Object.entries(record).map(
    ([id, t]) => f(id, t)
  )
}

