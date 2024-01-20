import { message } from 'antd'
import { onUpdate } from '.'
import { runAction } from '../action'
import { infer } from '../infer'
import { revertAction } from '../model/action'
import { ErrorASTMismatch } from '../model/error'

jest.mock('antd')
jest.mock('../action')
jest.mock('../model/action')
jest.mock('../infer')
const mockError = jest.mocked(message.error)
const mockRunAction = jest.mocked(runAction)
const mockRevertAction = jest.mocked(revertAction)
const mockInfer = jest.mocked(infer)

describe('onUpdate function', () => {
  const mockSetState = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('error in runAction should be caught', () => {
    mockRunAction.mockImplementationOnce(() => {
      throw new ErrorASTMismatch()
    })
    mockSetState.mockImplementationOnce((updater: any) => updater('term'))
    expect(onUpdate('action' as any, mockSetState)).toBe(false)
    expect(mockRevertAction).toBeCalledTimes(0)
    expect(mockError).toBeCalledTimes(1)
  })

  test('error in inferAction should trigger revert', () => {
    mockInfer.mockImplementationOnce(() => {
      throw new ErrorASTMismatch()
    })
    mockSetState.mockImplementationOnce((updater: any) => updater('term'))
    expect(onUpdate('action' as any, mockSetState)).toBe(false)
    expect(mockRevertAction).toBeCalledTimes(1)
    expect(mockError).toBeCalledTimes(1)
  })

  test('unknown error should be thrown', () => {
    mockInfer.mockImplementationOnce(() => {
      throw new Error()
    })
    mockSetState.mockImplementationOnce((updater: any) => updater('term'))
    expect(() => onUpdate('action' as any, mockSetState)).toThrow()
  })

  test('errorless run should return true', () => {
    mockSetState.mockImplementationOnce((updater: any) => updater('term'))
    expect(onUpdate('action' as any, mockSetState)).toBe(true)
    expect(mockRevertAction).toBeCalledTimes(0)
    expect(mockError).toBeCalledTimes(0)
  })
})

