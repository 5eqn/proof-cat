import { infer } from '.'
import { evaluate } from '../evaluate'
import { InferRequest } from "../model/infer"
import { TApp, TFunc, TLet, TNum, TPi, TType, TVar } from "../model/term"

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

  // Infer request
  const mockReq: InferRequest<TLet> = {
    env: [],
    ctx: [],
    ns: [],
    tm: term,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of dependent let should be calculated correctly', () => {
    const { type: val } = infer(mockReq)
    expect(val).toStrictEqual(expected)
  })
})

