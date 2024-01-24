import { infer } from "."
import { InferRequest } from "../model/infer"
import { TAny } from "../model/term"
import { Val } from "../model/value"

describe('inferAny function', () => {
  // A any with long name
  const mockTAny: TAny = {
    term: 'any',
  }

  // Expected result
  const expected: Val = {
    val: 'any',
  }

  // Infer request
  const mockReq: InferRequest<TAny> = {
    env: [],
    ctx: [],
    ns: [],
    tm: mockTAny,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of any should be any', () => {
    const { type: val } = infer(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

