import { evaluateAny } from "./any"

describe('evaluateAny function', () => {
  test('should return an object with val property as "any"', () => {
    const result = evaluateAny()
    expect(result).toEqual({ val: 'any' })
  })

  test('should return an object', () => {
    const result = evaluateAny()
    expect(typeof result).toBe('object')
  })

  test('should have a property named "val"', () => {
    const result = evaluateAny()
    expect(result).toHaveProperty('val')
  })

  test('should have the "val" property equal to "any"', () => {
    const result = evaluateAny()
    expect(result.val).toBe('any')
  })
})
