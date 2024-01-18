import cloneDeep from 'lodash.clonedeep'
import { TNum, TVar } from "../model/term"
import { onBecomeVar } from './onBecomeVar'

describe('onBecomeVar function', () => {
  // Before action
  const before: TNum = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: TVar = {
    term: 'var',
    id: 'first',
    ix: 0,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term a variable', () => {
    const term = cloneDeep(before)
    onBecomeVar('first', 0, term)
    expect(term).toStrictEqual(expected)
  })
})

