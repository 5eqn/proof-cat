import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import { i18n } from '../../i18n'
import { InferRequest } from "../model/infer"
import { TAny, TFunc, TType, TUni, TVar } from "../model/term"
import { inferFunc } from "./func"

jest.mock('antd')
const mockError = jest.mocked(message.error)

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

  // Expected term after update
  const expectedUpdate: TFunc = {
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

  test('change in unreferenced param should be reflected', () => {
    const { element } = inferFunc(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.uni}-1`)
    fireEvent.click(button)
    const updater = onChange.mock.lastCall[0]
    let term = mockTFunc
    updater(term)
    expect(term).toStrictEqual(expectedUpdate)
  })


  test('change in referenced param should be forbidden', () => {
    const { element } = inferFunc(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.type}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledWith(i18n.err.referred)
    expect(onChange).toBeCalledTimes(0)
  })
})

