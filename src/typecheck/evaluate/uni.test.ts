import { evaluateUni } from "./uni"

describe('evaluateUni function', () => {
  test('should return an object with val property as "uni"', () => {
    const result = evaluateUni()
    expect(result).toEqual({ val: 'uni' })
  })

  test('should return an object', () => {
    const result = evaluateUni()
    expect(typeof result).toBe('object')
  })

  test('should have a property named "val"', () => {
    const result = evaluateUni()
    expect(result).toHaveProperty('val')
  })

  test('should have the "val" property equal to "uni"', () => {
    const result = evaluateUni()
    expect(result.val).toBe('uni')
  })
})
