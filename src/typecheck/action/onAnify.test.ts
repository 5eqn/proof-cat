import { fireEvent, render, screen } from '@testing-library/react'
import { message } from 'antd'
import cloneDeep from 'lodash.clonedeep'
import { i18n } from '../../i18n'
import { infer } from '../infer'
import { InferRequest } from "../model/infer"
import { TAny, Term, TNum } from "../model/term"
import { onAnify } from './onAnify'

jest.mock('antd')
const mockError = jest.mocked(message.error)

describe('onAnify function', () => {
  // Before action
  const before: TNum = {
    term: 'num',
    num: 114,
  }

  // After action
  const expected: TAny = {
    term: 'any',
  }

  // Infer request
  const onChange = jest.fn()
  const mockReq: InferRequest<Term> = {
    env: [],
    ctx: [],
    ns: [],
    depth: 0,
    term: before,
    onChange: onChange,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('action should work alone', () => {
    const term = cloneDeep(before)
    onAnify(term)
    expect(term).toStrictEqual(expected)
  })

  test('action should work in UI', () => {
    const { element } = infer(mockReq)
    render(element)
    const button = screen.getByTestId(`delete-${i18n.term.num}-0`)
    fireEvent.click(button)
    expect(mockError).toBeCalledTimes(0)
    const updater = onChange.mock.lastCall[0]
    const term = cloneDeep(before)
    updater(term)
    expect(term).toStrictEqual(expected)
  })
})

