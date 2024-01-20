import { infer } from "."
import { identityLens } from "../model/action"
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
    depth: 0,
    term: mockTAny,
    lens: identityLens,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of any should be any', () => {
    const { val } = infer(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

