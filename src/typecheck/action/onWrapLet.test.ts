import cloneDeep from 'lodash.clonedeep'
import { Term } from "../model/term"
import { onWrapLet } from './onWrapLet'

describe('onWrapLet function', () => {
  // Context: [Z: U, T: U]
  // After adding param
  const before: Term = {
    term: 'app',
    // T = number
    argID: ['T'],
    // Index decreases because `a` is deleted
    argIX: [1],
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

  // let a = any in ((T: U) => (x: T) => x)(T = T)
  const expected: Term = {
    // let a = any
    term: 'let',
    id: 'a',
    body: {
      term: 'any',
    },
    next: {
      term: 'app',
      // T = number
      argID: ['T'],
      argIX: [2],
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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should add definition and increase env index', () => {
    const term = cloneDeep(before)
    onWrapLet('a')(term)
    expect(term).toStrictEqual(expected)
  })
})

