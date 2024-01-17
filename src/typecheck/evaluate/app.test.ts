import { evaluate } from "."
import { Env } from "../model/env"
import { Term } from "../model/term"
import { Val } from "../model/value"
import { evaluateApp } from "./app"

describe('evaluateApp function', () => {
  // Term of variable `x`
  const mockTVar: Term = {
    term: 'var',
    id: 'x',
    ix: 0,
  }

  // Value of variable `x`
  const mockVVar: Val = {
    val: 'var',
    id: 'x',
    lvl: 0,
  }

  // Variable `x` is in the outermost scope
  const mockEnv: Env = [mockVVar]

  // Identity function `(a: A) => a`
  const mockTFunc: Term = {
    term: 'func',
    param: [
      {
        term: 'type',
        type: 'A',
      }
    ],
    paramID: ['a'],
    body: {
      term: 'var',
      id: 'a',
      ix: 0,
    }
  }

  // Assign `x` as argument `a` of mockFunc
  const mockTAppFunc: Term = {
    term: 'app',
    argID: ['a'],
    arg: [mockTVar],
    func: mockTFunc,
  }

  // Expected result of mockAppFunc
  const mockVAppFunc: Val = {
    val: 'var',
    id: 'x',
    lvl: 0,
  }

  // Assign `x` as argument `a` of `x`
  const mockTAppVar: Term = {
    term: 'app',
    argID: ['a'],
    arg: [mockTVar],
    func: mockTVar,
  }

  // Expected result of mockAppSelf
  const mockVAppVar: Val = {
    val: 'app',
    argID: ['a'],
    arg: [mockVVar],
    func: mockVVar,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should apply closure if target is a function', () => {
    const val = evaluate(mockEnv, mockTAppFunc)
    expect(val).toStrictEqual(mockVAppFunc)
  })

  test('should return bare apply if target is not a function', () => {
    const val = evaluateApp(mockEnv, mockTAppVar)
    expect(val).toStrictEqual(mockVAppVar)
  })
})
