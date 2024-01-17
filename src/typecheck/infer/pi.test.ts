import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import { i18n } from '../../i18n'
import { InferRequest } from "../model/infer"
import { TAny, TPi, TType, TVar } from "../model/term"
import { VUni } from "../model/value"
import { inferPi } from "./pi"

jest.mock('antd')
const mockError = jest.mocked(message.error)

describe('inferPi function', () => {
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

  // Pition term
  const mockTPi: TPi = {
    term: 'pi',
    param: [mockTType],
    paramID: ['a'],
    body: mockTVar,
  }

  // Expected type
  const expected: VUni = {
    val: 'uni',
  }

  // Any term
  const mockTAny: TAny = {
    term: 'any',
  }

  // Expected term after update
  const expectedUpdate: TPi = {
    term: 'pi',
    param: [mockTType],
    paramID: ['a'],
    body: mockTAny,
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<TPi> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: mockTPi,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('type of pi should be inferred correctly', () => {
    const { val } = inferPi(mockReq)
    expect(val).toStrictEqual(expected)
  })

  test('change in body should be reflected', () => {
    const { element } = inferPi(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.var}-1`)
    fireEvent.click(button)
    expect(mockError).toBeCalledTimes(0)
    const updater = onChange.mock.lastCall[0]
    let term = mockTPi
    updater(term)
    expect(term).toStrictEqual(expectedUpdate)
  })
})
