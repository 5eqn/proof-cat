import cloneDeep from 'lodash.clonedeep'
import { InferRequest } from "../model/infer"
import { TFunc, TNum, TType, TVar } from "../model/term"
import { VPi, VType } from "../model/value"
import { inferFunc } from "./func"

describe('inferFunc function', () => {
  // Most recent var term
  const mockTVar: TVar = {
    term: 'var',
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

  // Bad pi term
  const mockTFuncBad: TFunc = {
    term: 'func',
    param: [mockTNum],
    paramID: ['a'],
    body: mockTVar,
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

  // Infer request
  const mockReq: InferRequest<TFunc> = {
    env: [],
    ctx: [],
    ns: [],
    tm: mockTFunc,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of function should be inferred correctly', () => {
    const { type: val } = inferFunc(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('non-type param should not typecheck', () => {
    const req = cloneDeep(mockReq)
    req.tm = mockTFuncBad
    expect(() => inferFunc(req)).toThrow()
  })
})

