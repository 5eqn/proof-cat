import { identityLens } from "../model/action"
import { InferRequest } from "../model/infer"
import { TNum } from "../model/term"
import { Val } from "../model/value"
import { inferNum } from "./num"

describe('inferNum function', () => {
  // A num with good value
  const mockTNum: TNum = {
    term: 'num',
    num: 114,
  }

  // Expected result
  const expected: Val = {
    val: 'type',
    type: 'number',
  }

  // Infer request
  const mockReq: InferRequest<TNum> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTNum,
    lens: identityLens,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of num should be number', () => {
    const { val } = inferNum(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

