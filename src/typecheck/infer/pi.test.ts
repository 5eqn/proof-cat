import cloneDeep from 'lodash.clonedeep'
import { runAction } from '../action'
import { mkAction } from '../model/action'
import { InferRequest } from "../model/infer"
import { TAny, TNum, TPi, TType, TVar } from "../model/term"
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

  test('non-type param should not typecheck', () => {
    const req = cloneDeep(mockReq)
    req.term = mockTPiBad
    expect(() => inferPi(req)).toThrow()
  })

  test('change in body should be reflected', () => {
    const req = cloneDeep(mockReq)
    const { debug } = inferPi(req)
    debug.onBodyChange(mkAction({
      action: 'remove',
    } as any))
    expect(onChange).toBeCalledTimes(1)
    const action = onChange.mock.lastCall[0]
    runAction(action, req.term)
    expect(req.term).toStrictEqual(expectedDeleteBody)
  })
})
