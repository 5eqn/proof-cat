import { Val } from "../model/value"
import { unify } from "."

describe('unify function', () => {
  const a: Val = {
    val: 'any',
  }

  const f: Val = {
    val: 'num',
    num: 114514,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify any with anything', () => {
    expect(() => unify(1, a, f)).not.toThrow()
  })

  test('should unify any with any', () => {
    expect(() => unify(1, a, a)).not.toThrow()
  })
})

