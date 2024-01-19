import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { TAny, Term, TVar } from "../model/term"

describe('onBecomeVar function', () => {
  // Before action
  const before: TAny = {
    term: 'any',
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
    runAction(mkAction({
      action: 'becomeVar',
      id: 'first',
      ix: 0,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'becomeVar',
      id: 'first',
      ix: 0,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

