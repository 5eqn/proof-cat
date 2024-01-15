import { Term } from "../model/term"
import { Val } from "../model/value"
import { evaluateNum } from "./num"

describe('evaluateNum function', () => {
  // 114
  const mockTNum: Term = {
    term: 'num',
    num: 114,
  }

  // Expected result
  const mockVNum: Val = {
    val: 'num',
    num: 114,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should evaluate body and apply to next', () => {
    const val = evaluateNum(mockTNum)
    expect(val).toStrictEqual(mockVNum)
  })
})

