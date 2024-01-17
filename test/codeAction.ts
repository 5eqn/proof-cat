import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import { i18n } from '../src/i18n'
import { InferRequest } from "../src/typecheck/model/infer"
import { TAny, TFunc, TType, TVar } from "../src/typecheck/model/term"
import { inferFunc } from "../src/typecheck/infer/func"
import cloneDeep from 'lodash.clonedeep'

jest.mock('antd')
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

  // Any term
  const mockTAny: TAny = {
    term: 'any',
  }

  // Expected term after update
  const expectedUpdate: TFunc = {
    term: 'func',
    param: [mockTType],
    paramID: ['a'],
    body: mockTAny,
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

  test('delete function body should work', () => {
    const { element } = inferFunc(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.var}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledTimes(0)
    const updater = onChange.mock.lastCall[0]
    const term = cloneDeep(mockTFunc)
    updater(term)
    expect(term).toStrictEqual(expectedUpdate)
  })
})

