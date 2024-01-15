import { InferRequest } from "../model/infer"
import { TVar } from "../model/term"
import { Val, VType, VVar } from "../model/value"
import { inferVar } from "./var"

describe('inferVar function', () => {
  // Most recent var
  const mockTVar: TVar = {
    term: 'var',
    id: 'x',
    ix: 0,
  }

  // Variable in environment
  const mockVVar: VVar = {
    val: 'var',
    id: 'x',
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
    depth: 0,
    term: mockTVar,
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of var should be from context', () => {
    const { val } = inferVar(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

