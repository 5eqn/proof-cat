import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import cloneDeep from 'lodash.clonedeep'
import { i18n } from '../../i18n'
import { InferRequest } from "../model/infer"
import { TAny, TFunc, TType, TVar } from "../model/term"
import { VPi, VType } from "../model/value"
import { inferFunc } from "./func"

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
    const { element } = inferFunc(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.var}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledTimes(0)
    expect(onChange).toBeCalledTimes(1)
    const updater = onChange.mock.lastCall[0]
    const term = cloneDeep(mockTFunc)
    updater(term)
    expect(term).toStrictEqual(expectedDeleteBody)
  })
})

