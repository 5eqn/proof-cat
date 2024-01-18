import { onOverride } from '../action/onOverride'
import { InferRequest } from "../model/infer"
import { TAny, TApp, Term, TNum, TType, TVar } from "../model/term"
import { inferApp } from "./app"

describe('inferArg apption', () => {
  // Most recent var term
  const mockTVar: TVar = {
    term: 'var',
    id: 'f',
    ix: 0,
  }

  // Type A term
  const mockTType: TType = {
    term: 'type',
    type: 'A',
  }

  // Num term
  const mockTNum: TNum = {
    term: 'num',
    num: 113,
  }

  // Application term
  const mockTApp: TApp = {
    term: 'app',
    arg: [mockTNum, mockTType],
    argID: ['a', 'T'],
    func: mockTVar,
  }

  // Any term
  const mockTAny: TAny = {
    term: 'any',
  }

  // Expected term after deletion
  const expectedDeleteArg: TApp = {
    term: 'app',
    arg: [mockTNum, mockTAny],
    argID: ['a', 'T'],
    func: mockTVar,
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TApp> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTApp,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('change in arg should be reflected', () => {
    const { debug } = inferApp(mockReq)
    debug.onArgChange[1]((term: Term) => onOverride(term, mockTAny))
    expect(mockTApp).toStrictEqual(expectedDeleteArg)
  })
})

