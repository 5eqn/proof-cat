import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"

describe('onUpdateType function', () => {
  // Before action
  const before: Term = {
    term: 'type',
    type: '114',
  }

  // After action
  const expected: Term = {
    term: 'type',
    type: '514',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change type correctly', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'updateType',
      oldType: '114',
      newType: '514',
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'updateType',
      oldType: '114',
      newType: '514',
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

