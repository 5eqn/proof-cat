import { Val } from "../model/value"
import { unify } from "."

describe('unifyType function', () => {
  const a: Val = {
    val: 'type',
    type: 'A',
  }

  const b: Val = {
    val: 'type',
    type: 'B',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify same types', () => {
    expect(() => unify(1, a, a)).not.toThrow()
  })

  test('should not unify if type name differs', () => {
    expect(() => unify(1, a, b)).toThrow()
  })
})

