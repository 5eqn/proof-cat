import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"
import { onVarUpdate } from './onVarUpdate'

describe('onVarUpdate function', () => {
  // Before action
  const before: Term = {
    term: 'var',
    id: 'before',
    ix: 0,
  }

  // After action
  const expected: Term = {
    term: 'var',
    id: 'after',
    ix: 1,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change var correctly', () => {
    const term = cloneDeep(before)
    onVarUpdate('after', 1, term)
    expect(term).toStrictEqual(expected)
  })

  test('should change var correctly', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'updateVar',
      oldID: 'before',
      oldIX: 0,
      newID: 'after',
      newIX: 1,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'updateVar',
      oldID: 'before',
      oldIX: 0,
      newID: 'after',
      newIX: 1,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

