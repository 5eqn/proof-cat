import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import { i18n } from '../../i18n'
import { InferRequest } from "../model/infer"
import { TApp, TVar } from "../model/term"
import { VVar, VPi, VUni } from "../model/value"
import { inferApp } from "./app"

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

describe('inferApp function', () => {
  // Most recent var
  const mockTVarX: TVar = {
    term: 'var',
    id: 'x',
    ix: 0,
  }

  // Variable in environment
  const mockVVarX: VVar = {
    val: 'var',
    id: 'x',
    lvl: 1,
  }

  // Variable type in context
  const mockVUni: VUni = {
    val: 'uni',
  }

  // Function var term
  const mockTVarF: TVar = {
    term: 'var',
    id: 'f',
    ix: 1,
  }

  // Function var value
  const mockVVarF: VVar = {
    val: 'var',
    id: 'f',
    lvl: 0,
  }

  // Argument type
  const mockVType: VUni = {
    val: 'uni',
  }

  // Reference to the nearest variable with name T
  const mockVVarT: TVar = {
    term: 'var',
    id: 'T',
    ix: 0,
  }

  // Function type in context
  const mockVPi: VPi = {
    val: 'pi',
    param: [mockVType],
    paramID: ['T'],
    func: {
      // Pi has no env because its instance `f` is defined first
      env: [],
      body: mockVVarT,
    }
  }

  // f(T = x)
  const mockTApp: TApp = {
    term: 'app',
    argID: ['T'],
    argIX: [mockTVarX.ix],
    func: mockTVarF,
  }

  // Expected result
  const expected: VVar = mockVVarX

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TApp> = {
    env: [mockVVarX, mockVVarF],
    ctx: [mockVUni, mockVPi],
    ns: ['x', 'f'],
    depth: 0,
    term: mockTApp,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of dependent app should be calculated correctly', () => {
    const { val } = inferApp(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('change in function should be forbidden', () => {
    const { element } = inferApp(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.var}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledWith(i18n.err.changeApply)
    expect(onChange).toBeCalledTimes(0)
  })
})

