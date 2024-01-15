import { quoteUni } from "./uni"

describe('quoteUni function', () => {
  test('should return an object with term property as "uni"', () => {
    const result = quoteUni()
    expect(result).toEqual({ term: 'uni' })
  })

  test('should return an object', () => {
    const result = quoteUni()
    expect(typeof result).toBe('object')
  })

  test('should have a property named "term"', () => {
    const result = quoteUni()
    expect(result).toHaveProperty('term')
  })

  test('should have the "term" property equal to "uni"', () => {
    const result = quoteUni()
    expect(result.term).toBe('uni')
  })
})
