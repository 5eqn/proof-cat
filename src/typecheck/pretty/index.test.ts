import { Term } from "../model/term"
import { pretty } from "."

describe('evaluateVar function', () => {
  const func: Term = {
    term: 'func',
    param:
    {
      term: 'any',
    },
    paramID: 'a',
    body: {
      term: 'var',
      ix: 0,
    }
  }

  const pi: Term = {
    term: 'pi',
    param:
    {
      term: 'uni',
    },
    paramID: 'A',
    body: {
      term: 'var',
      ix: 0,
    }
  }

  const app: Term = {
    term: 'app',
    arg:
    {
      term: 'type',
      type: 'A',
    },
    func,
  }

  const termLet: Term = {
    term: 'let',
    id: 'n',
    body: {
      term: 'num',
      num: 114514,
    },
    next: {
      term: 'var',
      ix: 0,
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should pretty func', () => {
    expect(pretty([], func)).toBe('(a: *) => a')
  })

  test('should pretty pi', () => {
    expect(pretty([], pi)).toBe('(A: U) -> A')
  })

  test('should pretty app', () => {
    expect(pretty([], app)).toBe('((a: *) => a)(A)')
  })

  test('should pretty let', () => {
    expect(pretty([], termLet)).toBe('let n = 114514 in n')
  })
})
