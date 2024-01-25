import { InferRequest } from "../model/infer"
import { TVar } from "../model/term"
import { Val, VType, VVar } from "../model/value"
import { inferVar } from "./var"

describe('inferVar function', () => {
  // Most recent var
  const mockTVar: TVar = {
    term: 'var',
    ix: 0,
  }

  // Variable in environment
  const mockVVar: VVar = {
    val: 'var',
    lvl: 0,
  }

  // Type of variable in context
  const mockVType: VType = {
    val: 'type',
    type: 'WODESHOUJIZAIZIDONGXIAZAI,YUANMENGZHIXING'
  }

  // Expected result
  const expected: Val = {
    val: 'type',
    type: 'WODESHOUJIZAIZIDONGXIAZAI,YUANMENGZHIXING'
  }

  // Infer request
  const mockReq: InferRequest<TVar> = {
    env: [mockVVar],
    ctx: [mockVType],
    ns: ['x'],
    tm: mockTVar,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of var should be from context', () => {
    const { type: val } = inferVar(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

