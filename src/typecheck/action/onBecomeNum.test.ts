import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { TAny, Term, TNum } from "../model/term"

describe('onBecomeNum function', () => {
  // Before action
  const before: TAny = {
    term: 'any',
  }

  // After action
  const expected: TNum = {
    term: 'num',
    num: 456,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term a number', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'becomeNum',
      num: 456,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'becomeNum',
      num: 456,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

