import { Val } from "../model/value"
import { unify } from "."

describe('unifyVar function', () => {
  const a: Val = {
    val: 'var',
    id: 'a',
    lvl: 0,
  }

  const b: Val = {
    val: 'var',
    id: 'a',
    lvl: 1,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify same variables', () => {
    expect(() => unify(2, a, a)).not.toThrow()
  })

  test('should not unify if variable differs', () => {
    expect(() => unify(2, a, b)).toThrow()
  })
})

