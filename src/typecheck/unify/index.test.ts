import { Val } from "../model/value"
import { unify } from "."

describe('unifyFunc function', () => {
  const a: Val = {
    val: 'any',
  }

  const f: Val = {
    val: 'func',
    param: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    paramID: ['a'],
    func: {
      env: [],
      body: {
        term: 'var',
        id: 'a',
        ix: 0,
      },
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify any with anything', () => {
    expect(() => unify(1, a, f)).not.toThrow()
  })
})

