import cloneDeep from 'lodash.clonedeep'
import { identityLens } from '../model/action'
import { InferRequest } from "../model/infer"
import { TFunc, TType, TUni, TVar } from "../model/term"
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

  // Infer request
  const mockReq: InferRequest<TFunc> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTFunc,
    lens: identityLens,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('change in param should be reflected', () => {
    const req = cloneDeep(mockReq)
    const { debug } = inferFunc(req)
    expect(debug.getParam[1](req.term)).toStrictEqual(req.term.param[1])
  })
})

