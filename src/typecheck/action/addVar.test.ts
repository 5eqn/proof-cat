import cloneDeep from 'lodash.clonedeep'
import { TLet } from "../model/term"
import { addVar } from './addVar'

describe('addVar function', () => {
  // Context: [T: U]
  // let a = 1 in ((T: U) => (x: T) => x)(T = T)(x = a)
  const before: TLet = {
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
        },
      ],
      func: {
        term: 'app',
        // T = number
        argID: ['T'],
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
    }
  }

  // After inserting variable at env[0]
  const expectedInsert0: TLet = {
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
        },
      ],
      func: {
        term: 'app',
        // T = number
        // Index increases because variable is added inside scope of T
        argID: ['T'],
        arg: [
          {
            term: 'var',
            id: 'T',
            ix: 2,
          },
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

  // After inserting variable at env[1]
  const expectedInsert1: TLet = {
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
        // Index stay the same because variable is only added outside scope of T
        argID: ['T'],
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
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should increase variable index of posterior env', () => {
    const term = cloneDeep(before)
    addVar(0, 1, term)
    expect(term).toStrictEqual(expectedInsert0)
  })

  test('should not increase variable index of prior env', () => {
    const term = cloneDeep(before)
    addVar(1, 1, term)
    expect(term).toStrictEqual(expectedInsert1)
  })
})

