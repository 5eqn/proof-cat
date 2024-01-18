import cloneDeep from 'lodash.clonedeep'
import { TFunc } from "../model/term"
import { onFuncDelete } from './onFuncDelete'

describe('onFuncDelete function', () => {
  // Context: []
  // (A: U, T: U) => (x: T) => x
  const before: TFunc = {
    // T: U
    term: 'func',
    paramID: ['A', 'T'],
    param: [
      {
        term: 'uni',
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

  // After adding param
  const expected: TFunc = {
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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deleting unused param should be OK', () => {
    const term = cloneDeep(before)
    onFuncDelete(0, 0, term)
    expect(term).toStrictEqual(expected)
  })

  test('deleting used param should be forbidden', () => {
    const term = cloneDeep(before)
    onFuncDelete(1, 0, term)
    expect(term).toStrictEqual(before)
  })
})

