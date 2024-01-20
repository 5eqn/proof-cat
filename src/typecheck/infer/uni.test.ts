import { identityLens } from "../model/action"
import { InferRequest } from "../model/infer"
import { TUni } from "../model/term"
import { Val } from "../model/value"
import { inferUni } from "./uni"

describe('inferUni function', () => {
  // A uni with long name
  const mockTUni: TUni = {
    term: 'uni',
  }

  // Expected result
  const expected: Val = {
    val: 'uni',
  }

  // Infer request
  const mockReq: InferRequest<TUni> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTUni,
    lens: identityLens,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of uni should be universe', () => {
    const { val } = inferUni(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

