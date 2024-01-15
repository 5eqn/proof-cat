import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { evaluateVar } from "./var"

describe('evaluateVar function', () => {
  // Term of variable `x`
  const mockTVar: Term = {
    term: 'var',
    id: 'I_AM_IN_TERM',
    ix: 1,
  }

  // Value of variable `x`
  const mockVVar: Val = {
    val: 'var',
    id: 'I_AM_IN_ENVIRONMENT',
    lvl: 0,
  }

  // Another variable
  const mockVNum: Val = {
    val: 'num',
    num: 114,
  }

  // Variable `I_AM_IN_ENVIRONMENT` is in the outermost scope
  const mockEnv: Env = [mockVNum, mockVVar]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get variable from env', () => {
    const val = evaluateVar(mockEnv, mockTVar)
    expect(val).toStrictEqual(mockVVar)
  })
})
