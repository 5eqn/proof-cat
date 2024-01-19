import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { TAny, Term, TType } from "../model/term"

describe('onBecomeType function', () => {
  // Before action
  const before: TAny = {
    term: 'any',
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
    runAction(mkAction({
      action: 'becomeType',
      name: '456$^',
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'becomeType',
      name: '456$^',
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

