import cloneDeep from 'lodash.clonedeep'
import { InferRequest } from "../model/infer"
import { TNum, TPi, TType, TVar } from "../model/term"
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

  // Number
  const mockTNum: TNum = {
    term: 'num',
    num: 51121,
  }

  // Pi term
  const mockTPi: TPi = {
    term: 'pi',
    param: [mockTType],
    paramID: ['a'],
    body: mockTVar,
  }

  // Bad pi term
  const mockTPiBad: TPi = {
    term: 'pi',
    param: [mockTNum],
    paramID: ['a'],
    body: mockTVar,
  }

  // Expected type
  const expected: VUni = {
    val: 'uni',
  }

  // Infer request
  const mockReq: InferRequest<TPi> = {
    env: [],
    ctx: [],
    ns: [],
    tm: mockTPi,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of pi should be inferred correctly', () => {
    const { type: val } = inferPi(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('non-type param should not typecheck', () => {
    const req = cloneDeep(mockReq)
    req.tm = mockTPiBad
    expect(() => inferPi(req)).toThrow()
  })
})
