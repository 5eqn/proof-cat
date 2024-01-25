import { Val } from "../model/value"
import { unify } from "."

describe('unifyNamespace function', () => {
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
        ix: 0,
      },
    }
  }

  const g: Val = {
    val: 'func',
    param: [
      {
        val: 'type',
        type: 'A',
      }
    ],
    paramID: ['b'],
    func: {
      env: [],
      body: {
        term: 'var',
        ix: 0,
      },
    }
  }

  const h: Val = {
    val: 'func',
    param: [
      {
        val: 'type',
        type: 'A',
      },
    ],
    paramID: ['a', 'b'],
    func: {
      env: [],
      body: {
        term: 'var',
        ix: 0,
      },
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should unify same param IDs', () => {
    expect(() => unify(1, f, f)).not.toThrow()
  })

  test('should not unify if param ID differs', () => {
    expect(() => unify(1, f, g)).toThrow()
  })

  test('should not unify if param ID length differs', () => {
    expect(() => unify(1, f, h)).toThrow()
  })
})

