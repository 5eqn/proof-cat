import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Term } from "../model/term"

describe('onWrapLet function', () => {
  // Context: [Z: U, T: U]
  // After adding param
  const before: Term = {
    term: 'app',
    // T = number
    argID: ['T'],
    // Index decreases because `a` is deleted
    arg: [
      {
        term: 'var',
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
      arg: [
        {
          term: 'var',
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
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should add definition and increase env index', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'wrapLet',
      name: 'a',
      envLen: 2,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction({
      action: 'wrapLet',
      name: 'a',
      envLen: 2,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})
