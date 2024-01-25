import cloneDeep from 'lodash.clonedeep'
import { TFunc } from "../model/term"
import { onParamDelete } from './onParamDelete'

describe('onParamDelete function', () => {
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
          ix: 1,
        }
      ],
      body: {
        // x
        term: 'var',
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
          ix: 0,
        }
      ],
      body: {
        // x
        term: 'var',
        ix: 0,
      }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deleting unused param should be OK', () => {
    const term = cloneDeep(before)
    onParamDelete(0, 0, term)
    expect(term).toStrictEqual(expected)
  })

  test('deleting used param should be forbidden', () => {
    const term = cloneDeep(before)
    expect(() => onParamDelete(1, 0, term)).toThrow()
  })
})

