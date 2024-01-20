import { Val } from "../model/value"
import { unify } from "."

describe('unifyArray function', () => {
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

  const g: Val = {
    val: 'func',
    param: [
      {
        val: 'type',
        type: 'B',
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

  const h: Val = {
    val: 'func',
    param: [
      {
        val: 'type',
        type: 'A',
      },
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

  test('should unify same functions', () => {
    expect(() => unify(1, f, f)).not.toThrow()
  })

  test('should not unify if param differs', () => {
    expect(() => unify(1, f, g)).toThrow()
  })

  test('should not unify if param length differs', () => {
    expect(() => unify(1, f, h)).toThrow()
  })
})

