import { identityLens } from "../model/action"
import { InferRequest } from "../model/infer"
import { TType } from "../model/term"
import { Val } from "../model/value"
import { inferType } from "./type"

describe('inferType function', () => {
  // A type with long name
  const mockTType: TType = {
    term: 'type',
    type: 'Type with spaces and $pecia/ charac+ers'
  }

  // Expected result
  const expected: Val = {
    val: 'uni',
  }

  // Infer request
  const mockReq: InferRequest<TType> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTType,
    lens: identityLens,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of type should be universe', () => {
    const { val } = inferType(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

