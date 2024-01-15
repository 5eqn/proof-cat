import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { quotePi } from "./pi"

describe('quotePi function', () => {
  // Empty environment
  const mockEnv: Env = []

  // (A: U) -> A
  const mockTPi: Term = {
    term: 'pi',
    param: [
      {
        term: 'uni',
      }
    ],
    paramID: ['A'],
    body: {
      term: 'var',
      id: 'A',
      ix: 0,
    }
  }

  // Expected result
  const mockVPi: Val = {
    val: 'pi',
    param: [
      {
        val: 'uni',
      }
    ],
    paramID: ['A'],
    func: {
      env: mockEnv,
      body: mockTPi.body,
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should quote params', () => {
    const val = quotePi(mockEnv.length, mockVPi)
    expect(val).toStrictEqual(mockTPi)
  })
})

