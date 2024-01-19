import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { TAny, Term, TUni } from "../model/term"

describe('onBecomeU function', () => {
  // Before action
  const before: TAny = {
    term: 'any',
  }

  // After action
  const expected: TUni = {
    term: 'uni',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term a universe', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'becomeU',
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'becomeU',
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

