import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"

describe('onWrapPi pition', () => {
  // Before action
  const before: Term = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: Term = {
    term: 'pi',
    param: [
      {
        term: 'any',
      }
    ],
    paramID: ['1145'],
    body: before,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should make term wrapped with pi with default param', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'wrapPi',
      name: '1145',
      envLen: 0,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'wrapPi',
      name: '1145',
      envLen: 0,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

