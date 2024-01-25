import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { evaluateFunc } from "./func"

describe('evaluateFunc function', () => {
  // Empty environment
  const mockEnv: Env = []

  // Identity function `(a: A) => a`
  const mockTFunc: Term = {
    term: 'func',
    param:
    {
      term: 'type',
      type: 'A',
    }
    ,
    paramID: 'a',
    body: {
      term: 'var',
      ix: 0,
    }
  }

  // Expected result
  const mockVFunc: Val = {
    val: 'func',
    param:
    {
      val: 'type',
      type: 'A',
    }
    ,
    paramID: 'a',
    func: {
      env: mockEnv,
      body: mockTFunc.body,
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should evaluate params', () => {
    const val = evaluateFunc(mockEnv, mockTFunc)
    expect(val).toStrictEqual(mockVFunc)
  })
})

