import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"
import { onWrapApp } from './onWrapApp'

describe('onWrapApp function', () => {
  // f = \x. x
  const before: Term = {
    term: 'func',
    param: {
      term: 'type',
      type: 'A',
    },
    paramID: 'x',
    body: {
      term: 'var',
      ix: 0,
    }
  }

  // f(*)
  const expected: Term = {
    term: 'app',
    func: before,
    arg: {
      term: 'any',
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should apply any to function', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'wrapApp',
      envLen: 0,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction({
      action: 'wrapApp',
      envLen: 0,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

