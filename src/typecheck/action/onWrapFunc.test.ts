import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"

describe('onWrapFunc function', () => {
  // Before action
  const before: Term = {
    term: 'num',
    num: 1145,
  }

  // After action
  const expected: Term = {
    term: 'func',
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

  test('should make term wrapped with function with default param', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'wrapFunc',
      name: '1145',
      envLen: 0,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction<Term>({
      action: 'wrapFunc',
      name: '1145',
      envLen: 0,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

