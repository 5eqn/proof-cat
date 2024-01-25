import cloneDeep from 'lodash.clonedeep'
import { TFunc } from "../model/term"
import { onParamRename } from './onParamRename'

describe('onParamRename function', () => {
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

  // After renaming param
  const expected: TFunc = {
    term: 'func',
    paramID: ['A', 'mmsd'],
    param: [
      {
        term: 'uni',
      },
      {
        term: 'uni',
      }
    ],
    body: {
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


  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deleting unused param should be OK', () => {
    const term = cloneDeep(before)
    onParamRename(1, 'mmsd', term)
    expect(term).toStrictEqual(expected)
  })
})

