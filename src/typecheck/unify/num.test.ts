import { Val } from "../model/value"
import { unify } from "."

describe('unifyNum function', () => {
  const a: Val = {
    val: 'num',
    num: 114514,
  }

  const b: Val = {
    val: 'num',
    num: 1919810,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify same numbers', () => {
    expect(() => unify(1, a, a)).not.toThrow()
  })

  test('should not unify if number differs', () => {
    expect(() => unify(1, a, b)).toThrow()
  })
})

