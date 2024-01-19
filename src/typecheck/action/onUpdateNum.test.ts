import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"

describe('onUpdateNum function', () => {
  // Before action
  const before: Term = {
    term: 'num',
    num: 114,
  }

  // After action
  const expected: Term = {
    term: 'num',
    num: 514,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should change num correctly', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'updateNum',
      oldNum: 114,
      newNum: 514,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'updateNum',
      oldNum: 114,
      newNum: 514,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

