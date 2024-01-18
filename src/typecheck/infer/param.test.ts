import cloneDeep from 'lodash.clonedeep'
import { runAction } from '../action'
import { mkAction } from '../model/action'
import { InferRequest } from "../model/infer"
import { TAny, TFunc, TType, TUni, TVar } from "../model/term"
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
    const req = cloneDeep(mockReq)
    const { debug } = inferFunc(req)
    debug.onParamChange[1](mkAction({
      action: 'remove',
    } as any))
    expect(onChange).toBeCalledTimes(1)
    const action = onChange.mock.lastCall[0]
    runAction(action, req.term)
    expect(req.term).toStrictEqual(expectedDeleteParam)
  })
})

