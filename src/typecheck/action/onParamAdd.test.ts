import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { TFunc } from "../model/term"

describe('onParamAdd function', () => {
  // Context: [T: U, a = 1]
  // (T: U) => (x: T) => x
  const before: TFunc = {
    // T: U
    term: 'func',
    paramID: ['T'],
    param: [
      {
        term: 'uni',
      }
    ],
    body: {
      // x: T
      term: 'func',
      paramID: ['x'],
      param: [
        {
          term: 'var',
          id: 'T',
          ix: 0,
        }
      ],
      body: {
        // x
        term: 'var',
        id: 'x',
        ix: 0,
      }
    }
  }

  // After adding param
  const expected: TFunc = {
    // T: U
    term: 'func',
    paramID: ['A', 'T'],
    param: [
      {
        term: 'any',
      },
      {
        term: 'uni',
      }
    ],
    body: {
      // x: T
      term: 'func',
      paramID: ['x'],
      param: [
        {
          term: 'var',
          id: 'T',
          ix: 1,
        }
      ],
      body: {
        // x
        term: 'var',
        id: 'x',
        ix: 0,
      }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should insert param properly', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'addParam',
      ix: 0,
      id: 'A',
      envLen: 2,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction({
      action: 'addParam',
      ix: 0,
      id: 'A',
      envLen: 2,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

