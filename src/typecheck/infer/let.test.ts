import cloneDeep from 'lodash.clonedeep'
import { infer } from '.'
import { onOverride } from '../action/onOverride'
import { evaluate } from '../evaluate'
import { InferRequest } from "../model/infer"
import { TAny, TApp, Term, TFunc, TLet, TNum, TPi, TType, TVar } from "../model/term"
import { inferLet } from "./let"

describe('inferLet function', () => {
  // number
  const typeNum: TType = {
    term: 'type',
    type: 'number',
  }

  // A
  const typeA: TType = {
    term: 'type',
    type: 'A',
  }

  // number -> A
  const typeFunc: TPi = {
    term: 'pi',
    param: [typeNum],
    paramID: ['n'],
    body: typeA
  }

  // f
  const varF: TVar = {
    term: 'var',
    id: 'f',
    ix: 0,
  }

  // f(n = x)
  const app: TApp = {
    term: 'app',
    argID: ['n'],
    arg: [
      {
        term: 'var',
        id: 'x',
        ix: 1,
      }
    ],
    func: varF,
  }

  // (f: (n: number) -> A) => f(n = x)
  const func: TFunc = {
    term: 'func',
    param: [typeFunc],
    paramID: ['f'],
    body: app,
  }

  // 1
  const one: TNum = {
    term: 'num',
    num: 1,
  }

  // let x = 1 in (f: (n: number) -> A) => f(n = x)
  const term: TLet = {
    term: 'let',
    id: 'x',
    body: one,
    next: func,
  }

  // (f: (n: number) -> A) -> A
  const largePi: TPi = {
    term: 'pi',
    param: [typeFunc],
    paramID: ['f'],
    body: typeA,
  }

  // Expected result: (f: (n: number) -> A) -> A
  const expected = evaluate([evaluate([], one)], largePi)

  // let x = 1 in A
  const unrefTerm: TLet = {
    term: 'let',
    id: 'x',
    body: one,
    next: typeA,
  }

  // any
  const anyTerm: TAny = {
    term: 'any',
  }

  // let x = any in A
  const unrefDeleteBody: TLet = {
    term: 'let',
    id: 'x',
    body: anyTerm,
    next: typeA,
  }

  // let x = 1 in any
  const unrefDeleteNext: TLet = {
    term: 'let',
    id: 'x',
    body: one,
    next: anyTerm,
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TLet> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: term,
    onChange: onChange,
  }

  // Unref infer request
  const mockReqUnref: InferRequest<TLet> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: unrefTerm,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of dependent let should be calculated correctly', () => {
    const { val } = infer(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('change in body should be reflected', () => {
    const req = cloneDeep(mockReqUnref)
    const { debug } = inferLet(req)
    debug.onBodyChange((term: Term) => onOverride(term, anyTerm))
    expect(req.term).toStrictEqual(unrefDeleteBody)
  })

  test('change in next should be reflected', () => {
    const req = cloneDeep(mockReqUnref)
    const { debug } = inferLet(req)
    debug.onNextChange((term: Term) => onOverride(term, anyTerm))
    expect(req.term).toStrictEqual(unrefDeleteNext)
  })
})

