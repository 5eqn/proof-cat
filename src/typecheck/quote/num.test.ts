import { Term } from "../model/term"
import { Val } from "../model/value"
import { quoteNum } from "./num"

describe('quoteNum function', () => {
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

  test('should quote body and apply to next', () => {
    const val = quoteNum(mockVNum)
    expect(val).toStrictEqual(mockTNum)
  })
})

