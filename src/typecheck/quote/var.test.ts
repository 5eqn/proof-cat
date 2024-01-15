import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { quoteVar } from "./var"

describe('quoteVar function', () => {
  // Term of variable `x`
  const mockTVar: Term = {
    term: 'var',
    id: 'I_AM_OUTSIDE',
    ix: 1,
  }

  // Value of variable `x` in env
  const mockVVarEnv: Val = {
    val: 'var',
    id: 'I_AM_IN_ENVIRONMENT',
    lvl: 0,
  }

  // Value of variable `x` to quote
  const mockVVar: Val = {
    val: 'var',
    id: 'I_AM_OUTSIDE',
    lvl: 0,
  }

  // Another variable
  const mockVNum: Val = {
    val: 'num',
    num: 114,
  }

  // Variable `I_AM_IN_ENVIRONMENT` is in the outermost scope
  const mockEnv: Env = [mockVNum, mockVVarEnv]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get variable from env', () => {
    const val = quoteVar(mockEnv.length, mockVVar)
    expect(val).toStrictEqual(mockTVar)
  })
})
