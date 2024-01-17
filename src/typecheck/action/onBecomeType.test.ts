import cloneDeep from 'lodash.clonedeep'
import { TNum, TType } from "../model/term"
import { becomeTypeOf } from './onBecomeType'

describe('onBecomeType function', () => {
  // Before action
  const before: TNum = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: TType = {
    term: 'type',
    type: '456$^',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term a type', () => {
    const term = cloneDeep(before)
    becomeTypeOf('456$^')(term)
    expect(term).toStrictEqual(expected)
  })
})

