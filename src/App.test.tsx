import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { useImmer } from 'use-immer'
import {TNum} from "./typecheck/model/term";

jest.mock('use-immer', () => ({
  useImmer: jest.fn(),
}))
const mockImmer = jest.mocked(useImmer)

describe('App component', () => {
  test('renders the term and value of a given state', () => {
    const mockState: TNum = { term: 'num', num: 114 }
    const mockSetState = jest.fn()
    mockImmer.mockReturnValue([mockState, mockSetState])
    render(<App />)
  })

  test('updates the term and value properly', () => {
    var mockState: TNum = { term: 'num', num: 114 }
    const mockSetState = jest.fn()
    mockImmer.mockReturnValue([mockState, mockSetState])
    render(<App />)
    const input = screen.getByTestId('input-114')
    fireEvent.change(input, {
      target: { value: '514' }
    })
    mockSetState.mock.lastCall[0](mockState)
    expect(mockState.num).toBe(514)
  })
})
