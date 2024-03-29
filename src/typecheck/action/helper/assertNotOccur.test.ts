import { TLet } from "../../model/term"
import { assertNotOccur } from './assertNotOccur'

describe('assertNotOccur function', () => {
  // Context: Z: U, T: U
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
      arg:
      {
        term: 'var',
        ix: 0,
      }
      ,
      func: {
        term: 'app',
        // T = number
        arg:
        {
          term: 'var',
          ix: 2,
        }
        ,
        func: {
          // T: U
          term: 'func',
          paramID: 'T',
          param:
          {
            term: 'uni',
          }
          ,
          body: {
            // x: T
            term: 'func',
            paramID: 'x',
            param:
            {
              term: 'var',
              ix: 0,
            }
            ,
            body: {
              // x
              term: 'var',
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
    expect(() => assertNotOccur(2, 1, term)).toThrow()
  })

  test('should report absence', () => {
    expect(() => assertNotOccur(2, 0, term)).not.toThrow()
  })
})
