import cloneDeep from 'lodash.clonedeep'
import { runAction } from '.'
import { mkAction, revertAction } from '../model/action'
import { Ctx } from '../model/ctx'
import { Term } from "../model/term"
import { onWrapApp } from './onWrapApp'

describe('onWrapApp function', () => {
  // Context: [A: U, a: A, f: (ain: A, T: U) -> B, g: (bin: B) -> A]
  const ctx: Ctx = [
    {
      val: 'uni',
    },
    {
      val: 'type',
      type: 'A',
    },
    {
      val: 'pi',
      param: [
        {
          val: 'type',
          type: 'A',
        },
        {
          val: 'uni',
        }
      ],
      paramID: ['ain', 'T'],
      func: {
        env: [],
        body: {
          term: 'type',
          type: 'B',
        }
      }
    },
    {
      val: 'pi',
      param: [
        {
          val: 'type',
          type: 'B',
        },
      ],
      paramID: ['bin'],
      func: {
        env: [],
        body: {
          term: 'type',
          type: 'A',
        }
      }
    },
  ]

  // Before action
  const before: Term = {
    term: 'var',
    id: 'func',
    ix: 2,
  }

  // After action
  const expected: Term = {
    term: 'app',
    argID: ['ain', 'T'],
    arg: [
      {
        term: 'any',
      },
      {
        term: 'any',
      },
    ],
    func: before,
  }

  // Non-function
  const nonFunction: Term = {
    term: 'var',
    id: 'func',
    ix: 1,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should apply any to function', () => {
    const term = cloneDeep(before)
    runAction(mkAction({
      action: 'wrapApp',
      funcType: ctx[2],
      envLen: 4,
    }), term)
    expect(term).toStrictEqual(expected)
  })

  test('should not apply to non-function', () => {
    const term = cloneDeep(nonFunction)
    expect(() => onWrapApp(ctx[1], term)).toThrow()
  })

  test('revert should work', () => {
    const term = cloneDeep(before)
    const action = mkAction({
      action: 'wrapApp',
      funcType: ctx[2],
      envLen: 4,
    })
    runAction(action, term)
    runAction(revertAction(action), term)
    expect(term).toStrictEqual(before)
  })
})

