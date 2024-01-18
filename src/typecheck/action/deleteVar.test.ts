import cloneDeep from 'lodash.clonedeep'
import { TLet } from "../model/term"
import { deleteVar } from './deleteVar'

describe('deleteVar function', () => {
  // Context: [Z: U, T: U]
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

  // After deleting variable at env[0]
  const expectedDelete0: TLet = {
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
        // Index decreases because a variable before T is deleted
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

  // After inserting variable at env[2]
  const expectedDelete2: TLet = {
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
        // Index stay the same because only variable outside T is deleted
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

  test('should decrease variable index of posterior env', () => {
    const term = cloneDeep(before)
    deleteVar(0, term)
    expect(term).toStrictEqual(expectedDelete0)
  })

  test('should not decrease variable index of prior env', () => {
    const term = cloneDeep(before)
    deleteVar(2, term)
    expect(term).toStrictEqual(expectedDelete2)
  })
})
