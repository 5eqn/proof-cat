import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onLetDelete } from './onLetDelete'

describe('onLetDelete function', () => {
  // Context: [Z: U, T: U]
  // let a = 1 in ((T: U) => (x: T) => x)(T = T)(x = a)
  const beforeUsed: Term = {
    // let a = 1
    term: 'let',
    id: 'a',
    body: {
      term: 'num',
      num: 1,
    },
    next: {
      term: 'app',
      // x = a
      argID: ['x'],
      arg: [
        {
          term: 'var',
          id: 'a',
          ix: 0,
        }
      ],
      func: {
        term: 'app',
        // T = number
        argID: ['T'],
        arg: [
          {
            term: 'var',
            id: 'T',
            ix: 2,
          }
        ],
        func: {
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
      }
    }
  }

  // Context: [Z: U, T: U]
  // let a = 1 in ((T: U) => (x: T) => x)(T = T)
  const beforeUnused: Term = {
    // let a = 1
    term: 'let',
    id: 'a',
    body: {
      term: 'num',
      num: 1,
    },
    next: {
      term: 'app',
      // T = number
      argID: ['T'],
      arg: [
        {
          term: 'var',
          id: 'T',
          ix: 2,
        }
      ],
      func: {
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
    }
  }


  // After adding param
  const expected: Term = {
    term: 'app',
    // T = number
    argID: ['T'],
    // Index decreases because `a` is deleted
    arg: [
      {
        term: 'var',
        id: 'T',
        ix: 1,
      }
    ],
    func: {
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
  }


  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deleting unused definition should be OK', () => {
    const term = cloneDeep(beforeUnused)
    onLetDelete(2, term)
    expect(term).toStrictEqual(expected)
  })

  test('deleting used definition should be forbidden', () => {
    const term = cloneDeep(beforeUsed)
    expect(() => onLetDelete(2, term)).toThrow()
  })
})
