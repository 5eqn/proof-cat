import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import cloneDeep from 'lodash.clonedeep'
import { infer } from '.'
import { i18n } from '../../i18n'
import { evaluate } from '../evaluate'
import { InferRequest } from "../model/infer"
import { TAny, TApp, TFunc, TLet, TNum, TPi, TType, TVar } from "../model/term"
import { inferLet } from "./let"

jest.mock('antd', () => {
  const originalModule = jest.requireActual('antd')
  return {
    __esModule: true,
    ...originalModule,
    message: {
      error: jest.fn(),
    }
  }
})
const mockError = jest.mocked(message.error)

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

  test('change in referenced body should be forbidden', () => {
    const { element } = inferLet(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.num}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledWith(i18n.err.referred)
    expect(onChange).toBeCalledTimes(0)
  })

  test('change in unreferenced body should be reflected', () => {
    const { element } = inferLet(mockReqUnref)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.num}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledTimes(0)
    expect(onChange).toBeCalledTimes(1)
    const updater = onChange.mock.lastCall[0]
    const term = cloneDeep(unrefTerm)
    updater(term)
    expect(term).toStrictEqual(unrefDeleteBody)
  })

  test('change in next should be reflected', () => {
    const { element } = inferLet(mockReqUnref)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.type}-0`)
    fireEvent.click(button)
    expect(mockError).toBeCalledTimes(0)
    expect(onChange).toBeCalledTimes(1)
    const updater = onChange.mock.lastCall[0]
    const term = cloneDeep(unrefTerm)
    updater(term)
    expect(term).toStrictEqual(unrefDeleteNext)
  })
})

