import cloneDeep from 'lodash.clonedeep'
import { TNum, TType } from "../model/term"
import { onBecomeNum } from './onBecomeNum'

describe('onBecomeNum function', () => {
  // Before action
  const before: TType = {
    term: 'type',
    type: '1145',
  }

  // After action
  const expected: TNum = {
    term: 'num',
    num: 456,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term a num', () => {
    const term = cloneDeep(before)
    onBecomeNum(456)(term)
    expect(term).toStrictEqual(expected)
  })
})

