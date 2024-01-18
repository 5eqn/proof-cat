import cloneDeep from 'lodash.clonedeep'
import { runAction } from '../action'
import { onOverride } from '../action/onOverride'
import { mkAction } from '../model/action'
import { InferRequest } from "../model/infer"
import { TAny, Term, TFunc, TType, TVar } from "../model/term"
import { VPi, VType } from "../model/value"
import { inferFunc } from "./func"

describe('inferFunc function', () => {
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

  // Function term
  const mockTFunc: TFunc = {
    term: 'func',
    param: [mockTType],
    paramID: ['a'],
    body: mockTVar,
  }

  // Type A value
  const mockVType: VType = {
    val: 'type',
    type: 'A',
  }

  // Expected type
  const expected: VPi = {
    val: 'pi',
    param: [mockVType],
    paramID: ['a'],
    func: {
      env: [],
      body: mockTType,
    }
  }

  // any
  const anyTerm: TAny = {
    term: 'any',
  }

  // Expected term after deleting body
  const expectedDeleteBody: TFunc = {
    term: 'func',
    param: [mockTType],
    paramID: ['a'],
    body: anyTerm,
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

  test('type of function should be inferred correctly', () => {
    const { val } = inferFunc(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('change in body should be reflected', () => {
    const req = cloneDeep(mockReq)
    const { debug } = inferFunc(req)
    debug.onBodyChange(mkAction({
      action: 'remove',
      len: 1,
      backup: { ...req.term.body },
    }))
    expect(onChange).toBeCalledTimes(1)
    const action = onChange.mock.lastCall[0]
    runAction(action, req.term)
    expect(mockTFunc).toStrictEqual(expectedDeleteBody)
  })
})

