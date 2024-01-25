import { quote } from "."
import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"

describe('quoteFunc function', () => {
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

  test('should quote params', () => {
    const val = quote(mockEnv.length, mockVFunc)
    expect(val).toStrictEqual(mockTFunc)
  })
})

