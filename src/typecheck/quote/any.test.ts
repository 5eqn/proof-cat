import { quoteAny } from "./any"

describe('quoteAny function', () => {
  test('should return an object with term property as "any"', () => {
    const result = quoteAny()
    expect(result).toEqual({ term: 'any' })
  })

  test('should return an object', () => {
    const result = quoteAny()
    expect(typeof result).toBe('object')
  })

  test('should have a property named "term"', () => {
    const result = quoteAny()
    expect(result).toHaveProperty('term')
  })

  test('should have the "term" property equal to "any"', () => {
    const result = quoteAny()
    expect(result.term).toBe('any')
  })
})
