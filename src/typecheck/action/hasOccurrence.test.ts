import { TLet } from "../model/term"
import { hasOccurrence } from './hasOccurrence'

describe('hasOccurrence function', () => {
  // Context: [Z: U, T: U]
  // let a = 1 in ((T: U) => (x: T) => x)(T = T)(x = a)
  const term: TLet = {
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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should report occurrence', () => {
    expect(hasOccurrence(2, 1, term)).toBe(true)
  })

  test('should report absence', () => {
    expect(hasOccurrence(2, 0, term)).toBe(false)
  })
})
