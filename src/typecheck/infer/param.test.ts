import { onOverride } from '../action/onOverride'
import { InferRequest } from "../model/infer"
import { TAny, Term, TFunc, TType, TUni, TVar } from "../model/term"
import { inferFunc } from "./func"

describe('inferParam function', () => {
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

  // Uni term
  const mockTUni: TUni = {
    term: 'uni',
  }

  // Function term
  const mockTFunc: TFunc = {
    term: 'func',
    param: [mockTType, mockTUni],
    paramID: ['a', 'T'],
    body: mockTVar,
  }

  // Any term
  const mockTAny: TAny = {
    term: 'any',
  }

  // Expected term after deletion
  const expectedDeleteParam: TFunc = {
    term: 'func',
    param: [mockTType, mockTAny],
    paramID: ['a', 'T'],
    body: mockTVar,
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TFunc> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTFunc,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('change in param should be reflected', () => {
    const { debug } = inferFunc(mockReq)
    debug.onArgChange[1]((term: Term) => onOverride(term, mockTAny))
    expect(mockTFunc).toStrictEqual(expectedDeleteParam)
  })
})

