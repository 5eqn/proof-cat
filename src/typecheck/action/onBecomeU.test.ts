import cloneDeep from 'lodash.clonedeep'
import { TNum, TUni } from "../model/term"
import { onBecomeU } from './onBecomeU'

describe('onBecomeU function', () => {
  // Before action
  const before: TNum = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: TUni = {
    term: 'uni',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term a type', () => {
    const term = cloneDeep(before)
    onBecomeU(term)
    expect(term).toStrictEqual(expected)
  })
})

