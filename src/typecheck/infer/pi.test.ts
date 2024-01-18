import { onOverride } from '../action/onOverride'
import { InferRequest } from "../model/infer"
import { TAny, Term, TPi, TType, TVar } from "../model/term"
import { VUni } from "../model/value"
import { inferPi } from "./pi"

describe('inferPi function', () => {
  // Most recent var term
  const mockTVar: TVar = {
    term: 'var',
    id: 'x',
    ix: 0,
  }

  // Type A term
  const mockTType: TType = {
    term: 'type',
    type: 'A',
  }

  // Pition term
  const mockTPi: TPi = {
    term: 'pi',
    param: [mockTType],
    paramID: ['a'],
    body: mockTVar,
  }

  // Expected type
  const expected: VUni = {
    val: 'uni',
  }

  // any
  const anyTerm: TAny = {
    term: 'any',
  }

  // Expected term after deleting body
  const expectedDeleteBody: TPi = {
    term: 'pi',
    param: [mockTType],
    paramID: ['a'],
    body: anyTerm,
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TPi> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTPi,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of pi should be inferred correctly', () => {
    const { val } = inferPi(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('change in body should be reflected', () => {
    const { debug } = inferPi(mockReq)
    debug.onBodyChange((draft: Term) => onOverride(draft, anyTerm))
    expect(mockTPi).toStrictEqual(expectedDeleteBody)
  })
})
