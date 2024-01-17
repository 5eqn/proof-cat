import cloneDeep from 'lodash.clonedeep'
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
        term: 'var',
        id: 'a',
        ix: 1,
      },
      {
        term: 'var',
        id: 'A',
        ix: 0,
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

  // Bad function
  const badFunction: Term = {
    term: 'var',
    id: 'bad',
    ix: 3,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('auto find in context and preserve order when applying arguments', () => {
    const term = cloneDeep(before)
    onWrapApp(ctx[2], ctx)(term)
    expect(term).toStrictEqual(expected)
  })

  test('should not apply to non-function', () => {
    const term = cloneDeep(nonFunction)
    onWrapApp(ctx[1], ctx)(term)
    expect(term).toStrictEqual(nonFunction)
  })

  test('should not apply argument to function if not found in context', () => {
    const term = cloneDeep(badFunction)
    onWrapApp(ctx[3], ctx)(term)
    expect(term).toStrictEqual(badFunction)
  })
})

