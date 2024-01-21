import { message } from 'antd'
import { onUpdate } from './index'
import { runAction } from '../typecheck/action'
import { infer } from '../typecheck/infer'
import { revertAction } from '../typecheck/model/action'
import { ErrorASTMismatch } from '../typecheck/model/error'

jest.mock('antd')
jest.mock('../typecheck/action')
jest.mock('../typecheck/model/action')
jest.mock('../typecheck/infer')
const mockError = jest.mocked(message.error)
const mockRunAction = jest.mocked(runAction)
const mockRevertAction = jest.mocked(revertAction)
const mockInfer = jest.mocked(infer)

describe('onUpdate function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('error in runAction should be caught', () => {
    mockRunAction.mockImplementationOnce(() => {
      throw new ErrorASTMismatch()
    })
    expect(onUpdate('action' as any)).toBe(false)
    expect(mockRevertAction).toBeCalledTimes(0)
    expect(mockError).toBeCalledTimes(1)
  })

  test('error in inferAction should trigger revert', () => {
    mockInfer.mockImplementationOnce(() => {
      throw new ErrorASTMismatch()
    })
    expect(onUpdate('action' as any)).toBe(false)
    expect(mockRevertAction).toBeCalledTimes(1)
    expect(mockError).toBeCalledTimes(1)
  })

  test('unknown error should be thrown', () => {
    mockInfer.mockImplementationOnce(() => {
      throw new Error()
    })
    expect(() => onUpdate('action' as any)).toThrow()
  })

  test('errorless run should return true', () => {
    expect(onUpdate('action' as any)).toBe(true)
    expect(mockRevertAction).toBeCalledTimes(0)
    expect(mockError).toBeCalledTimes(0)
  })
})

