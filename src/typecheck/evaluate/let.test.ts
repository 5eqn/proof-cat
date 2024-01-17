import { evaluate } from "."
import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"

describe('evaluateLet function', () => {
  // Empty environment
  const mockEnv: Env = []

  // 114
  const mockTNum: Term = {
    term: 'num',
    num: 114,
  }

  // nearest var x
  const mockTVar: Term = {
    term: 'var',
    id: 'x',
    ix: 0,
  }

  // let x = 114; x
  const mockTLet: Term = {
    term: 'let',
    id: 'x',
    body: mockTNum,
    next: mockTVar,
  }

  // Expected result
  const mockVLet: Val = {
    val: 'num',
    num: 114,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should evaluate body and apply to next', () => {
    const val = evaluate(mockEnv, mockTLet)
    expect(val).toStrictEqual(mockVLet)
  })
})

