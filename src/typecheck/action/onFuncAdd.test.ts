import cloneDeep from 'lodash.clonedeep'
import { TFunc } from "../model/term"
import { onFuncAdd } from './onFuncAdd'

describe('onFuncAdd function', () => {
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

  test('should insert param at index 0', () => {
    const term = cloneDeep(before)
    onFuncAdd('A')(term)
    expect(term).toStrictEqual(expected)
  })
})

